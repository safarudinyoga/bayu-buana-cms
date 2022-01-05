import { withRouter } from "react-router"
import React, { useEffect, useState } from "react";
import ImageBG from "../assets/background.png";
import FormHorizontal from '../components/form/horizontal';
import FormInputControl from '../components/form/input-control';
import { Form } from "react-bootstrap";

function Login() {
    const [form, setForm] = useState({
        email: "",
        password: "",
      })
		const [ rememberVal, setCheckBox] = useState(false)

    return (
			<div className="login-page">
				<div className="login-wrapper">
					<div className="card-image">
						<p className="caption">
							We are, <br/>
							The Expert Travel Agent <br/> 
							Partnership
						</p>
						<img src={ImageBG} className="img-fluid"/>
					</div>
					<div className="card-form">
						<div className="md-none">
							<p className="caption">
								We are, <br/>
								The Expert Travel Agent <br/> 
								Partnership
							</p>
						</div>
						<div className="card-form-body">
							<p className="title p-0 mb-1">Welcome Back!</p>
							<p className="sub-title p-0 mb-5">Please Sign in to continue</p>

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

							<div className="row mt-2">
								<div className="col"> 
									<input 
										type="checkbox" 
										checked={rememberVal}
										onClick={() => setCheckBox(!rememberVal)}
									/>
									<span onClick={() => setCheckBox(!rememberVal)} className="remember pl-1">
										Remember Me
									</span>
								</div>
								<div className="col text-right">
									<a className="forgot-text">Forgot Password?</a>
								</div>
							</div>

							<button className=" btn btn-block button-save mt-4">
								<div className="button-save-text">SIGN IN</div>
							</button>
						</div>
						<div className="card-form-footer position-absolute pb-4">
							<img src="/img/logo.png" className="bb-logo" alt="logo"/>
							&copy; 2021 Bayu Buana Travel Services. All Rights Reserved.
						</div>
					</div>
				</div>
			</div>
    )
}

export default Login 