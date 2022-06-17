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
import "../../lib/paginationNoEllipses";
import $ from "jquery"
import JSZip from "jszip"
import React, { Component } from "react"
import { Button, Modal, ModalBody, ModalFooter } from "react-bootstrap"
import ModalHeader from "react-bootstrap/esm/ModalHeader"
import { withRouter } from "react-router"
import { connect } from "react-redux"
import { setAlert, setCreateModal, setReloadTable, setModalDelete, setCreateNewModal } from "redux/ui-store"
import "./bb-data-table.css"
import editIcon from "assets/icons/edit.svg"
import removeIcon from "assets/icons/remove.svg"
import CopyIcon from "assets/icons/ic_copy.svg"
import showIcon from "assets/icons/show.svg"
import ModalCreate from "components/Modal/bb-modal"
import ModalCreateNew from "components/Modal/bb-modal"
import ModalDelete from "components/Modal/bb-modal-delete"
import customPrint from '../../lib/customPrint'
import { createLanguageServiceSourceFile } from "typescript"

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
      isCheckbox: this.props.isCheckbox ?? true,
      isShowStatus: this.props.isShowStatus ?? true,
      isShowColumnAction: this.props.isShowColumnAction ?? true,
      isOpen: false,
      itemInfo: "",
      year: new Date().getFullYear(),
    }
    this.inProgress = false
    this.queryParams = new URLSearchParams(this.props.location.search)
    this.api = new Api()
  }

  componentDidMount() {
    try {
      this.init()
    } catch (e) {}
  }

  init() {
    this.inProgress = true
    let self = this
    $.fn.dataTableExt.errMode = "none"
    let columns = []
    const { recordName, module } = this.props
    const { isCheckbox, isShowColumnAction } = this.state
    columns.push(isCheckbox ? {
      searchable: false,
      orderable: false,
      title:
        '<svg class="float-left row-handle nopadding" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none"></svg><input type="checkbox" id="cb-th" class="select-checkbox-all ml-2 mr-1"/>',
      render: function (val, display, row) {
        return (
          '<svg class="float-left row-handle nopadding" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none"><rect id="backgroundrect" width="100%" height="100%" x="0" y="0" fill="none" stroke="none"/><path d="M7.098360577225684,13 a1.5,1.5 0 1 1 -3,0 a1.5,1.5 0 0 1 3,0 zm0,-5 a1.5,1.5 0 1 1 -3,0 a1.5,1.5 0 0 1 3,0 zm0,-5 a1.5,1.5 0 1 1 -3,0 a1.5,1.5 0 0 1 3,0 z" fill="#707070" id="svg_1" class=""/><path d="M11.901639938354492,13 a1.5,1.5 0 1 1 -3,0 a1.5,1.5 0 0 1 3,0 zm0,-5 a1.5,1.5 0 1 1 -3,0 a1.5,1.5 0 0 1 3,0 zm0,-5 a1.5,1.5 0 1 1 -3,0 a1.5,1.5 0 0 1 3,0 z" fill="#707070" id="svg_2" class=""/></svg> <input type="checkbox" data-id="' +
          row.id +
          '" class="float-left select-checkbox-item ml-2 mr-1"/>'
        )
      },
    } : {
      searchable: false,
      orderable: false
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
    const isOpenNewTab = this.props.isOpenNewTab ?? true
    columns.push( isShowColumnAction ? {
      searchable: false,
      orderable: false,
      title: "Actions",
      render: function (value, display, row, meta) {
        let placement = meta.row > 0 ? 'top' : 'bottom'
        $(function () {
          $('[data-toggle="tooltip"]').tooltip({trigger: "hover"})
        })
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
        // const filteredRecordName = Object.keys(row)
        //   .filter((key) => allowed.includes(key))
        //   .reduce((obj, key) => {
        //     obj[key] = row[key]
        //     return obj
        //   }, {})

        let showSwitch = self.props.switchStatus
        let checked = ""
        if (showSwitch) {
          if (module === 'manage-corporate') {
            checked = row.agent_corporate.corporate.status === 1 ? "checked" : ""
          } else {
            checked = row.status == 1 ? "checked" : ""
          }
        }

        let hideDetail = self.props.hideDetail
        let showCopyAct = self.props.showCopyAct || false

        let infoDelete = self.props.infoDelete
        let info = ""

        // dynamicly accessing nested object with notation
        const pathNotation = (path, obj) => {
          return path.split('.').reduce(function(prev, curr) {
            return prev ? prev[curr] : null
          }, obj || self)
        }

        if(infoDelete) {
          info = infoDelete.map(v => {
            let data = v.recordName
            // console.log("ini data", data)
            let result = Array.isArray(data);
            // console.log("ini result", result)
            let title = ""
            if(result){
              title = data.map(v => row[v]).join(" ")
            } else {
              if (module === 'manage-corporate') {
                title = pathNotation(data, row)
              } else {
                data = data.split(".")
                if(data.length > 1) {
                  title = row[data[0]][data[1]]
                } else {
                  title = row[data]
                }
                // console.log("ini row", row)
                // console.log("ini title", title)
              }
            }
            return v.title + ": " + title
          }).join(" ")
        }

        const targetDataId = module == 'partner-currency'
          ? row.currency_id
          : module === 'partner-hotel-suppliers'
          ? row.hotel_supplier_id
          : module === 'partner-fee-taxes'
          ? row.fee_tax_type_id
          : module === 'partner-city'
          ? row.city_id
          : module === 'partner-meal-plan'
          ? row.meal_plan_type_id
          : module === 'partner-cabin'
          ? row.cabin_type_id
          : module === 'manage-corporate'
          ? row.agent_corporate.id
          : row.id

        const targetDetailId = module === 'manage-corporate'
          ? row.agent_corporate.id
          : row.id

        const showDelete = module !== "integration-partner" && module !== "identity-rules" && module !== "email-setup-template"

        return (
          `
          <a href="javascript:void(0);" data-toggle="tooltip" data-placement="${placement}" class="table-row-action-item ${hideDetail ? "mr-2" : ""}" data-action="edit" data-id="${targetDataId}" title="Click to edit"><img src="${editIcon}"/></a>

          <a href="javascript:void(0);" data-toggle="tooltip" data-placement="${placement}" class="table-row-action-item ${showCopyAct ? "d-inline" : "d-none"}" data-action="copy" data-id="${targetDataId}" title="Click to copy"style="margin-left:7px;"><img src="${CopyIcon}" /></a>
          <a href="javascript:void(0);" data-toggle="tooltip" data-placement="${placement}" class="${hideDetail ? "d-none" : "d-inline"} table-row-action-item" data-action="view" data-id="${targetDetailId}" title="Click to view details"><img src="${showIcon}"/></a>
          <a href="javascript:void(0);" class="${showSwitch ? "d-inline" : "d-none"} custom-switch custom-switch-bb table-row-action-item" data-id="${module === 'employee' ? row.employee_id: row.id}" data-action="update_status" data-status="${row.status}" data-toggle="tooltip" data-placement="${placement}" title="${row.status === 1 ? "Deactivate" : "Activate"}">
            <input type="checkbox" class="custom-control-input check-status-${row.id}" id="customSwitch${row.id}" ${checked} data-action="update_status">
            <label class="custom-control-label" for="customSwitch${row.id}" data-action="update_status"></label>
          </a>
          ${
            self.props.showHistory
            ? `<a href="javascript:void(0);" data-toggle="tooltip" data-placement="${placement}" class="table-row-action-item mr-2" data-action="history" data-id="${row.id}" title="Click to view history"><img src="/img/icons/history.svg"/></a>`
            : ""
          }
          ${showDelete? `<a href="javascript:void(0);" data-toggle="tooltip" data-placement="${placement}" class="table-row-action-item" data-action="delete" data-id="${targetDataId}" data-name="${cvtRecordName}" ${infoDelete ? `data-info="${info}"` : ""}  title="${module === "exchange-rate" || module === "partner-city" ? "Delete" : "Click to delete"}"><img src="${removeIcon}" /></a>`
            : ""
          }
          `
        )
      },
    } : {
      searchable: false,
      orderable: false,
    })

    const initialize = () => {
      let headers = {}
      let auth = localStorage.getItem('ut')
      if (auth) {
        headers = { Authorization : `Bearer ${auth}` }
      }

      let displayStart = 0;
      if(this.queryParams.get("page")) {
        displayStart = (this.props.sizePerPage ? this.props.sizePerPage : 10) * (this.queryParams.get("page")-1)
      }
      let endpoint = this.props.endpoint;
      if(this.props.filterData){
        endpoint = endpoint + "?filters=" + this.props.filterData
      }
      let dt = $(this.table.current).DataTable({
        pagingType: "simple_numbers_no_ellipses",
        colReorder: {
          enable: true,
          iFixedColumnsLeft: 5,
          //   iFixedColumnsRight: 4,
        },
        stateSave: false,
        fixedColumns: true,
        serverSide: true,
        processing: true,
        displayLength: this.props.sizePerPage ? this.props.sizePerPage : 10,
        displayStart: displayStart,
        lengthMenu: [
          [10, 25, 50, 100, -1],
          [10, 25, 50, 100, "All"],
        ],
        keys: true,
        destroy: true,
        ajax: {
          url: this.api.env.endpoint(endpoint),
          headers: headers,
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
                  if(orders.join(",") !== this.queryParams.get('sort')) {
                    this.queryParams.set('page', 1)
                  }
                }
              } else {
                overrideParams.sort = this.queryParams.has('sort')
                ? this.queryParams.get('sort')
                : this.props.customSort
                ? this.props.customSort.join(",")
                : 'sort'
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
                        tempFilters =
                          tempFilters + ',["AND"],' + JSON.stringify(filters[f])
                      }
                      extraFilters.push(tempFilters)
                    }
                    overrideParams.filters =
                      "[" + extraFilters.join(',["OR"],') + "]"
                  } else {
                    overrideParams.filters =
                      "[" + columns.join(',["OR"],') + "]"
                  }
                }
              } else if (filters.length) {
                extraFilters = []
                for (var x in filters) {
                  extraFilters.push(JSON.stringify(filters[x]))
                  if (x < filters.length - 1)
                    extraFilters.push(JSON.stringify(["AND"]))
                }
                overrideParams.filters = "[" + extraFilters.join(",") + "]"
              }
            } catch (e) {}
            this.queryParams.set('sort', overrideParams.sort)
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
            action: function ( e, dt, node, config ) {
              customPrint(e, dt, node, config, isOpenNewTab)
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
              orthogonal: "myExport",
            },
          },
        ],
        rowReorder: {
          selector: ".row-handle",
          update: false,
        },
        responsive: true,
        autoWidth: false,
        // scrollX: true,
        scrollCollapse: false,
        columnDefs: [
          // {
          //   targets: 0,
          //   checkboxes: {
          //     selectRow: true,
          //   },
          // },
          {
            orderable: false,
            className: !this.state.isCheckbox ? "wo-checkbox": "select-checkbox",
            targets: [0],
            width: "5%",
          },
          {
            targets: [1, 2],
            className: !this.state.isCheckbox ? module === "employee" || module === "ancillary" ? "" : "custom-col-width": "cstm-col-width",
          },
          {
            targets: [3],
            className: !module === "loyalty-programs" ? "" : "cstm-col-width-2",
            visible: module ? module === "standard-ancillary-fee" || module === "email-setup" ? false : true : true
          },
          { responsivePriority: 1, targets: 1 },
          { responsivePriority: 2, targets: 2 },
          {
              // The `data` parameter refers to the data for the cell (defined by the
              // `data` option, which defaults to the column being worked with, in
              // this case `data: 0`.
              "render": function ( data, type, row ) {
                var datas = data;
                if(module === 'employee' || module === 'user-management' ){
                  datas = data +' '+ row.middle_name + ' ' + row.surname;
                }
                  return datas
              },
              "targets": module === 'employee' ? 3 : module === 'user-management' ? 2 : ''
          },
          {
              // The `data` parameter refers to the data for the cell (defined by the
              // `data` option, which defaults to the column being worked with, in
              // this case `data: 0`.
              "render": function ( data, type, row ) {
                var datas = data;
                if(module === 'employee'){
                  let division = "";
                  if(row.division.division_name){
                    division = row.division.division_name
                  }

                  datas = data +'<br/>'+ division
                  if (type === "myExport") datas =`${data} / ${division}`
                }
                  return datas
              },
              "targets": module === 'employee' ? 7 : ''
          },
          { visible: false,  targets: module === 'employee' ? [ 4, 5, 8 ] : [] },
          {
            className: module ? module === "standard-ancillary-fee" || module === "email-setup" ? "width-ancillary" : this.props.actionWidthClass || "" : "",
            targets: [2],
          },
          {
            className: module ? module === "email-setup-template" ? "width-ancillary" : this.props.actionWidthClass || "" : "",
            targets: [ columns.length - 1],
          },
          {
            targets: [columns.length - 3, columns.length - 1],
            className: module === "branch-office" ? "desktop" : ""
          },
          {
            targets: [columns.length - 4, columns.length - 3, columns.length - 2, columns.length - 1],
            className: module === "employee" ? "desktop" : ""
          }
          // {
          //   orderable: false,
            // className: "table-row-action",
          //   targets: [columns.length - 1],
          //   width: "20%",
          // },

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
          $(".pagination", wrapper).addClass("float-right float-left-sm mobile-margin")

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
            if (selected.includes(cbHTML.data("id"))) {
              itemsSelected.push(cbHTML.data("id"))
              cbHTML.prop("checked", true)
            }
          }
          let checkedHeader =
            items.length > 0 && itemsSelected.length === items.length
          $(".select-checkbox-all").prop("checked", checkedHeader)

          this.queryParams.sort()
          let query = ''
          for(let pair of this.queryParams.entries()) {
            if(query === '') query += '?'
            if(query.length > 1 ) query += '&'
            query += pair[0] + '=' + pair[1]
          }
          if(query !== '') {
          this.props.history.replace({ pathname: this.props.location.pathname, search: query})
          }
        },
      })

      $(window).on("resize", () => {
        setTimeout(() => {
          if (dt) {
            try {
              dt.responsive.rebuild()
              dt.responsive.recalc()
              // dt.columns.adjust().draw()
            } catch (e) {}
          }
        }, 500)
      })
      dt.on("row-reorder", async (e, diff, edit) => {
        if (diff.length > 0) {
          let module = this.props.title.toLowerCase().split(" ").join("_")
          if (this.props.title.includes("/")) {
            module = this.props.title
              .toLowerCase()
              .replace(/ /g, "")
              .replace("/", "-")
              .split(" ")
              .join("_")
          }

          if(module === 'frequent_traveler_program'){
            module = 'loyalty_programs'
          }

          if(module === 'fee_type'){
            module = 'fee_tax_type'
          }

          let rowID = edit.triggerRow.data().id
          let rowPositionDiff = diff.findIndex(
            (v) => dt.row(v.node).data().id === rowID,
          )
          let targetIdx = rowPositionDiff === 0 ? 1 : diff.length - 2
          let sort = dt.row(diff[targetIdx].node)?.data()?.sort || 0
          try {
            let res = await this.api.post(`/master/batch-actions/sort/${module}`, { id: rowID, sort })
            $(this.table.current).DataTable().draw(false)
          } catch (e) {
          }
        }
      })

      dt.on('page.dt', async () => {
        var info = dt.page.info();
        this.queryParams.set("page", info.page+1)
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

  onYear(value) {
    this.inProgress = true
    if (value + "" !== "") {
      this.setState({
        year: value,
        extraFilters:[["start_date", "like", value],["or"],["end_date", "like", value]]
      })
    } else {
      this.setState({
        year: new Date().getFullYear(),
        extraFilters:[["start_date", "like", new Date().getFullYear()],["or"],["end_date", "like", new Date().getFullYear()]]
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
        year: ""
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
      }, 1500)
    } catch (e) {}
  }

  onDownload() {
    try {
      let prevLen = this.dt.page.len()
      this.dt.page.len(-1).draw()
      setTimeout(() => {
        this.dt
          .buttons(
            this.props.btnDownload ? this.props.btnDownload : ".buttons-excel",
          )
          .trigger()
        this.dt.page.len(prevLen).draw()
      }, 1500)
    } catch (e) {
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

  // onYearUpdate(year) {
  //   this.api
  //     .get(`${this.props.endpoint}?filters=[["start_date","like","${year}"],["or"],["end_date","like","${year}"]]`)
  //     .then(() => {
  //       this.dt.ajax.reload()
  //     })
  //     .finally(() => {
  //       this.deselectAll()
  //     })
  // }

  onRemoveSelected() {
    this.setState({
      isOpen: true,
      deleteType: "selected",
      id: this.state.selected,
    })
  }

  deleteAction(id, name, info) {
    // let titleInfo = this.props.titleInfoDelete ? this.props.titleInfoDelete : ""
    this.setState({
      isOpen: true,
      deleteType: "single",
      id: id,
      name: name,
      info: info || name
    })
  }

  updateStatus(id, item) {
    let status = $(item).data("status")
    let table = $("table")
    let switchBtn = $(`.check-status-${id}`, table)
    if (status === 1) {
      switchBtn.prop("checked", false)
      $(item).data("status", '3')
      this.setState({
        selected: [id]
      }, () => this.onStatusUpdate(3))
    } else {
      switchBtn.prop("checked", true)
      $(item).data("status", '1')
      this.setState({
        selected: [id]
      }, () => this.onStatusUpdate(1))
    }
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
    if (this.props.reloadTable) {
      this.dt.ajax.reload()
      this.props.setReloadTable(false)
    }
    this.inProgress = true
    try {
      if (prevProps.filters !== this.props.filters) this.dt.ajax.reload()
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
        // let table = $(e.target).closest("table")
        let table = $("table")
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

        if (itemsChecked.length > 0) {
          for (let idx = 0; idx < itemsChecked.length; idx++) {
            let id = $(itemsChecked.get(idx)).data("id")
            if (!selected.includes(id)) {
              selected.push(id)
            }
          }
        } else {
          const idsToDelete = new Set(itemsId)
          selected = selected.filter((id) => !idsToDelete.has(id))
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
        // let table = $(e.target).closest("table")
        let table = $("table")
        let itemId = $($(e.target).get(0)).data("id")
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
        if (selected.includes(itemId)) {
          selected = selected.filter((e) => e !== itemId)
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
        let info = $(this).data("info")
        let base = me.props.baseRoute || ""
        let routeHistory = me.props.routeHistory || ""
        $('[data-toggle="tooltip"]').tooltip("hide")
        switch ($(this).data("action")) {
          case "edit":
            if(me.props.createOnModal) {
              me.props.setCreateModal({show: true, id, disabled_form: false})
            } else if(me.props.isReplaceTable) {
              me.props.setId(id);
              me.props.handleReplaceTable(!me.props.isReplaceTable)
              me.props.handleIsDetail(false)
            } else if(me.props.createNewModal) {
              me.props.setCreateModal({show: true, id, disabled_form: false})
            }
              
            
             else {
              me.props.history.push(base + "/" + id)
            }
            break
          case "copy":
            me.props.setCreateModal({show: true, id, disabled_form: false})
            break
          case "view":
            if(me.props.createOnModal) {
              me.props.setCreateModal({show: true, id, disabled_form: true})
            } else if(me.props.createNewModal) {
              me.props.setCreateNewModal({show: true, id, disabled_form: true})
            } else if(me.props.isReplaceTable) {
              me.props.setId(id);
              me.props.handleReplaceTable(!me.props.isReplaceTable)
              me.props.handleIsDetail(true)
            } else {
              me.props.history.push(base + "/" + id + "?action=view")
            }
            break
          case "history":
            me.props.history.push(routeHistory + "/" + id )
            break
          case "update_status":
            me.updateStatus.bind(me)(id, this)
            break
          default:
            if(me.props.modalDelete) {
              me.props.setModalDelete({show: true, id, disabled_form: false})
            }else{
              me.deleteAction.bind(me)(id, name, info)
            }
            break
        }
      })
    $.fn.DataTable.ext.pager.numbers_length = 5

    const { showCreateModal, modalTitle, modalTitleNew, showModalDelete, showCreateNewModal, createNewModal, createOnModal, module, deleteEndpoint, showModalHeader = true} = this.props
    return (
      <div ref={this.wrapper}>
        <Modal show={this.state.isOpen}>
          {showModalHeader ?
            <ModalHeader>
            Delete{" "}
            {this.props.titleModal
              ? this.state.deleteType === "single"
                ? this.props.titleModal
                : this.props.title
              : this.props.title}
          </ModalHeader> : ""
          }
          
          <ModalBody>Are you sure you want to delete {
            this.props.showInfoDelete ? this.state.selected.length > 0 ? "this" : `'${this.state.info}'` : "this"
          }?</ModalBody>
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
                        message: `Record ${this.props.showInfoDelete ? `'${this.state.info}'` : this.state.name} was successfully deleted.`,
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
                    .post(deleteEndpoint, this.state.selected)
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
        
        {createOnModal && <ModalCreate
          modalTitle={modalTitle}
          show={showCreateModal.show}
          onClick={() => this.props.setCreateModal({show: false, id: null, disabled_form: false})}
          modalContent={this.props.modalContent}
          modalSize={this.props.modalSize}
          scrollable={true}
        />}

        {createNewModal && <ModalCreateNew
          modalTitle={modalTitleNew}
          show={showCreateNewModal.show}
          onClick={() => this.props.setCreateNewModal({show: false, id: null, disabled_form: false})}
          modalContent={this.props.modalContentNew}
          modalSize={this.props.modalSize}
          scrollable={true}
        />}
        <ModalDelete
          modalTitle={modalTitle}
          show={showModalDelete.show}
          onClick={() => this.props.setModalDelete({show: false, id: null, disabled_form: false})}
          modalContent={this.props.modalDeleteContent}
          modalSize={this.props.modalSize}
          scrollable={true}
        />

        {this.props.module !== "fare-types" ? <TableHeader
          {...this.props}
          createOnModal={this.props.createOnModal}
          createNewModal={this.props.createNewModal}
          selected={this.state.selected.length > 0 && !this.props.switchStatus}
          hideFilter={this.state.hideFilter}
          extraFilter={this.props.extraFilter}
          onSearch={this.onSearch.bind(this)}
          onStatus={this.onStatus.bind(this)}
          onYear={this.onYear.bind(this)}
          onReset={this.onReset.bind(this)}
          onPrint={this.onPrint.bind(this)}
          onDownload={this.onDownload.bind(this)}
          onToggleFilter={this.onToggleFilter.bind(this)}
          onStatusUpdate={this.onStatusUpdate.bind(this)}
          onRemove={this.onRemoveSelected.bind(this)}
          hideCreate={this.props.hideCreate}
          handleReplaceTable={this.props.handleReplaceTable}
        >
          {this.props.children}
        </TableHeader>
        :""}
        {/* {
          this.props.module === "room" ? null :
          <TableHeader
            {...this.props}
            createOnModal={this.props.createOnModal}
            selected={this.state.selected.length > 0 && !this.props.switchStatus}
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
        } */}
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
    showCreateModal: ui.showCreateModal,
    showCreateNewModal: ui.showCreateNewModal,
    showModalDelete: ui.showModalDelete,
    reloadTable: ui.reloadTable,
    modalTitle: ui.modalTitle,
    modalTitleNew: ui.modalTitleNew
  }
}

const mapDispatchToProps = (dispatch) => ({
  setAlert: (payload) => dispatch(setAlert(payload)),
  setCreateModal: (payload) => dispatch(setCreateModal(payload)),
  setCreateNewModal: (payload) => dispatch(setCreateNewModal(payload)),
  setReloadTable: (payload) => dispatch(setReloadTable(payload)),
  setModalDelete: (payload) => dispatch(setModalDelete(payload)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(BBDataTable))
