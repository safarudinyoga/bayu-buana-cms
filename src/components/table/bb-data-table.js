import React, { Component } from "react"
import TableHeader from "components/table/table-header"
import "datatables.net-bs4/css/dataTables.bootstrap4.css"
import $ from "jquery"
import { withRouter } from "react-router"
import "datatables.net-bs4"
import "datatables.net-buttons-bs4"
import "datatables.net-buttons/js/dataTables.buttons"
import "datatables.net-buttons/js/buttons.flash"
import "datatables.net-buttons/js/buttons.html5"
import "datatables.net-buttons/js/buttons.print"
import "datatables.net-colreorder-bs4"
import "datatables.net-rowreorder-bs4"
import "datatables.net-responsive-bs4"
import "datatables.net-rowreorder-bs4/css/rowReorder.bootstrap4.css"
import "./bb-data-table.css"
import JSZip from "jszip"
import Api from "config/api"

window.JSZip = JSZip

class BBDataTable extends Component {
  constructor(props) {
    super(props)
    this.table = React.createRef()
    this.wrapper = React.createRef()
    this.dt = null
    this.state = {
      dt: null,
      selected: [],
      status: "0",
      extraFilters: this.props.filters || [],
    }
    this.inProgress = false

    this.api = new Api()
  }

  componentDidMount() {
    try {
      this.init()
    } catch (e) {}
  }

