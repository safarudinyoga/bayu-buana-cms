import { Component } from "react"

export default class FormHorizontal extends Component {
  render() {
    return <div className="form-horizontal" style={this.props.style}>{this.props.children}</div>
  }
}
