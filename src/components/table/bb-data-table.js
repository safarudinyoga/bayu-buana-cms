import TableHeader from "components/table/table-header"
import Api from "config/api"
import "datatables.net-bs4"
import "datatables.net-bs4/css/dataTables.bootstrap4.css"
import "datatables.net-buttons-bs4"
import "datatables.net-buttons/js/buttons.flash"
import "datatables.net-buttons/js/buttons.html5"
import "datatables.net-buttons/js/buttons.print"
import "datatables.net-buttons/js/dataTables.buttons"
import "datatables.net-colreorder-bs4"
import "datatables.net-responsive-bs4"
import "datatables.net-rowreorder-bs4"
import "datatables.net-rowreorder-bs4/css/rowReorder.bootstrap4.css"
import $ from "jquery"
import JSZip from "jszip"
import React, { Component } from "react"
import { Button, Modal, ModalBody, ModalFooter } from "react-bootstrap"
import ModalHeader from "react-bootstrap/esm/ModalHeader"
import { withRouter } from "react-router"
import { connect } from "react-redux"
import { setAlert } from "redux/ui-store"
import "./bb-data-table.css"
import editIcon from "assets/icons/edit.svg"
import removeIcon from "assets/icons/remove.svg"
import showIcon from "assets/icons/show.svg"

window.JSZip = JSZip

