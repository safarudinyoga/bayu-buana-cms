import React, { Component, useState } from "react"
import "./navbar.css"
import avatar2 from "admin-lte/dist/img/user8-128x128.jpg"
import infoIcon from "assets/icons/information.svg"
import notifIcon from "assets/icons/notification.svg"
import menuIcon from "assets/icons/navigation/menu.svg"
import Cookies from "js-cookie"

import Api from "config/api"

export default class Navbar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      profile: {},
      loading: true,
    }
    

    this.api = new Api()
  }

  async componentDidMount() {
    await this.api
      .get("/user/profile")
      .then((res) => {
        this.setState({ profile: res.data} )
      })
      .finally(() => {
        this.setState({ loading: false })
      })
  }

  render() {
    return (
      <nav className="main-header navbar navbar-expand navbar-white navbar-light">
        <ul className="navbar-nav">
          <li className="nav-item d-lg-none">
            <a
              className="nav-link"
              data-widget="pushmenu"
              href="/"
              role="button"
            >
              <img
                src={menuIcon}
                alt="info icon"
                className="navbar-menu"
              />
            </a>
          </li>
          <li className="nav-item">
              <a
              className="nav-link"
              href="/"
            >
                <img src="/img/logo.png" className="navbar-img" alt="logo"/>
            </a>
          </li>
        </ul>

        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <a className="nav-link px-0 px-xl-2" href="/">
              <img
                src={infoIcon}
                alt="info icon"
                className="navbar-icon"
              />
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link px-2 px-xl-2" href="/">
              <img
                src={notifIcon}
                alt="notif icon"
                className="navbar-icon"
              />
            </a>
          </li>
          <li className="nav-item dropdown">
            <a className="nav-link pl-0 pl-sm-3" data-toggle="dropdown" href="/">
              <img
                src={this.state.profile.employee_asset ? this.state.profile.employee_asset.multimedia_description.url : ""}
                alt="User Avatar"
                className="img-avatar img-circle"
              />
            </a>
            <div className="dropdown-menu dropdown-menu-right shadow border-0">
              <a href="/" className="dropdown-item">
                <div className="media">
                  <img
                    src={this.state.profile.employee_asset ? this.state.profile.employee_asset.multimedia_description.url : ""}
                    alt="User Avatar"
                    className="img-size-50 img-circle mr-3"
                  />
                  <div className="media-body mt-2">
                    <h3 className="dropdown-item-title">{`${this.state.profile.given_name} ${this.state.profile.middle_name} ${this.state.profile.surname}`}</h3>
                    <p className="text-sm text-muted">Administrator</p>
                  </div>
                </div>
              </a>
              <a href="/profile" className="dropdown-item">
                <i className="fas fa-user mr-2"></i> My Profile
              </a>
              <a href="/profile/security-settings" className="dropdown-item">
                <i className="fas fa-unlock mr-2"></i> Change Password
              </a>
              <a className="dropdown-item cursor-pointer" onClick={() => this.props.signout()}>
                <i className="fas fa-sign-out-alt mr-2"></i> Sign Out
              </a>
            </div>
          </li>
        </ul>
      </nav>
    )
  }
}
