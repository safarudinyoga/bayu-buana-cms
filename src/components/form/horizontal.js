import { Component } from "react"

export default class FormHorizontal extends Component {
  render() {
    return <div className="form-horizontal">{this.props.children}</div>
  }
}
