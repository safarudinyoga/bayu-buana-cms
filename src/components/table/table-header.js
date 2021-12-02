import downloadIcon from "assets/download.svg"
import printIcon from "assets/printer.svg"
import resetIcon from "assets/reset.svg"
import createIcon from "assets/icons/create.svg"
import downIcon from "assets/icons/double-down.svg"
import upIcon from "assets/icons/double-up.svg"
import { Component } from "react"
import { OverlayTrigger, Tooltip } from "react-bootstrap"
import { Link, withRouter } from "react-router-dom"
import "../button/button.css"
import "./table-header.css"
import Select from "react-select"
import { debounce } from "throttle-debounce"

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    color: "black",
    backgroundColor: state.isSelected ? "white" : "white",
    padding: 10,
    fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
    fontSize: 13,
    "&:hover": {
      // Overwrittes the different states of border
      backgroundColor: state.isFocused ? "#027F71" : "",
      color: state.isFocused ? "white" : "black",
    },
  }),
  control: (base, state) => ({
    ...base,
    height: 10,
    width: 120,
    marginTop: -1,
    marginLeft: 8,
    border: "1px solid #DADEDF",
    fontSize: 13,
    backgroundColor: "white",
    boxShadow: state.isFocused ? 0 : 0,
    "&:hover": {
      border: "1px solid #DADEDF",
    },
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1
    const transition = "opacity 300ms"
    return { ...provided, opacity, transition }
  },
}
const options = [
  { value: "0", label: "All" },
  { value: "1", label: "Active" },
  { value: "3", label: "Inactive" },
]
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
      setTimeout(() => {
        this.props.onSearch(e.target.value)
      }, 3000)
    }
    this.setState({
      searchValue: e.target.value,
    })
  }

  handleStatus(statusValue) {
    if (this.props.onStatus) {
      this.props.onStatus(statusValue.value)
    }
    this.setState({ statusValue })
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
      <div className="container-fluid pl-0">
        <div className="row">
          <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 order-2 order-sm-1 mt-2">
            <div className="input-group input-group-with-text float-md-left">
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
            {this.state.showAdvancedOptions && (
              <button
                onClick={this.toggleFilter}
                type="button"
                className="btn btn-link advanced-options-btn float-left float-right-sm pr-0"
              >
                <span className="mr-2">Advanced Options</span>{" "}
                {this.state.showFilter ? (
                  <img src={downIcon} alt="down" />
                ) : (
                  <img src={upIcon} alt="up" />
                )}
              </button>
            )}
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
                <img src={createIcon} className="mr-1" />
                Create New
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
              {ExtraFilter ? <ExtraFilter /> : ""}

              {this.props.children}
              <div className="col-xs-12 col-sm-12 col-md-6 col-lg-8">
                <div className="row">
                  <div className="col-xs-4">
                    <label className="text-label-filter ml-2">Status :</label>
                    <Select
                      value={options[this.state.statusValue]}
                      onChange={this.handleStatus.bind(this)}
                      styles={customStyles}
                      options={options}
                    />
                  </div>
                </div>
              </div>
            </div>
            <OverlayTrigger placement="top" overlay={<Tooltip>Reset</Tooltip>}>
              <Link
                to="#"
                onClick={this.handleReset.bind(this)}
                className="btn-table-action-reset"
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
            <div className="col-xs-12 d-flex flex-row">
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
                Remove {this.props.title}
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(TableHeader)
