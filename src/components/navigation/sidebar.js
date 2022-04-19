import React, { Component } from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import "./sidebar.scss"
import getMenu from '../../config/menu';
import $ from "jquery"
import * as AdminLte from  "admin-lte"

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
  let {submenu, menu_link_asset, id} = menu
  return (
    <li className="nav-item parent-menu" id={id}>
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
  constructor (props) {
    super(props);
    this.state = {
      menu : [],
      sideNav: ''
    }
    $('[data-widget="treeview"]').each(function() {
        AdminLte.Treeview._jQueryInterface.call($(this), 'init');
    });
  }


  async componentDidMount () {
    // $('[data-widget="treeview"]').Treeview('init')
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

  handleHoverOn(){
    $('li.nav-item.parent-menu.menu-is-opening.menu-open').find('ul.nav.nav-treeview').css("display","block")
  }

  handleHoverOff(){
    $('li.nav-item.parent-menu.menu-is-opening.menu-open').find('ul.nav.nav-treeview').css("display","none")
  }

  render() {
    const { menu } = this.state

    $('ul').on('expanded.lte.treeview', (a, b) => {
      // $('ul').find('li.nav-item.parent-menu.menu-is-opening.menu-open').removeClass(".menu-is-opening menu-open")
      console.log($('ul').find('li.nav-item.parent-menu.menu-is-opening.menu-open').find('ul.nav.nav-treeview'))
    })

    return (
      <aside className="main-sidebar sidebar-dark-primary elevation-4">
        <div className="sidebar"
        onMouseEnter={this.handleHoverOn}
        onMouseLeave={this.handleHoverOff}>
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
              <li className="nav-item parent-menu" id="dsa3dd3">
                <Link to="#" className="nav-link">
                  <img src="/img/icons/exchange-rate.svg" alt="icon users" />
                  <p>
                    Exchange Rate
                    <i className="right fas fa-angle-right"></i>
                  </p>
                </Link>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <Link to="/master/exchange-rate" className="nav-link">
                      <p>Exchange Rate</p>
                    </Link>
                  </li>
                </ul>
              </li>
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
