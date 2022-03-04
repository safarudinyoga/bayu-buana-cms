import React, { Component } from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import "./sidebar.scss"
import getMenu from '../../config/menu';

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
        </p>
          {menu.is_expanded && <i className="right fas fa-angle-right"></i>}
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

  state = {
    menu : []
  }

  async componentDidMount () {
    let menu = JSON.parse(localStorage.getItem('menu'))
    if(menu && menu.length > 0) {
      this.setState({menu})
    } else {
      try {
        let menu = await getMenu()
        this.setState({menu})
      } catch (e) {console.log(e)}
    }
  }

  render() {
    const { menu } = this.state
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
