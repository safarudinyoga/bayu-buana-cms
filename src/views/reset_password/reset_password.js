import { withRouter } from "react-router"
import React, { useState, useRef, useEffect } from "react"
import { Form, FormGroup, InputGroup } from "react-bootstrap"
import { Formik, FastField, Field } from "formik"
import * as Yup from "yup"
import { BlockButton } from '../../components/button/block'
import { Link, useHistory } from 'react-router-dom'
import Api from "config/api"
import { useDispatch } from "react-redux"
import { setAlert } from "redux/ui-store"

function ResetPassword(props) {
	const history = useHistory()
	const dispatch = useDispatch()
	const queryParams = new URLSearchParams(history.location.search)
	const resetCode = queryParams.get('reset_password_code')
	const API = new Api()

	const [initialForm, setForm] = useState({
		new_password: "",
		confirm_password: "",
	})
	const [ passType, setPassType] = useState({
		new_password: "password",
		confirm_password: "password"
	})

	Yup.addMethod(Yup.string, 'matchPassword', function(propertyPath, message) {
		return this.test('unique', message, function(field) {
			if (field && this.parent[propertyPath]) {
			  console.log(field, this.parent[propertyPath])
			return field === this.parent[propertyPath]
		  } else {
			return true
		  }
		})
	  })
	

	const validationSchema =  Yup.object().shape({
		new_password: Yup.string()
			.required("New password is required.")
			.min(8, "New password is too short - should be 8 chars minimum.")
			.max(256, "New password is too long - should be 256 chars maximun.")
			// .matches(/^(?=.*\d)(?=.*([a-z]|[A-Z]))([\x20-\x7E]){8,}$/, "Password must be contain letters, numbers, and symbols")
			.matchPassword('confirm_password', 'New password and confirm password does not match.'),
		confirm_password: Yup.string()
			.required("Confirm password is required.")
			.min(8, "Confirm password is too short - should be 8 chars minimum.")
			.max(256, "Confirm password is too long - should be 256 chars maximun.")
			// .matches(/^(?=.*\d)(?=.*([a-z]|[A-Z]))([\x20-\x7E]){8,}$/, "Password must be contain letters, numbers, and symbols")
			.matchPassword('new_password', 'New password and confirm password does not match.'),
	})

	const onSubmit = async (values) => {
		try {
			values.code = resetCode
			let res = await API.post("/user/reset-password", values)
			dispatch(
				setAlert({
				  message: res.data.message,
				}),
			  )
			history.push("/auth/login")

		} catch (e) {
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
			<p className="mid-title p-0 mb-1">Reset your password</p>
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
								label="New Password" 
								name="new_password"
								type={passType.new_password}
								maxLength={256}
								placeholder="New password"
								endIcon={() => (
									<i 
									onClick={() => setPassType({ ...passType, new_password: passType.new_password === "text" ? "password" : "text"})} 
									className={`fa ${passType.new_password === "password" ? "fa-eye-slash" : "fa-eye" }`}></i>
								)}
							/>

							<FormValidate
								label="Confirm Password" 
								name="confirm_password"
								type={passType.confirm_password}
								maxLength={256}
								placeholder="Confirm password"
								endIcon={() => (
									<i 
									onClick={() => setPassType({ ...passType, confirm_password: passType.confirm_password === "text" ? "password" : "text"})} 
									className={`fa ${passType.confirm_password === "password" ? "fa-eye-slash" : "fa-eye" }`}></i>
								)}
							/>
							<BlockButton 
								text={"reset password"} 
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

export default withRouter(ResetPassword) 