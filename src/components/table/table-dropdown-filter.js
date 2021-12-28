import React, { Component } from "react"
import "components/table/table-dropdown-filter.css"
import $ from "jquery"
import "select2"
import "select2/dist/css/select2.css"
import "@ttskch/select2-bootstrap4-theme/dist/select2-bootstrap4.css"
import Api from "config/api"


export default class TableDropdownFilter extends Component {
  constructor(props) {
    super(props)
    this.select = React.createRef()
    this.select2 = null
    this.api = new Api()
  }

  componentDidMount() {
      this.init()
  }

  componentDidUpdate() {
      
  }

  init() {
    setTimeout(() => {
      try {
        let config = {
          theme: "bootstrap4",
          data: this.props.data,
          placeholder: this.props.placeholder,
        }
        // if (!this.props.children || this.props.children.length < 1) {
          config.ajax = {
            url: this.api.env.endpoint(this.props.endpoint),
            processResults: (json) => {
              if (this.props.onResponse) {
                return this.onResponse(json)
              }

              json.items.forEach((item) => {
                item.text = item[this.props.column]
              })

              return {
                results: json.items,
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
                sort: this.props.column,
                page: params.page && params.page - 1 ? params.page - 1 : 0,
              }
            },
          }
        // }
        let input = this.select.current
        this.select2 = $(input)
          .not(".select2-hidden-accessible")
          .select2(config)
        if (this.select2) {
          this.select2.on("select2:select select2:unselect", (e) => {
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
    try {
        let el = $(this.select.current)
        if (el.is(".select2-hidden-accessible")) {
            el.off().select2("destroy")
        }
    } catch (e) {}
  }
  
  
  render() {
    return (
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
  }
}
function formatText (icon) {
  return $('<span class="multiple" ><i class="fas ' + $(icon.element).data('icon') + '"></i> ' + icon.text + '</span>');
};

$('.select2-icon').select2({
  width: "50%",
  templateSelection: formatText,
  templateResult: formatText
});
