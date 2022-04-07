import Sidebar from "components/navigation/sidebar"
import Navbar from "components/navigation/navbar"
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import Breadcrumb from "components/navigation/breadcrumb"
import { useSnackbar } from "react-simple-snackbar"
import { useHistory } from "react-router-dom"
import Cookies from "js-cookie"
import { setAlert } from "redux/ui-store"

const DashboardWrapper = (props) => {
  const history = useHistory()
  const dispatch = useDispatch()
  const stateAlert = useSelector((state) => state.ui.alert)
  const [openSnackbar, closeSnackbar] = useSnackbar({
    position: "bottom-right",
  })

  useEffect(() => {
    history.listen((location, action) => {
      if(!Cookies.get('ut')) window.location.reload()
    });

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



  const signout = async () => {
    dispatch(setAlert({
      message: `You have been successfully logged out!`,
    }))
    setTimeout(() => {
      Cookies.remove("ut");
      Cookies.remove("rt");
      Cookies.remove("persist_code");
      history.push("/auth/login");
    }, 700);
  };

  return (
    <div>
      <Navbar signout={signout} />
      <Sidebar />
      <div className="content-wrapper">
        <div className="container-fluid pb-5 pl-3">
          <Breadcrumb />
          <section className="content">{props.children}</section>
        </div>
        <div className="footer text-center text-md-left">
          &copy; 2021 - {new Date().getFullYear()} Bayu Buana Travel Services. All Rights Reserved.
        </div>
      </div>
    </div>
  )
}

export default DashboardWrapper
