import { withRouter } from "react-router"
import React, { useEffect } from "react"
import ImageBG from "../../assets/background.png"
import { useSnackbar } from "react-simple-snackbar"
import { useSelector } from "react-redux"

const AuthWrapper = (props) => {
  const stateAlert = useSelector((state) => state.ui.alert)
  const [openSnackbar, closeSnackbar] = useSnackbar({
    position: "bottom-right",
  })
  const corporateLogin = window.location.pathname.includes("corporate")

  useEffect(() => {
    stateAlert && openSnackbar(stateAlert.message)
  }, [stateAlert])
  return (
    <div className="auth-page">
      <div className="auth-wrapper">
        <div className="card-image">
          {corporateLogin ? (
            <p className="caption-corporate">
              Complete Travel Solution for your <br />
              Business Trips
            </p>
          ) : (
            <p className="caption">
              We are, <br />
              The Expert Travel Agent <br />
              Partnership
            </p>
          )}
          <img src={ImageBG} className="img-fluid" />
        </div>
        <div className="card-form">
          <div className="d-block d-sm-none">
            {corporateLogin ? (
              <p className="caption">
                Complete Travel Solution <br />
                for your Business Trips
              </p>
            ) : (
              <p className="caption">
                We are, <br />
                The Expert Travel Agent <br />
                Partnership
              </p>
            )}
          </div>
          <div className="card-form-body">{props.children}</div>
          <div className="card-form-footer position-absolute pb-4">
            {/* <div className="row align-items-center">
              <div className="float-end">Powered by:</div> */}
            <img
              src="/img/logo.png"
              className="bb-logo d-none d-md-block"
              alt="logo"
            />
            {/* </div> */}
            <img
              src="/img/logo_w.png"
              className="bb-logo d-md-none"
              alt="logo"
            />
            <p>
              &copy;
              {corporateLogin ? `2020` : ` 2021 - ${new Date().getFullYear()}`}{" "}
              Bayu Buana Travel Services. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default withRouter(AuthWrapper)
