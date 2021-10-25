import { Component } from "react"

export default class FormWrapper extends Component {
  render() {
    return (
      <div className="row">
        {this.props.children.length > 1 ? (
          <div className="col-xs-12 col-sm-6 col-md-7 order-2 order-sm-1">
            {this.props.children[0]}
          </div>
        ) : (
          <div className="col-xs-12">{this.props.children}</div>
        )}
        {this.props.children.length > 1 ? (
          <div className="col-xs-12 col-sm-6 col-md-5 order-sm-2">
            <div className="card card-default shadow-none border-none bg-block-card">
              <div className="card-body">
                <h4>{this.props.rightTitle || "For Interface Purpose"}</h4>
                {this.props.children[1]}
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    )
  }
}
