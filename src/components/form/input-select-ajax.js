import "@ttskch/select2-bootstrap4-theme/dist/select2-bootstrap4.css"
import Api from "config/api"
import $ from "jquery"
import React, {Component} from "react"
import "select2"
import "select2/dist/css/select2.css"
import FormInputControl from "./input-control"
import "./input-select-ajax.css"

export default class FormInputSelectAjax extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.select = React.createRef()
    this.select2 = null
    this.api = new Api()
    this.inProgress = false
  }

  componentDidMount() {
    this.init()
  }

  formatState(type, state){
    if (!state.id) {
      return state.text;
    }
    var $state = $(
      `<span class="${type === "selectmultiple" ? "multiple" : ""}">${state.text}</span>`
    );
    return $state;
  }

  groupBy (array, key) {
    // Return the end result
    return array.reduce((result, currentValue) => {
      // If an array already present for key, push it to the array. Else create an array and push the object
      (result[currentValue[key]] = result[currentValue[key]] || []).push(
        currentValue
      );
      // Return the current iteration `result` value, this will be taken as next iteration `result` value and accumulate
      return result;
    }, {}); // empty object is the initial value for result object
  };
  init() {
    const {isGrouping, isArray, isFilter, allowClear} = this.props
    setTimeout(() => {
      try {
        let config = {
          placeholder: this.props.placeholder || 'Please choose',
          theme: "bootstrap4",
          data: this.props.data,
          allowClear: allowClear !== undefined ? allowClear : true,
          templateResult: (state) => this.formatState(this.props.type, state)
        }
        if (!this.props.children) {
          config.ajax = {
            url: this.api.env.endpoint(this.props.endpoint),
            processResults: (json) => {
              if (this.props.onResponse) {
                return this.onResponse(json)
              }

              var filtered = json.items;
              if(isGrouping){
                var ids = json.items.map((item, index)=>{
                  return item[this.props.fieldGroup]
                })
                filtered = json.items.filter((item, index) => {
                  return !ids.includes(item[this.props.fieldGroup], index + 1)
                })
                if(this.props.fieldGroup.includes(".")){
                  const results = this.props.fieldGroup.split(".");
                  ids = json.items.map((item, index)=>{
                    return item[results[0]][results[1]]
                  })
                  filtered = json.items.filter((item, index) => {
                    return !ids.includes(item[results[0]][results[1]], index + 1)
                  })
                }

                if(isArray){
                  const datas = json.items.map((item, index)=>{
                    return item[this.props.fieldArray]
                  })
                  var dataMerge = [];
                  for (var i = 0; i < datas.length; i++) {
                    for (var j = 0; j < datas[i].length; j++) {
                      const results = this.props.column.split(".");
                      if(datas[i][j][results[0]]){
                        dataMerge = dataMerge.concat(datas[i]);
                      }
                    }
                  }
                  const ids = dataMerge.map((item, index)=>{
                    return item[this.props.fieldGroup]
                  })
                  filtered = dataMerge.filter((item, index) => {
                    return !ids.includes(item[this.props.fieldGroup], index + 1)
                  })

                }
              }

              filtered.forEach((item) => {
                if(this.props.column.includes(".")){
                  const results = this.props.column.split(".");
                  if(isGrouping){
                    item.id   = item[this.props.fieldGroup]
                    if(this.props.fieldGroup.includes(".")){
                      const results = this.props.fieldGroup.split(".");
                      item.id   = item[results[0]][results[1]]
                    }
                  }
                  if(item[results[0]]){
                    item.text = item[results[0]][results[1]]
                  }
                }else{
                  item.text = item[this.props.column]
                }
              })

              return {
                results: filtered,
                pagination: {
                  mode: json.last === false,
                },
              }
            },
            data: (params) => {
              if (this.props.onRequest) {
                return this.props.onRequest(params)
              }

              let filters = [this.props.column, "like", params.term]
              let filter = "";
              if(this.props.filter){
                filter = this.props.filter
                filters = [[this.props.column, "like", params.term],["AND"],JSON.parse(filter)]
              }
              return {
                filters: params.term ? JSON.stringify(filters) : filter,
                sort: this.props.sort ? this.props.sort : this.props.column,
                size: -1,
                page: params.page && params.page - 1 ? params.page - 1 : 0,
              }
            },
          }
        }
        let input = isFilter ? this.select.current : this.select.current.getInput()
        this.select2 = $(input)
          .not(".select2-hidden-accessible")
          .select2(config)
        if (this.select2) {
          this.select2.on("select2:select", (e) => {
            if (!this.props.onChange) {
              return
            }
            this.props.onChange(e, this.select2.select2("data"))
          })
          this.select2.on("select2:unselect", (e) => {
            if (!this.props.onChange) {
              return
            }
            this.props.onChange(e, this.select2.select2("data"))
          })

          setTimeout(() => {
            if (this.props.value) {
              this.select2.val(this.props.value).trigger("change")
            }
          }, 200)
        }
      } catch (e) {
        console.log(e)
      }
    }, 300)
  }

  componentWillUnmount() {
    this.destroy()
  }

  destroy() {
    try {
      let el = $(this.select.current)
      if (el.is(".select2-hidden-accessible")) {
        el.off().select2("destroy")
      }
    } catch (e) { }
  }

  render() {
    const {isFilter} = this.props
    return isFilter 
    ? (
      <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4">        
        <div className="col-xs-4">      
          <label className="text-label-filter font-weight-bold">{this.props.label}</label>
          <div className="input-group mb-3 mb-sm-0">
          <select  ref={this.select} multiple="multiple">
            {this.props.children}        
          </select>
          </div>
        </div>
      </div>
    )
    : <FormInputControl ref={this.select} type={this.props.type} {...this.props} />
  }
}
