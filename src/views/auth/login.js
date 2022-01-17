import { withRouter } from "react-router"
import React, { useState } from "react";
import { Form, FormGroup, InputGroup } from "react-bootstrap";
import { Formik, FastField } from "formik"
import * as Yup from "yup"
import { BlockButton } from '../../components/button/block';
import { Link } from 'react-router-dom';

function Login() {
	const [initialForm, setForm] = useState({
			email: "",
			password: "",
		})
	const [ passType, setPassType] = useState("password")
	const [ rememberVal, setCheckBox] = useState(false)

	const validationSchema =  Yup.object().shape({
		email: Yup.string()
			.required("Email is required.")
			.email("Email is not a valid email.")
			.max(256, "email is too long - should be 256 chars maximun."),
		password: Yup.string()
			.required("Password is required.")
			.min(8, "Password is too short - should be 8 chars minimum.")
			.max(256, "Password is too long - should be 256 chars maximun.")
			.matches(/^(?=.*\d)(?=.*([a-z]|[A-Z]))([\x20-\x7E]){8,}$/, "Password must be contain letters, numbers, and symbols"),
	})

	const onSubmit = async (values) => {
		console.log(values)
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
								name="email"
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
										onChange={() => setCheckBox(!rememberVal)}
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
								disabled={isSubmitting || !dirty}
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