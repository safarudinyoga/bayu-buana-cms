import { withRouter } from "react-router"
import React, { useState, useEffect } from "react"
import { Form, FormGroup, InputGroup } from "react-bootstrap"
import { Formik, FastField } from "formik"
import * as Yup from "yup"
import { BlockButton } from '../../components/button/block'
import { Link, useHistory } from 'react-router-dom'
import Api from "config/api"
import Cookies from 'js-cookie'
import { useDispatch } from "react-redux"
import { setAlert } from "redux/ui-store"

function Login() {
	const dispatch = useDispatch()
	const history = useHistory()
	const [ passType, setPassType] = useState("password")
	const [ rememberMe, setRememberMe] = useState(false)

	let cookie_rm = Cookies.get("remember_acc");
	let form = {
		username: "",
		password: "",
	}
	if(cookie_rm) {
		form = {
			username: JSON.parse(cookie_rm).username,
			password: JSON.parse(cookie_rm).password,
		}
	}
	const [initialForm, setForm] = useState(form)

	const validationSchema =  Yup.object().shape({
		username: Yup.string()
			.required("Email is required.")
			.email("Email is not a valid email.")
			.max(256, "email is too long - should be 256 chars maximun."),
		password: Yup.string()
			.required("Password is required.")
			.min(8, "Password is too short - should be 8 chars minimum.")
			.max(256, "Password is too long - should be 256 chars maximun.")
			// .matches(/^(?=.*\d)(?=.*([a-z]|[A-Z]))([\x20-\x7E]){8,}$/, "Password must be contain letters, numbers, and symbols"),
	})

	useEffect(() => {
		const token = Cookies.get("ut");
		if (token) {
			history.push("/");
		}
		if(cookie_rm) setRememberMe(true)
	}, []);

	const onSubmit = async (values, a) => {
		let api = new Api()
		try {
			let res = await api.post("/user/login", values)

			let date = new Date();
			date.setTime(date.getTime() + (res.data.expires_in * 1000));
			Cookies.set('ut', res.data.access_token, {expires: date})

			if (rememberMe) {
				Cookies.set('remember_acc', JSON.stringify(values))
			} else {
				let rememberCookie = Cookies.get('remember_acc')
				if(rememberCookie) Cookies.remove('remember_acc')
			}
			window.location.reload()
		} catch(e) {
			dispatch(
				setAlert({
				  message: e.response.data.message,
				}),
			  )
		}
	}

	const FormValidate = ({
		label, 
		name,
		type="text",
		maxLength=256,
		placeholder="",
		endIcon,
	}) => (
		<FormGroup>
			<Form.Label className="mt-2">{label}</Form.Label>
			<InputGroup>
				<FastField name={name}>
					{({field, form}) => (
						<>
							<Form.Control
								type={type}
								placeholder={placeholder}
								isInvalid={
									form.touched[name] && form.errors[name]
								}
								maxLength={maxLength}
								{...field}
							/>
							{endIcon ? (
								<InputGroup.Append>
									<InputGroup.Text>
										{endIcon()}
									</InputGroup.Text>
								</InputGroup.Append>
								) 
							: null}
							{form.touched[name] &&
							form.errors[name] && (
								<Form.Control.Feedback type="invalid">
								{form.touched[name]
									? form.errors[name]
									: null}
								</Form.Control.Feedback>
							)}
						</>
					)}
				</FastField>
			</InputGroup>
		</FormGroup>
	)

	return (
		<>
			<p className="title p-0 mb-1">Welcome Back!</p>
			<p className="sub-title p-0 mb-4 mb-md-5">Please Sign in to continue</p>
			<Formik
				initialValues={initialForm}
				validationSchema={validationSchema}
				onSubmit={onSubmit}
			>
				{
					({
						dirty,
						handleSubmit,
						isSubmitting,
					}) => (
						<Form onSubmit={handleSubmit}>
							<FormValidate
								label="Email" 
								name="username"
								type="email"
								maxLength={256}
								placeholder="Enter your email"
							/>
							<FormValidate
								label="Password" 
								name="password"
								type={passType}
								maxLength={256}
								placeholder="Enter your password"
								endIcon={() => (
									<i 
									onClick={()=>setPassType(passType === "text" ? "password" : "text" )} 
									className={`fa ${passType === "password" ? "fa-eye-slash" : "fa-eye" }`}></i>
								)}
							/>
							<div className="row mt-3">
								<div className="col"> 
									<Form.Check
										inline
										label="Remember Me"
										type={"checkbox"}
										id="custom-inline-checkbox-remember"
										onChange={() => setRememberMe(!rememberMe)}
										checked={rememberMe}
									/>
								</div>
								<div className="col text-right">
									<Link to="/auth/forgot-password">
										<p className="forgot-text">Forgot Password?</p>
									</Link>
								</div>
							</div>
							<BlockButton 
								text={"SIGN IN"} 
								disabled={isSubmitting}
								type="submit"
							/>
						</Form>
					)
				}
				
			</Formik>
		</>
	)
}

export default withRouter(Login) 