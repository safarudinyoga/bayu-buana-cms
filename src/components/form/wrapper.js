import {Component} from "react"

export default class FormWrapper extends Component {
  render() {
    return (
       <div className="row">
      {this.props.children.length > 1 ? (
        <div className="col-xs-12 col-sm-6 col-md-7 col-lg-6 order-2 order-sm-1 mb-4">
          {this.props.children[0]}
        </div>
      ) : (
        <div className="col-xs-12 col-sm-6 col-md-12 col-lg-8">{this.props.children}</div>
      )}
      {this.props.children.length > 1 ? (
        <div className="col-xs-12 col-sm-6 col-md-5 col-lg-6 order-sm-2">
          <div className="card card-default shadow-none border-none bg-block-card">
            <div className="card-body">
              <div className="text-sub-header">{this.props.rightTitle || "For Interface Purpose"}</div>
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