  init() {
    this.inProgress = true
    $.fn.dataTableExt.errMode = "none"
    let columns = []
    columns.push({
      searchable: false,
      orderable: false,
      title: '<input type="checkbox" class="select-checkbox-all"/>',
      render: function (val, display, row) {
        return (
          '<i class="fas fa-ellipsis-v float-left row-handle"></i> <input type="checkbox" data-id="' +
          row.id +
          '" class="select-checkbox-item"/>'
        )
      },
    })

    let visibleColumns = []

    try {
      columns = columns.concat(this.props.columns)
      for (let i = 1; i < columns.length; i++) {
        if (columns[i].visible !== false) {
          visibleColumns.push(i)
        }
      }
    } catch (e) {}

    columns.push({
      searchable: false,
      orderable: false,
      title: "Action",
      render: function (value, display, row) {
        return (
          '<a href="#" class="table-row-action-item" data-action="edit" data-id="' +
          row.id +
          '" title="Click to edit"><i class="fa fa-edit"></i></a>' +
          '<a href="#" class="table-row-action-item" data-action="view" data-id="' +
          row.id +
          '" title="Click to view"><i class="fa fa-eye"></i></a>' +
          '<a href="#" class="table-row-action-item" data-action="delete" data-id="' +
          row.id +
          '" title="Click to delete"><i class="fa fa-trash"></i></a>'
        )
      },
    })

    const initialize = () => {
      let dt = $(this.table.current).DataTable({
        pagingType: "simple_numbers",
        colReorder: {
          enable: true,
          iFixedColumnsLeft: 1,
          //   iFixedColumnsRight: 4,
        },
        stateSave: false,
        serverSide: true,
        processing: true,
        displayLength: 10,
        displayStart: 0,
        keys: true,
        destroy: true,
        ajax: {
          url: this.api.env.endpoint(this.props.endpoint),
          cache: true,
          dataSrc: (json) => {
            this.inProgress = false
            var recordTotal = 0
            var recordFiltered = 0
            try {
              if (typeof json.number_of_elements === "number") {
                recordTotal = json.number_of_elements
              }
              if (typeof json.total_elements === "number") {
                recordFiltered = json.total_elements
              }
            } catch (e) {}

            try {
              if (typeof json.data.data.items === "object") {
                recordTotal = json.data.data.items.length
              }
            } catch (e) {}

            try {
              if (typeof json.data.items === "object") {
                recordTotal = json.data.items.length
              }
            } catch (e) {}

            try {
              if (typeof json.data.total_items === "number") {
                recordFiltered = json.data.total_items
              }
            } catch (e) {}

            try {
              if (typeof json.data.total === "number") {
                recordFiltered = json.data.total
              }
            } catch (e) {}

            try {
              if (typeof json.total === "number") {
                recordFiltered = json.total
              }
            } catch (e) {}

            try {
              if (typeof json.total_count === "number") {
                recordFiltered = json.total_count
              }
            } catch (e) {}

            var items = []
            if (typeof json.content === "object") {
              items = json.content
            }

            if (!items.length) {
              try {
                if (typeof json.data.data.items === "object") {
                  items = json.data.data.items
                }
              } catch (e) {}
            }

            if (!items.length) {
              try {
                if (typeof json.data.items === "object") {
                  items = json.data.items
                }
              } catch (e) {}
            }

            if (!items.length) {
              try {
                if (
                  typeof json.items === "object" &&
                  typeof json.items.length === "number"
                ) {
                  items = json.items
                }
              } catch (e) {}
            }

            if (!items.length) {
              try {
                if (
                  typeof json.data === "object" &&
                  typeof json.data.length === "number"
                ) {
                  items = json.data
                }
              } catch (e) {}
            }

            if (!items.length) {
              try {
                if (
                  typeof json.data.data === "object" &&
                  typeof json.data.data.length === "number"
                ) {
                  items = json.data.data
                }
              } catch (e) {}
            }

            if (!recordTotal) {
              recordTotal = items.length
            }

            json.recordsTotal = recordTotal
            json.recordsFiltered = recordFiltered

            return items
          },
          data: (params, settings) => {
            let overrideParams = {}
            let pageStartAt = 0
            let searchKey = null
            let searchDefault = ""
            let extraSorts = []
            let filters = []
            let simpleSort = true
            let extraFilters = []
            try {
              pageStartAt = this.props.pageStartAt
              if (!pageStartAt) {
                pageStartAt = 0
              }
            } catch (e) {}
            try {
              searchKey = this.props.searchKey
              if (!searchKey) {
                searchKey = null
              }
            } catch (e) {}
            try {
              filters = JSON.parse(JSON.stringify(this.props.filters || []))
              if (!filters) {
                filters = []
              }
              if (
                this.state.extraFilters &&
                this.state.extraFilters.length > 0
              ) {
                if (filters.length > 0) {
                  filters.push(["AND"])
                }
                filters.push(this.state.extraFilters)
              }
            } catch (e) {}
            try {
              searchDefault = this.props.searchDefault
              if (!searchDefault) {
                searchDefault = ""
              }
            } catch (e) {}
            try {
              simpleSort = this.props.simpleSort
              simpleSort = simpleSort === "true" || simpleSort === true
            } catch (e) {}

            try {
              extraSorts = this.props.sorts
            } catch (e) {}

            if (searchKey) {
              overrideParams[searchKey] = searchDefault
            }

            try {
              overrideParams.size = params.length
              overrideParams.page = !params.start
                ? 0
                : Math.round(params.start / params.length)

              overrideParams.page += parseInt(pageStartAt)

              if (params.order.length > 0) {
                overrideParams.sort = ""
                if (simpleSort === true) {
                  let order = params.order[0]
                  if (params.columns[order.column].orderable !== false) {
                    overrideParams.sort = order.dir !== "desc" ? "" : "-"
                    overrideParams.sort += params.columns[order.column].data
                  }
                } else {
                  var orders = extraSorts || []
                  for (var o in params.order) {
                    let order = params.order[o]
                    if (params.columns[order.column].orderable !== false) {
                      let sort = order.dir !== "desc" ? "" : "-"
                      orders.push(sort + params.columns[order.column].data)
                    }
                  }
                  overrideParams.sort = orders.join(",")
                }
              }
              if (params.search.value) {
                let searchValue = params.search.value.replace(/^\s+|\s+$/g, "")
                if (searchKey) {
                  overrideParams[searchKey] = searchValue
                } else {
                  let columns = []
                  for (let c in params.columns) {
                    let col = params.columns[c]
                    if (col.searchable === false) {
                      continue
                    }
                    columns.push(
                      JSON.stringify([col.data, "like", searchValue]),
                    )
                  }
                  let defaultFilters = ""
                  if (filters.length > 0) {
                    extraFilters = []
                    for (var f in filters) {
                      extraFilters.push(JSON.stringify(filters[f]))
                    }
                    defaultFilters = extraFilters.join(",") + ',["AND"],'
                  }
                  overrideParams.filters =
                    "[" + defaultFilters + columns.join(',["OR"],') + "]"
                }
              } else if (filters.length) {
                extraFilters = []
                for (var x in filters) {
                  extraFilters.push(JSON.stringify(filters[x]))
                }
                overrideParams.filters = "[" + extraFilters.join(",") + "]"
              }
            } catch (e) {}

            return overrideParams
          },
        },
        buttons: [
          {
            extend: "print",
            exportOptions: {
              columns: visibleColumns,
            },
          },
          {
            extend: "excel",
            exportOptions: {
              columns: visibleColumns,
            },
          },
        ],
        rowReorder: {
          selector: ".row-handle",
        },
        responsive: true,
        autoWidth: false,
        columnDefs: [
          {
            ordeable: false,
            className: "select-checkbox",
            targets: [0],
          },
          //   {
          //     responsivePriority: 10001,
          //     targets: [1, 3],
          //   },
          {
            ordeable: false,
            className: "table-row-action",
            targets: [columns.length - 1],
          },
        ],
        order: [[1, "asc"]],
        columns: columns,
        dom:
          "<'container-fluid mt-2 dataTable-root'<'card card-default mb-0 shadow-none'<'card-body'tr>>" +
          "<'row'<'col-sm-12 col-md-8'li><'col-sm-12 col-md-4'p>>" +
          ">",
        language: {
          paginate: {
            first: "&laquo;",
            previous: '<i class="fas fa-angle-left"></i>',
            next: '<i class="fas fa-angle-right"></i>',
            last: "&raquo;",
          },
          search: "Search",
          info: "Showing _START_ - _END_ of _TOTAL_",
          infoEmpty: "Showing 0 - 0 of 0",
          infoFiltered: "",
          loadingRecords: "Loading ...",
          processing: "<i class='fa fa-spin fa-circle-notch'></i> Loading...",
          zeroRecords: "No record found",
          emptyTable: "No record found",
          lengthMenu: "_MENU_",
        },
        fnDrawCallback: (t) => {
          let wrapper = $(".dataTables_paginate", t.nTableWrapper)
          wrapper.append('<span class="float-right mt-2 mr-2">Page: </span>')
          $(".pagination", wrapper).addClass("float-right")
        },
      })

      $(window).on("resize", () => {
        setTimeout(() => {
          if (dt) {
            try {
              dt.responsive.rebuild()
              dt.responsive.recalc()
              dt.columns.adjust().draw()
            } catch (e) {}
          }
        }, 500)
      })

      this.dt = dt

      try {
        this.setState({
          dt: dt,
        })
      } catch (e) {}
    }

    setTimeout(() => initialize(), 100)
  }

