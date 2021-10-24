import Sidebar from "components/navigation/sidebar"
import Navbar from "components/navigation/navbar"
import React, { Component } from "react"
import Breadcrumb from "components/navigation/breadcrumb"

export default class DashboardWrapper extends Component {
  componentDidMount() {
    document.body.className = [
      "hold-transition",
      "sidebar-mini",
      "layout-fixed",
      "control-sidebar-slide-open",
      "sidebar-collapse",
    ].join(" ")
    document.getElementById("root").className = "wrapper"
  }

  render() {
    return (
      <div>
        <Navbar />
        <Sidebar />
        <div className="content-wrapper">
          <div className="container-fluid">
            <Breadcrumb />
            <section className="content">{this.props.children}</section>
          </div>
        </div>
      </div>
    )
  }
}
