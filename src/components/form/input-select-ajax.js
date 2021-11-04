import React, { Component } from "react"
import FormInputControl from "./input-control"
import $ from "jquery"
import "select2"
import "select2/dist/css/select2.css"
import "@ttskch/select2-bootstrap4-theme/dist/select2-bootstrap4.css"
import Api from "config/api"

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

  init() {
    setTimeout(() => {
      try {
        let config = {
          theme: "bootstrap4",
        }
        if (!this.props.children) {
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

              return {
                filters: params.term ? JSON.stringify(filters) : "",
                sort: this.props.column,
                page: params.page && params.page - 1 ? params.page - 1 : 0,
              }
            },
          }
        }
        let input = this.select.current.getInput()
        this.select2 = $(input)
          .not(".select2-hidden-accessible")
          .select2(config)
        if (this.select2) {
          this.select2.on("select2:select", (e) => {
            if (!this.props.onChange) {
              return
            }
            if ($(input).attr("multiple")) {
              this.props.onChange(e, this.select2.select2("data")[0])
            } else {
              this.props.onChange(e, this.select2.select2("data"))
            }
          })

          this.setInitialData()

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

  componentDidUpdate() {
    this.setInitialData()
  }

  setInitialData() {
    try {
      if (this.props.data && this.props.data.length) {
        this.select2.empty()
        for (let i in this.props.data) {
          let item = this.props.data[i]
          this.select2.append(
            '<option value="' + item.id + '">' + item.text + "</option>",
          )
        }
        this.select2.trigger("change")
      }
    } catch (e) {}
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
    } catch (e) {}
  }

  render() {
    return <FormInputControl ref={this.select} type="select" {...this.props} />
  }
}