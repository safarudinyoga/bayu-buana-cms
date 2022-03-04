import BriefCaseIcon from "assets/icons/briefcase.svg"
import HomeIcon from "assets/icons/home.svg"
import React, { Component } from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import "./sidebar.scss"

const SubMenu = ({menu}) => {
  return (
    <li className="nav-item">
      <Link
        to={menu.url}
        className="nav-link"
      >
        <p>{menu.description}</p>
      </Link>
    </li>
  )
}

const ParentMenu = ({menu}) => {
  let {submenu, menu_link_asset} = menu
  return (
    <li className="nav-item">
      <Link to={menu.url} className="nav-link">
        <img src={menu_link_asset.multimedia_description.url} alt={menu_link_asset.multimedia_description.file_name} />
        <p>
          {menu.description}
          {submenu.length > 0 && <i className="right fas fa-angle-right"></i>}
        </p>
      </Link>
      {
        submenu.length > 0 && (
          <ul className="nav nav-treeview">
            {
              submenu.map((m, k) => <SubMenu key={k} menu={m} />)
            }
          </ul>
        )
      }
    </li>
  )
}
class Sidebar extends Component {

  render() {
    let menu = JSON.parse(localStorage.getItem('menu'))
    return (
      <aside className="main-sidebar sidebar-dark-primary elevation-4">
        <div className="sidebar">
          <nav className="mt-2">
            <ul
              className="nav nav-sidebar flex-column"
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >
              {
                menu.map((m, k) => <ParentMenu key={k} menu={m} />)
              }
            </ul>
          </nav>
        </div>
      </aside>
    )
  }
}

const mapStateToProps = ({ ui }) => {
  return {
    menu: ui.menu,
  }
}

export default connect(mapStateToProps)(Sidebar)
