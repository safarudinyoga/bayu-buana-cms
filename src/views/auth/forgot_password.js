import { withRouter } from "react-router"
import React, { useState } from "react";
import { Form, FormGroup, InputGroup } from "react-bootstrap";
import { Formik, FastField, Field } from "formik"
import * as Yup from "yup"
import { BlockButton } from '../../components/button/block';
import { Link, useHistory } from 'react-router-dom';

function ForgotPassword() {
	let history = useHistory()
	const [initialForm, setForm] = useState({
			email: "",
		})

	const validationSchema =  Yup.object().shape({
		email: Yup.string()
			.required("Email is required.")
			.email("Email is not a valid email.")
			.max(256, "email is too long - should be 256 chars maximun."),
	})

	const onSubmit = async (values) => {
		console.log(values)
		history.push("/auth/otp")
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
			<p className="mid-title p-0 mb-3">Forgot Password</p>
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
							<BlockButton 
								text={"Reset Password"} 
								disabled={isSubmitting || !dirty}
								type="submit"
							/>

							<div className="mt-2">
								<Link to="/auth/login" className="back-signin">
								<i className="fa fa-arrow-left mr-1"></i>
								Back to Sign In
								</Link>
							</div>
						</Form>
					)
				}
				
			</Formik>
		</>
	)
}

export default withRouter(ForgotPassword) 