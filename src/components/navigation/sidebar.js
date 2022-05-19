import React, { Component } from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import "./sidebar.scss"
import getMenu from '../../config/menu';
import $ from "jquery"
import * as AdminLte from  "admin-lte"

const SubMenu = ({menu, currentMenu, menuHandler}) => {
  return (
    <li className="nav-item">
      <Link
        to={menu.url}
        className={`nav-link ${currentMenu === menu.url ? "active-link": ""}`}
        onClick={() => menuHandler(menu.url)}
      >
        <p>{menu.description}</p>
      </Link>
    </li>
  )
}

const ParentMenu = ({menu, currentMenu, menuHandler}) => {
  let {submenu, menu_link_asset, id} = menu
  let findMenu = submenu.find(sm => sm.url === currentMenu)
  return (
    <li className="nav-item parent-menu" id={id}>
      <Link to={menu.url} className={`nav-link mb-0 ${findMenu ? "menu-open active-menu": ""}`}>
        <img src={menu_link_asset.multimedia_description.url} alt={menu_link_asset.multimedia_description.file_name} />
        <p>
          {menu.description}
        </p>
          {menu.is_expanded && <i className="right fas fa-angle-right ic-right"></i>}
      </Link>
      {
        submenu.length > 0 && (
          <ul className="nav nav-treeview">
            {
              submenu.map((m, k) => <SubMenu key={k} menu={m} currentMenu={currentMenu} menuHandler={menuHandler} />)
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
      sideNav: '',
      currentMenu: "",
    }
    this.onClickMenu = this.onClickMenu.bind(this)
    $('[data-widget="treeview"]').each(function() {
        AdminLte.Treeview._jQueryInterface.call($(this), 'init');
    });
  }


  async componentDidMount () {
    this.setState({currentMenu : window.location.pathname}, () => {
      $('ul.nav-treeview a').filter(function() {
        return this.href === window.location.origin + window.location.pathname;
      }).parentsUntil(".bb-sidebar-nav > .nav-sidebar").addClass('menu-is-opening menu-open');
    })
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
  onClickMenu(menu) {
    let self = this.state
    // $('li.parent-menu.menu-is-opening.menu-open').find('ul.nav-treeview.menu-is-opening.menu-open').css("display","none")
    // $('li.parent-menu.menu-is-opening.menu-open').find('ul.nav-treeview.menu-is-opening.menu-open').removeClass('menu-is-opening menu-open')
    // $('li.parent-menu.menu-is-opening.menu-open').removeClass('menu-is-opening menu-open')
    $('ul.nav-treeview a').filter(function() {
      return this.href === window.location.origin + self.currentMenu;
    }).parentsUntil(".bb-sidebar-nav > .nav-sidebar").remove('menu-is-opening menu-open');
    setTimeout(() => {
      this.setState({currentMenu: menu})
    }, 500);


  }

  render() {
    const { menu, currentMenu } = this.state

    return (
      <aside className="main-sidebar sidebar-dark-primary elevation-4"
        // {extranet ? "extranet-sidebar" : ""}
      >
        <div className="sidebar"
        onMouseEnter={this.handleHoverOn}
        onMouseLeave={this.handleHoverOff}>
          <nav className="bb-sidebar-nav">
            <ul
              className="nav nav-sidebar flex-column"
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >
              {
                menu.map((m, k) => <ParentMenu key={k} menu={m} currentMenu={currentMenu} menuHandler={this.onClickMenu} />)
              }
              <li className="nav-item parent-menu" id="dsa3dd3">
                <Link to="#" className="nav-link">
                  <img src="/img/icons/exchange-rate.svg" alt="icon users" />
                  <p>
                    Corporate Management
                    <i className="right fas fa-angle-right"></i>
                  </p>
                </Link>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <Link to="/master/manage-corporate" className="nav-link">
                      <p>Manage Corporate</p>
                    </Link>
                  </li>
                </ul>
              </li>
              
              {/* <li className="nav-item parent-menu">
                <Link to="#" className="nav-link">
                  <img src="/img/icons/home.svg" alt="icon users" />
                  <p>
                    Dashboard
                  </p>
                </Link>
              </li>
              <li className="nav-item parent-menu">
                <Link to="#" className="nav-link">
                  <img src="/img/icons/exchange-rate.svg" alt="icon users" />
                  <p>
                    Travel Management
                    <i className="right fas fa-angle-right"></i>
                  </p>
                </Link>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <Link to="/extranet/book-trip" className="nav-link">
                      <p>Book Trip</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="#" className="nav-link">
                      <p>Manage Bookings</p>
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item parent-menu">
                <Link to="#" className="nav-link">
                  <img src="/img/icons/exchange-rate.svg" alt="icon users" />
                  <p>
                    Reports
                    <i className="right fas fa-angle-right"></i>
                  </p>
                </Link>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <Link to="#" className="nav-link">
                      <p>Invoice Reports</p>
                    </Link>
                  </li>
                </ul>
              </li> */}
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
