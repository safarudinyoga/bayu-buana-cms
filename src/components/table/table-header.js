import downloadIcon from "assets/download.svg"
import printIcon from "assets/printer.svg"
import resetIcon from "assets/reset.svg"
import {Component} from "react"
import {OverlayTrigger, Tooltip} from "react-bootstrap"
import {Link, withRouter} from "react-router-dom"
import "../button/button.css"
import "./table-header.css"

class TableHeader extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showFilter: false,
      showAdvancedOptions: true,
      searchValue: "",
      statusValue: "0",
    }
    this.toggleFilter = this.toggleFilter.bind(this)
  }

  toggleFilter() {
    this.setState({
      showFilter: !this.state.showFilter,
    })
    setTimeout(() => {
      this.handleToggle()
    }, 200)
  }

  handleClick() {
    this.props.history.push(this.props.baseRoute || "/master/aircraft/form")
  }

  handleSearch(e) {
    if (this.props.onSearch) {
      this.props.onSearch(e.target.value)
    }
    this.setState({
      searchValue: e.target.value,
    })
  }

  handleStatus(e) {
    if (this.props.onStatus) {
      this.props.onStatus(e.target.value)
    }
    this.setState({
      statusValue: e.target.value,
    })
  }

  handleReset() {
    if (this.props.onReset) {
      this.props.onReset()
    }
    this.setState({
      showFilter: false,
      searchValue: "",
      statusValue: "0",
    })
  }

  handlePrint() {
    if (this.props.onPrint) {
      this.props.onPrint()
    }
  }

  handleDownload() {
    if (this.props.onDownload) {
      this.props.onDownload()
    }
  }

  handleToggle() {
    if (this.props.onToggleFilter) {
      this.props.onToggleFilter(this.state.showFilter)
    }
  }

  handleStatusUpdate(status) {
    if (this.props.onStatusUpdate) {
      this.props.onStatusUpdate(status)
    }
  }

  handleRemove() {
    if (this.props.onRemove) {
      this.props.onRemove()
    }
  }

  render() {
    const ExtraFilter = this.props.extraFilter
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 order-2 order-sm-1 mt-2">
            <div className="row">
              <div className="col-xs-12 col-sm-6">
                <div className="input-group input-group-with-text">
                  <input
                    value={this.state.searchValue}
                    className="form-control"
                    placeholder="Search..."
                    onChange={this.handleSearch.bind(this)}
                    maxLength={256}
                    minLength={1}
                  />
                  <div className="input-group-append">
                    <span className="input-group-text">
                      <i className="fas fa-search"></i>
                    </span>
                  </div>
                </div>
              </div>
              {this.state.showAdvancedOptions && (
                <div className="col-xs-12 col-sm-6">
                  <button
                    onClick={this.toggleFilter}
                    type="button"
                    className="btn btn-link advanced-options-btn float-right-sm"
                  >
                    <span style={{marginRight: 10}}>Advanced Options</span>
                    {this.state.showFilter ? (
                      <span className="raquo-down"> &laquo;</span>
                    ) : (
                      <span className="raquo-down"> &raquo;</span>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 order-sm-2 mt-2">
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Click to create</Tooltip>}
            >
              <button
                type="button"
                onClick={this.handleClick.bind(this)}
                className="btn btn-warning float-right button-new"
              >
                <span className="text-button-new">
                  <i className="fas fa-file-medical mr-2"></i>
                  Create New
                </span>
              </button>
            </OverlayTrigger>

            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Click to print</Tooltip>}
            >
              <Link
                to="#"
                onClick={this.handlePrint.bind(this)}
                className="btn-table-action float-right"
              >
                <img src={printIcon} className="img-circle" alt="print" />
              </Link>
            </OverlayTrigger>

            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Click to download</Tooltip>}
            >
              <Link
                to="#"
                onClick={this.handleDownload.bind(this)}
                className="btn-table-action float-right"
              >
                <img
                  src={downloadIcon}
                  className="img-circle"
                  alt="download"
                  id="datatable-download"
                />
              </Link>
            </OverlayTrigger>
          </div>
        </div>
        <div
          className={
            this.state.showFilter && !this.props.selected
              ? "card card-default advanced-filter shadow-none mt-2"
              : "d-none"
          }
        >
          <div className="card-body">
            <div className="row">
              {ExtraFilter ? (
                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4">
                  <ExtraFilter />
                </div>
              ) : (
                ""
              )}

              {this.props.children}
              <div className="col-xs-12 col-sm-12 col-md-6 col-lg-8">
                <div className="row">
                  <div className="col-xs-4">
                    <label className="text-label-filter">Status: </label>
                    <select
                      className="custom-select custom-select-md mb-3 text-input-select"
                      value={this.state.statusValue}
                      onChange={this.handleStatus.bind(this)}
                    >
                      <option className="text-input-select" value="0">
                        All
                      </option>
                      <option className="text-input-select" value="1">
                        Active
                      </option>
                      <option className="text-input-select" value="3">
                        Inactive
                      </option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Reset</Tooltip>}
            >
              <Link
                to="#"
                onClick={this.handleReset.bind(this)}
                className="btn-table-action btn-table-action-reset"
              >
                <img src={resetIcon} className="img-circle" alt="reset" />
              </Link>
            </OverlayTrigger>
          </div>
        </div>

        <div
          className={this.props.selected ? "container-fluid mt-2" : "d-none"}
        >
          <div className="row">
            <div className="col-xs-12">
              <button
                type="button"
                className="btn btn-default textButtonSave dropdown-toggle btn-table-action-dropdown py-2"
                data-toggle="dropdown"
                aria-expanded="false"
              >
                Update Status
              </button>
              <div className="dropdown-menu shadow-none">
                <Link
                  className="dropdown-item"
                  to="#"
                  onClick={this.handleStatusUpdate.bind(this, 1)}
                >
                  Active
                </Link>
                <Link
                  className="dropdown-item"
                  to="#"
                  onClick={this.handleStatusUpdate.bind(this, 3)}
                >
                  Inactive
                </Link>
              </div>
              <button
                onClick={this.handleRemove.bind(this)}
                type="button"
                className="btn btn-default textButtonSave bg-dark-green p-2 ml-2"
              >
                Remove {(this.props.title || "selected").split(' ')
                  .map(w => w[0].toUpperCase() + w.substr(1).toLowerCase())
                  .join(' ')}
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(TableHeader)
