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

	useEffect(() => {
		stateAlert && openSnackbar(stateAlert.message)
	  }, [stateAlert])
	return (
		<div className="auth-page">
			<div className="auth-wrapper">
				<div className="card-image">
					<p className="caption">
						We are, <br/>
						The Expert Travel Agent <br/> 
						Partnership
					</p>
					<img src={ImageBG} className="img-fluid"/>
				</div>
				<div className="card-form">
					<div className="d-block d-sm-none">
						<p className="caption">
							We are, <br/>
							The Expert Travel Agent <br/> 
							Partnership
						</p>
					</div>
					<div className="card-form-body">
						{props.children}
					</div>
					<div className="card-form-footer position-absolute pb-4">
						<img src="/img/logo.png" className="bb-logo d-none d-md-block" alt="logo"/>
						<img src="/img/logo_w.png" className="bb-logo d-md-none" alt="logo"/>
						<p>&copy; 2021 - {new Date().getFullYear()} Bayu Buana Travel Services. All Rights Reserved.</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default withRouter(AuthWrapper) 