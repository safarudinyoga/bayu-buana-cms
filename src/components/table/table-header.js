import downloadIcon from "assets/download.svg"
import arrowdownIcon from "assets/icons/arrow-down.svg"
import createIcon from "assets/icons/create.svg"
import downIcon from "assets/icons/double-down.svg"
import upIcon from "assets/icons/double-up.svg"
import dropdownIcon from "assets/icons/dropdownArrow.svg"
import printIcon from "assets/printer.svg"
import resetIcon from "assets/reset.svg"
import {debounce} from "lodash"
import {Component} from "react"
import {OverlayTrigger, Tooltip} from "react-bootstrap"
import {Link, withRouter} from "react-router-dom"
import Select, {components} from "react-select"
import "../button/button.css"
import "./table-header.css"

const DownIcon = () => {
  return <img src={arrowdownIcon} alt="down" />;
};
const DropdownIndicator = props => {
  return (
    <components.DropdownIndicator {...props}>
      <DownIcon />
    </components.DropdownIndicator>
  );
};
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
    width: 135,
    marginTop: -1,
    marginLeft: 8,
    border: "1px solid #DADEDF",
    fontSize: 13,
    fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: "white",
    boxShadow: state.isFocused ? 0 : 0,
    "&:hover": {
      border: "1px solid #DADEDF",
    },
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1
    const transition = "opacity 300ms"
    return {...provided, opacity, transition}
  },
}
const options = [
  {value: "0", label: "All"},
  {value: "1", label: "Active"},
  {value: "3", label: "Inactive"},
]

const StatusSelect = (props) => {
  return (
    <>
      <label className="text-label-filter ml-2 font-weight-bold">Status :</label>
        <Select
          components={{IndicatorSeparator: () => null, DropdownIndicator}}
          value={props.options[props.value]}
          onChange={props.onChange}
          styles={customStyles}
          options={props.options}
          placeholder="Please choose"
        />
    </>
  )
}
class TableHeader extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showFilter: false,
      showAdvancedOptions: props.showAdvancedOptions ?? true,
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

  handleSearchDebounce = debounce((text) => this.props.onSearch(text), 500)

  handleSearch(e) {
    this.setState({
      searchValue: e.target.value,
    })
    if (this.props.onSearch) {
      this.handleSearchDebounce(e.target.value.toLowerCase())
    }
  }

  handleStatus(statusValue) {
    if (this.props.onStatus) {
      this.props.onStatus(statusValue.value)
    }
    this.setState({statusValue})
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
    const { customFilterStatus } = this.props

    const {pathname} = this.props.location;
    console.log(pathname);
    return (
      <div className="container-fluid pl-0">
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-4 col-lg-3 col-xl-3">
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


          <div className="col-xs-12 col-sm-12 col-md-4 col-lg-5 col-xl-5 padding-0 align-middle">
            {this.state.showAdvancedOptions && (
              <button
                onClick={this.toggleFilter}
                type="button"
                className="btn btn-link advanced-options-btn float-right float-md-left"
              >
                <span className="mr-2">Advanced Options</span>{" "}
                {this.state.showFilter ? (
                  <img src={upIcon} alt="up" />
                ) : (
                  <img src={downIcon} alt="down" />
                )}
              </button>
            )}

            { pathname === "/master/divisions" &&
            <Link
              to="/master/divisions/hierarchy"
              className="menu-link ml-5"
            >
             View Hierarchy
            </Link>
            }
          </div>

          <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 mb-2 mb-md-0 order-first order-md-last">
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Click to create</Tooltip>}
            >
              <button
                type="button"
                onClick={this.handleClick.bind(this)}
                className="btn btn-warning float-right button-new"
              >
                <img src={createIcon} className="mr-1" alt="new" />
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
              ? "card card-default advanced-filter shadow-none my-2"
              : "d-none"
          }
        >
          <div className="card-body-filter">
            <div className="row">
              {this.state.showFilter ? ExtraFilter ? <ExtraFilter /> : "" : ""}

              {this.props.children}
              <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4">
                <div className="row">
                  <div className="col-xs-4">
                    <StatusSelect
                      value={customFilterStatus ? customFilterStatus.value : this.state.statusValue}
                      onChange={this.handleStatus.bind(this)}
                      options={customFilterStatus ? customFilterStatus.options : options}
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
                <img src={resetIcon} className="img-fluid" alt="reset" />
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
                UPDATE STATUS
                <img className="ml-1" src={dropdownIcon} alt="down" />
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
                className="btn btn-default textButtonSave bg-dark-green p-2 ml-3"
              >
                REMOVE {this.props.title.toUpperCase()}
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(TableHeader)