  onSearch(value) {
    try {
      this.dt.search(value).draw()
    } catch (e) {}
  }

  onStatus(value) {
    this.inProgress = true
    if (value + "" !== "0") {
      this.setState({
        status: value,
        extraFilters: ["status", parseInt(value)],
      })
    } else {
      this.setState({
        status: "0",
        extraFilters: [],
      })
    }
    setTimeout(() => {
      this.inProgress = false
      try {
        this.dt.ajax.reload()
      } catch (e) {}
    }, 100)
  }

  onReset() {
    if (this.props.onReset) {
      this.props.onReset()
    }
    setTimeout(() => {
      this.setState({
        extraFilters: [],
      })
      setTimeout(() => {
        this.onSearch("")
      }, 200)
    }, 100)
  }

  onPrint() {
    try {
      this.dt.buttons(".buttons-print").trigger()
    } catch (e) {}
  }

  onDownload() {
    try {
      this.dt.buttons(".buttons-excel").trigger()
    } catch (e) {
      console.log(e.message)
    }
  }

  onToggleFilter(show) {
    this.inProgress = true
    if (show) {
      this.deselectAll()
    }
    setTimeout(() => {
      this.inProgress = false
    }, 100)
  }

  deselectAll() {
    try {
      $(".select-checkbox-all:checked").prop("checked", false).trigger("change")
    } catch (e) {}
    this.setState({ selected: [] })
  }

