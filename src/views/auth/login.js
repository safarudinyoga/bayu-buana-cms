import { withRouter } from "react-router"
import React, { useState } from "react";
import { Form } from "react-bootstrap";
import AuthWrapper from "components/wrapper/auth"

function Login() {
	const [form, setForm] = useState({
			email: "",
			password: "",
		})
	const [ rememberVal, setCheckBox] = useState(false)

	const onLogin = () => {
		console.log(form)
	}

	return (
		<AuthWrapper
			buttonTitle="SIGN IN"
			buttonFn={onLogin}
		>
			<p className="title p-0 mb-1">Welcome Back!</p>
			<p className="sub-title p-0 mb-4 mb-md-5">Please Sign in to continue</p>
			<Form>
				<Form.Label>Email</Form.Label>
				<Form.Control
					value={form.email}
					name="email"
					onChange={(e) => setForm({ ...form, email: e.target.value })}
					disabled={false}
					type="email"
				/>

				<Form.Label className="mt-2">Password</Form.Label>
				<Form.Control
					value={form.password}
					name="password"
					onChange={(e) => setForm({ ...form, password: e.target.value })}
					disabled={false}
					type="password"
				/>
			</Form>

			<div className="row mt-2">
				<div className="col"> 
					<input 
						type="checkbox" 
						checked={rememberVal}
						onChange={() => setCheckBox(!rememberVal)}
					/>
					<span onClick={() => setCheckBox(!rememberVal)} className="remember pl-1">
						Remember Me
					</span>
				</div>
				<div className="col text-right">
					<a className="forgot-text">Forgot Password?</a>
				</div>
			</div>
		</AuthWrapper>
	)
}

export default withRouter(Login) 