class BBDataTable extends Component {
  constructor(props) {
    super(props)
    this.table = React.createRef()
    this.wrapper = React.createRef()
    this.dt = null
    this.state = {
      id: null,
      deleteType: null,
      dt: null,
      selected: [],
      status: "0",
      extraFilters: this.props.filters || [],
      isOpen: false,
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
      title:
        '<input type="checkbox" id="cb-th" class="select-checkbox-all"/>',
      render: function (val, display, row) {
        return (
          '<svg class="float-left row-handle nopadding" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none"><rect id="backgroundrect" width="100%" height="100%" x="0" y="0" fill="none" stroke="none"/><path d="M7.098360577225684,13 a1.5,1.5 0 1 1 -3,0 a1.5,1.5 0 0 1 3,0 zm0,-5 a1.5,1.5 0 1 1 -3,0 a1.5,1.5 0 0 1 3,0 zm0,-5 a1.5,1.5 0 1 1 -3,0 a1.5,1.5 0 0 1 3,0 z" fill="#707070" id="svg_1" class=""/><path d="M11.901639938354492,13 a1.5,1.5 0 1 1 -3,0 a1.5,1.5 0 0 1 3,0 zm0,-5 a1.5,1.5 0 1 1 -3,0 a1.5,1.5 0 0 1 3,0 zm0,-5 a1.5,1.5 0 1 1 -3,0 a1.5,1.5 0 0 1 3,0 z" fill="#707070" id="svg_2" class=""/></svg> <input type="checkbox" data-id="' +
          row.id +
          '" class="float-left select-checkbox-item ml-2 mr-1"/>'
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

    const allowed = [this.props.recordName]
    const { recordName } = this.props
    columns.push({
      searchable: false,
      orderable: false,
      title: "Actions",
      render: function (value, display, row) {
        function tooltipCust(x) {
          if (x.matches) {
            $(function () {
              $('[data-toggle="tooltip"]').tooltip()
            })
          } else {
            $(function () {
              $('[data-toggle="tooltip"]').tooltip("hide")
            })
          }
        }

        const cvtRecordName = recordName
          ? Array.isArray(recordName)
            ? recordName
                .map((v) => row[v])
                .filter((v) => v)
                .join(" - ")
            : row[recordName]
          : ""

        var x = window.matchMedia("(max-width: 768px)")
        tooltipCust(x)
        x.addListener(tooltipCust)
        const filteredRecordName = Object.keys(row)
          .filter((key) => allowed.includes(key))
          .reduce((obj, key) => {
            obj[key] = row[key]
            return obj
          }, {})

        return (
          '<a href="javascript:void(0);" data-toggle="tooltip" class="table-row-action-item" data-action="edit" data-id="' +
          row.id +
          '" title="Click to edit"><img src="' +
          editIcon +
          '" /></a>' +
          '<a href="javascript:void(0);" data-toggle="tooltip" class="table-row-action-item" data-action="view" data-id="' +
          row.id +
          '" title="Click to view details"><img src="' +
          showIcon +
          '"/></a>' +
          '<a href="javascript:void(0);" data-toggle="tooltip" class="table-row-action-item" data-action="delete" data-id="' +
          row.id +
          '" data-name="' +
          cvtRecordName +
          '" title="Click to delete"><img src="' +
          removeIcon +
          '" /></a>'
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
        lengthMenu: [
          [10, 25, 50, 100, -1],
          [10, 25, 50, 100, "All"],
        ],
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
              } else {
                overrideParams.sort = "sort"
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
                  if (filters.length > 0) {
                    extraFilters = []
                    for (var c in columns) {
                      let tempFilters = columns[c]
                      for (var f in filters) {
                        tempFilters = tempFilters + ',["AND"],' + JSON.stringify(filters[f])
                      }
                      extraFilters.push(tempFilters)
                    }
                    overrideParams.filters =
                    "[" + extraFilters.join(',["OR"],') + "]"
                  }else{
                    overrideParams.filters =
                    "[" + columns.join(',["OR"],') + "]"
                  }
                }
              } else if (filters.length) {
                extraFilters = []
                for (var x in filters) {
                  extraFilters.push(JSON.stringify(filters[x]))
                  if (x < filters.length-1) extraFilters.push(JSON.stringify(["AND"]))
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
            header: true,
            footer: false,
            exportOptions: {
              stripHtml: false,
              columns: visibleColumns,
            },
          },
          {
            extend: "excelHtml5",
            text: "Excel",
            exportOptions: {
              stripHtml: false,
              columns: visibleColumns,
              orthogonal: "myExport",
            },
          },
          {
            extend: "csvHtml5",
            text: "CSV",
            exportOptions: {
              stripHtml: false,
              columns: visibleColumns,
            },
          },
        ],
        rowReorder: {
          selector: ".row-handle",
          update: false,
        },
        responsive: true,
        autoWidth: false,
        columnDefs: [
          // {
          //   targets: 0,
          //   checkboxes: {
          //     selectRow: true,
          //   },
          // },
          {
            orderable: false,
            className: "select-checkbox",
            targets: [0],
            "width": "5%",
          },
          {
            targets: [1, 2],
            className: "cstm-col-width",
          },
          //   {
          //     responsivePriority: 10001,
          //     targets: [1, 3],
          //   },
          {
            ordeable: false,
            // className: "table-row-action",
            targets: [columns.length - 1],
          },
        ],
        // select: {
        //   style: "multi",
        // },
        order: [],
        columns: columns,
        dom:
          "<'container-fluid mt-2 pl-0 dataTable-root'<'card card-default mb-0 shadow-none'<'card-body'tr>>" +
          "<'row'<'col-sm-12 col-md-4'li><'col-sm-12 col-md-8 z-index-reset'p>>" +
          ">",
        language: {
          paginate: {
            first: "&laquo;",
            previous: '<i class="fas fa-angle-left"></i>',
            next: '<i class="fas fa-angle-right"></i>',
            last: "&raquo;",
          },
          search: "Search",
          info: '<span class="ml-2 text-label-input-paginate danger">Showing _START_ - _END_ of _TOTAL_</span>',
          infoEmpty:
            '<span class="ml-2 text-label-input-paginate danger">Showing 0 - 0 of 0</span>',
          infoFiltered: "",
          loadingRecords: "Loading ...",
          processing: "<i class='fa fa-spin fa-circle-notch'></i> Loading...",
          zeroRecords: "No " + this.props.title.toLowerCase() + " found",
          emptyTable: this.props.emptyTable
            ? this.props.emptyTable
            : "No " + this.props.title.toLowerCase() + " found",
          lengthMenu: "_MENU_",
        },
        fnDrawCallback: (t) => {
          const { selected } = this.state
          let wrapper = $(".dataTables_paginate", t.nTableWrapper)
          wrapper.append(
            '<span class="d-none d-md-block float-right mt-2 mr-2 text-label-page">Page: </span>',
          )
          wrapper.prepend(
            '<span class="d-md-none float-left mt-2 mr-2 text-label-page">Page: </span>',
          )
          $(".pagination", wrapper).addClass("float-right float-left-sm")

          // Hide pagination if empty data
          // if (t.fnRecordsDisplay() === 1) {
          //   $(t.nTableWrapper).find(".dataTables_length").hide()
          //   $(t.nTableWrapper).find(".dataTables_info").hide()
          //   $(t.nTableWrapper).find(".dataTables_paginate").hide()
          // } else {
            $(t.nTableWrapper).find(".dataTables_length").show()
            $(t.nTableWrapper).find(".dataTables_info").show()
            $(t.nTableWrapper).find(".dataTables_paginate").show()
          // }

          let items = $(".select-checkbox-item", t.nTableWrapper)
          let itemsSelected = []
          for (let i = 0; i < items.length; i++) {
            let cbHTML = $(items.get(i))
            if(selected.includes(cbHTML.data("id"))) {
              itemsSelected.push(cbHTML.data("id"))
              cbHTML.prop("checked", true)
            }
          }
          let checkedHeader = items.length > 0 && itemsSelected.length === items.length
          $(".select-checkbox-all").prop("checked", checkedHeader)
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

      dt.on("row-reorder", (e, diff, edit) => {
        if (diff.length > 0) {
          let module = this.props.title.toLowerCase().split(" ").join("_")
          if(this.props.title.includes("/")){
            module = this.props.title.toLowerCase().replace(/ /g, "").replace("/", "-").split(" ").join("_")
          }
          
          let rowID = edit.triggerRow.data().id
          let rowPositionDiff = diff.findIndex(
            (v) => dt.row(v.node).data().id === rowID,
          )
          let targetIdx = rowPositionDiff === 0 ? 1 : diff.length - 2
          let sort = dt.row(diff[targetIdx].node)?.data()?.sort || 0
          this.api
            .post(`/master/batch-actions/sort/${module}`, { id: rowID, sort })
            .then((res) => {
              console.log(res)
            })
            .catch((e) => {
              console.log(e)
            })
        }
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
      let prevLen = this.dt.page.len()
      this.dt.page.len(-1).draw()
      setTimeout(() => {
        this.dt.buttons(".buttons-print").trigger()
        this.dt.page.len(prevLen).draw()
      }, 500)
    } catch (e) {}
  }

  onDownload() {
    try {
      let prevLen = this.dt.page.len()
      this.dt.page.len(-1).draw()
      setTimeout(() => {
        this.dt
          .buttons(
            this.props.btnDownload ? this.prop.btnDownload : ".buttons-excel",
          )
          .trigger()
        this.dt.page.len(prevLen).draw()
      }, 500)
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
    this.setState({
      isOpen: true,
      deleteType: "selected",
      id: this.state.selected,
    })
  }

  deleteAction(id, name) {
    this.setState({
      isOpen: true,
      deleteType: "single",
      id: id,
      name: name,
    })
  }

  componentWillUnmount() {
    try {
      this.dt.destroy()
    } catch (e) {}
  }

  componentDidUpdate(prevProps) {
    if (this.inProgress) {
      return
    }
    this.inProgress = true
    try {
        if(prevProps.filters !== this.props.filters) this.dt.ajax.reload()
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
        let table = $(e.target).closest("table")
        let itemsId = []
        $(".select-checkbox-item", table).prop(
          "checked",
          $(e.target).is(":checked"),
        )
        let items = $(".select-checkbox-item", table)
        for (let i = 0; i < items.length; i++) {
          itemsId.push($(items.get(i)).data("id"))
        }
          
        let itemsChecked = $(".select-checkbox-item:checked", table)
        let selected = this.state.selected

        if(itemsChecked.length > 0) {
          for (let idx = 0; idx < itemsChecked.length; idx++) {
            console.log(idx)
            let id = $(itemsChecked.get(idx)).data("id")
            if(!selected.includes(id)) {
              selected.push(id)
            }
          }
        } else {
          const idsToDelete = new Set(itemsId);
          selected = selected.filter(id => !idsToDelete.has(id))
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
        this.inProgress = true
        let table = $(e.target).closest("table")
        let itemId = $($(e.target).get(0)).data('id')
        let selectedVal = []
        let items = $(".select-checkbox-item:checked", table)
        for (let i = 0; i < items.length; i++) {
          selectedVal.push($(items.get(i)).data("id"))
        }

        try {
          if (selectedVal.length < this.dt.table().data().length) {
            $(".select-checkbox-all:checked", table).prop("checked", false)
          } else {
            $(".select-checkbox-all:not(:checked)", table).prop("checked", true)
          }
        } catch (e) {}

        let selected = this.state.selected
        if(selected.includes(itemId)) {
          selected = selected.filter(e => e !== itemId)
        } else {
          selected.push(itemId)
        }
        
        this.setState({
          selected: selected,
        })
        setTimeout(() => {
          this.inProgress = true
        }, 100)
      })

    let me = this
    $(document)
      .off("click", ".table-row-action-item")
      .on("click", ".table-row-action-item", function (e) {
        e.preventDefault()
        let id = $(this).data("id")
        let name = $(this).data("name")
        let base = me.props.baseRoute || ""
        switch ($(this).data("action")) {
          case "edit":
            me.props.history.push(base + "/" + id)
            break
          case "view":
            me.props.history.push(base + "/" + id + "?action=view")
            break
          default:
            me.deleteAction.bind(me)(id, name)
            break
        }
      })
    return (
      <div ref={this.wrapper}>
        <Modal show={this.state.isOpen}>
          <ModalHeader>
            Delete{" "}
            {this.props.titleModal
              ? this.state.deleteType === "single"
                ? this.props.titleModal
                : this.props.title
              : this.props.title}
          </ModalHeader>
          <ModalBody>Are you sure you want to delete this?</ModalBody>
          <ModalFooter>
            <Button
              variant="danger"
              onClick={() => {
                this.setState({
                  isOpen: false,
                })
                if (this.state.deleteType === "single") {
                  this.api
                    .delete(this.props.endpoint + "/" + this.state.id)
                    .then(() => {
                      this.props.setAlert({
                        message: `Record ${this.state.name} was successfully deleted.`,
                      })
                    })
                    .catch(function (error) {
                      this.props.setAlert({
                        message: `Record deletion failed.`,
                      })
                    })
                    .finally(() => {
                      this.dt.ajax.reload()
                    })
                } else {
                  this.api
                    .post(this.props.deleteEndpoint, this.state.selected)
                    .then(() => {
                      this.dt.ajax.reload()
                      this.props.setAlert({
                        message: `Records was successfully deleted.`,
                      })
                    })
                    .catch(function (error) {
                      this.props.setAlert({
                        message: `Record deletion failed.`,
                      })
                    })
                    .finally(() => {
                      this.deselectAll()
                    })
                }
              }}
            >
              Delete
            </Button>{" "}
            <Button
              variant="secondary"
              onClick={() => {
                this.setState({
                  isOpen: false,
                })
              }}
            >
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
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
        >
          {this.props.children}
        </TableHeader>
        <div>
          <table
            ref={this.table}
            className="table table-sm table-striped"
          ></table>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ ui }) => {
  return {
    stateAlert: ui.alert,
  }
}

const mapDispatchToProps = (dispatch) => ({
  setAlert: (payload) => dispatch(setAlert(payload)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(BBDataTable))
