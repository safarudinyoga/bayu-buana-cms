import Sidebar from "components/navigation/sidebar"
import Navbar from "components/navigation/navbar"
import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import Breadcrumb from "components/navigation/breadcrumb"
import { useSnackbar } from "react-simple-snackbar"

const DashboardWrapper = (props) => {
  const stateAlert = useSelector((state) => state.ui.alert)
  const [openSnackbar, closeSnackbar] = useSnackbar({
    position: "bottom-right",
  })

  useEffect(() => {
    document.body.className = [
      "hold-transition",
      "sidebar-mini",
      "layout-fixed",
      "control-sidebar-slide-open",
      "sidebar-collapse",
    ].join(" ")
    document.getElementById("root").className = "wrapper"
  }, [])

  useEffect(() => {
    stateAlert && openSnackbar(stateAlert.message)
  }, [stateAlert])

  return (
    <div>
      <Navbar />
      <Sidebar />
      <div className="content-wrapper">
        <div className="container-fluid">
          <Breadcrumb />
          <section className="content">{props.children}</section>
        </div>
      </div>
    </div>
  )
}

export default DashboardWrapper