  onStatusUpdate(status) {
    if (status === 1) {
      this.api
        .post(this.props.activationEndpoint, this.state.selected)
        .then(() => {
          this.dt.ajax.reload()
        })
        .finally(() => {
          this.deselectAll()
        })
    } else if (status === 3) {
      this.api
        .post(this.props.deactivationEndpoint, this.state.selected)
        .then(() => {
          this.dt.ajax.reload()
        })
        .finally(() => {
          this.deselectAll()
        })
    }
  }

  onRemoveSelected() {
    this.api
      .post(this.props.deleteEndpoint, this.state.selected)
      .then(() => {
        this.dt.ajax.reload()
      })
      .finally(() => {
        this.deselectAll()
      })
  }

  deleteAction(id) {
    this.api
      .delete(this.api.env.endpoint(this.props.endpoint) + "/" + id)
      .finally(() => {
        this.dt.ajax.reload()
      })
  }

  componentWillUnmount() {
    try {
      this.dt.destroy()
    } catch (e) {}
  }

  componentDidUpdate() {
    if (this.inProgress) {
      return
    }
    this.inProgress = true
    try {
      this.dt.ajax.reload()
    } catch (e) {}
    setTimeout(() => {
      this.inProgress = false
    }, 300)
  }

  render() {
    $(document)
      .off("change", ".select-checkbox-all")
      .on("change", ".select-checkbox-all", (e) => {
        this.inProgress = true
        console.log("change all")
        let table = $(e.target).closest("table")
        let selected = []
        $(".select-checkbox-item", table).prop(
          "checked",
          $(e.target).is(":checked"),
        )
        let items = $(".select-checkbox-item:checked", table)
        for (let i = 0; i < items.length; i++) {
          selected.push($(items.get(i)).data("id"))
        }

        this.setState({
          selected: selected,
        })
        setTimeout(() => {
            this.inProgress = false
        }, 100)
      })

    $(document)
      .off("change", ".select-checkbox-item")
      .on("change", ".select-checkbox-item", (e) => {
        console.log("change")
        this.inProgress = true
        let table = $(e.target).closest("table")
        let selected = []
        let items = $(".select-checkbox-item:checked", table)
        for (let i = 0; i < items.length; i++) {
          selected.push($(items.get(i)).data("id"))
        }

        try {
          if (selected.length < this.dt.table().data().length) {
            $(".select-checkbox-all:checked", table).prop("checked", false)
          } else {
            $(".select-checkbox-all:not(:checked)", table).prop("checked", true)
          }
        } catch (e) {}

        this.setState({
          selected: selected,
        })
        setTimeout(() => {
            this.inProgress = false
        }, 100)
      })

    let me = this
    $(document)
      .off("click", ".table-row-action-item")
      .on("click", ".table-row-action-item", function (e) {
        e.preventDefault()
        let id = $(this).data("id")
        let base = me.props.baseRoute || ""
        switch ($(this).data("action")) {
          case "edit":
            me.props.history.push(base + "/" + id)
            break
          case "view":
            me.props.history.push(base + "/" + id + "?action=view")
            break
          default:
            me.deleteAction.bind(me)(id)
            break
        }
      })

    return (
      <div ref={this.wrapper}>
        <TableHeader
          {...this.props}
          selected={this.state.selected.length > 0}
          hideFilter={this.state.hideFilter}
          extraFilter={this.props.extraFilter}
          onSearch={this.onSearch.bind(this)}
          onStatus={this.onStatus.bind(this)}
          onReset={this.onReset.bind(this)}
          onPrint={this.onPrint.bind(this)}
          onDownload={this.onDownload.bind(this)}
          onToggleFilter={this.onToggleFilter.bind(this)}
          onStatusUpdate={this.onStatusUpdate.bind(this)}
          onRemove={this.onRemoveSelected.bind(this)}
        />
        <div>
          <table ref={this.table} className="table table-sm"></table>
        </div>
      </div>
    )
  }
}

export default withRouter(BBDataTable)
