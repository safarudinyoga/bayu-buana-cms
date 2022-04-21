import React, { Component } from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import "./sidebar.scss"
import getMenu from '../../config/menu';
import $ from "jquery"

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
    <li className="nav-item parent-menu">
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
    menu : [],
    sideNav: ''
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

    $(document).ready(function () {
      $('.nav-item').click(function () {
        $('.sidebar-mini').removeClass('sidebar-open');
        $('.sidebar-mini').addClass('sidebar-closed sidebar-collapse');
      });
    });

    return (
      <aside className="main-sidebar sidebar-dark-primary elevation-4"
        // {extranet ? "extranet-sidebar" : ""}
      >
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
              <li className="nav-item parent-menu">
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
