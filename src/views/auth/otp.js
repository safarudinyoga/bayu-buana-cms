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

function OTP(props) {
	let history = useHistory()
	const dispatch = useDispatch()

	const [initialForm, setForm] = useState({
		code: "",
	})
	const [ passType, setPassType] = useState("password")

	const {initialMinute = 0,initialSeconds = 10} = props
    const [ minutes, setMinutes ] = useState(initialMinute)
    const [seconds, setSeconds ] =  useState(initialSeconds)
    useEffect(()=>{
    let myInterval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1)
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(myInterval)
                } else {
                    setMinutes(minutes - 1)
                    setSeconds(59)
                }
            } 
        }, 1000)
        return ()=> {
            clearInterval(myInterval)
          }
    })


	const validationSchema =  Yup.object().shape({
		code: Yup.string()
			.required("OTP code is required.")
			.min(4, "OTP code is too short - should be 4 chars minimum.")
			.max(256, "OTP code is too long - should be 256 chars maximun."),
	})

	const onSubmit = async (values) => {
		let api = new Api()
		try {
			let res = await api.post("/user/reset-password", values)
			dispatch(
				setAlert({
				  message: res.data.message,
				}),
			  )
			history.push("/")

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
			<p className="mid-title p-0 mb-1">Please check your email</p>
			<p className="sub-title p-0 mb-3">Enter OTP Code from email</p>
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
								label="OTP Code" 
								name="code"
								type={passType}
								maxLength={256}
								placeholder="Enter your OTP code"
								endIcon={() => (
									<i 
									onClick={()=>setPassType(passType === "text" ? "password" : "text" )} 
									className={`fa ${passType === "password" ? "fa-eye-slash" : "fa-eye" }`}></i>
								)}
							/>
							<BlockButton 
								text={"Confirm"} 
								disabled={isSubmitting || !dirty}
								type="submit"
							/>

							<div className="mt-2">
								<p className="back-signin">
									Waiting for OTP confirmation {minutes < 10 ? "0"+minutes : minutes} : {seconds < 10 ? "0"+seconds : seconds}
								</p>
							</div>
						</Form>
					)
				}
				
			</Formik>
		</>
	)
}

export default withRouter(OTP) 