import { withRouter } from "react-router"
import React, { useState, useEffect } from "react"
import { Form, FormGroup, InputGroup } from "react-bootstrap"
import { Formik, FastField } from "formik"
import * as Yup from "yup"
import { BlockButton } from "../../components/button/block"
import { Link, useHistory } from "react-router-dom"
import Api from "config/api"
import { useDispatch } from "react-redux"
import { setAlert } from "redux/ui-store"
import { encrypt, decrypt } from "lib/bb-crypt"
import getMenu from "../../config/menu"
import ReCAPTCHA from "react-google-recaptcha"

function Login() {
  const dispatch = useDispatch()
  const history = useHistory()
  const recaptchaRef = React.createRef()
  const corporateLogin = window.location.pathname.includes("corporate")

  const [passType, setPassType] = useState("password")
  const [rememberMe, setRememberMe] = useState(false)
  const [loginChance, setLoginChance] = useState(2)
  const [validCaptcha, setValidCaptcha] = useState(false)

  const api = new Api()
  let cookie_rm = localStorage.getItem("persist_code")
  let form = {
    username: "",
    password: "",
  }
  if (cookie_rm) {
    let acc = decrypt(cookie_rm)
    acc = JSON.parse(acc)
    form = {
      username: acc.username,
      password: acc.password,
    }
  }
  const [initialForm, setForm] = useState(form)

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required("Email is required.")
      .email("Email is not a valid email.")
      .max(256, "email is too long - should be 256 chars maximun."),
    password: Yup.string()
      .required("Password is required.")
      .min(8, "Password is too short - should be 8 chars minimum.")
      .max(256, "Password is too long - should be 256 chars maximun."),
    // .matches(/^(?=.*\d)(?=.*([a-z]|[A-Z]))([\x20-\x7E]){8,}$/, "Password must be contain letters, numbers, and symbols"),
  })

  useEffect(() => {
    const token = localStorage.getItem("ut")
    let refresh_token = localStorage.getItem("rt")

    const checkAuth = async () => {
      await api.refreshToken(refresh_token)
      window.location.reload()
    }

    if (token) {
      history.push("/")
    } else {
      if (refresh_token && refresh_token !== "") {
        checkAuth()
      }
    }
    if (cookie_rm) setRememberMe(true)
  }, [])

  const onSubmit = async (values, a) => {
    try {
      let payload = {
        username: values.username.toLowerCase(),
        password: values.password,
      }
      let res = await api.post("/user/login", payload)
      console.log(res)
      await getMenu()

      let date = new Date()
      date.setTime(date.getTime() + res.data.expires_in)
      localStorage.setItem("ut", res.data.access_token, { expires: date })

      if (rememberMe) {
        let acc = JSON.stringify(values)
        acc = encrypt(acc)
        localStorage.setItem("persist_code", acc)
        localStorage.setItem("rt", res.data.refresh_token)
      } else {
        let rememberCookie = localStorage.getItem("persist_code")
        if (rememberCookie) localStorage.removeItem("persist_code")
      }
      window.location.reload()
    } catch (e) {
      setLoginChance(loginChance > 0 ? loginChance - 1 : 0)
      if (loginChance === 0) {
        recaptchaRef.current.props.grecaptcha.reset()
        setValidCaptcha(false)
      }
      dispatch(
        setAlert({
          message: e.response.data.message,
        }),
      )
    }
  }

  const onChange = async (value) => {
    try {
      // console.log(value)
      // let res = await api.post("https://www.google.com/recaptcha/api/siteverify", {
      // 	secret: value
      // })
      // console.log(res)
      if (value) {
        setValidCaptcha(true)
      }
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
    type = "text",
    maxLength = 256,
    placeholder = "",
    endIcon,
  }) => (
    <FormGroup>
      <Form.Label className="mt-2">{label}</Form.Label>
      <InputGroup>
        <FastField name={name}>
          {({ field, form }) => (
            <>
              <Form.Control
                type={type}
                placeholder={placeholder}
                isInvalid={form.touched[name] && form.errors[name]}
                maxLength={maxLength}
                {...field}
              />
              {endIcon ? (
                <InputGroup.Append>
                  <InputGroup.Text>{endIcon()}</InputGroup.Text>
                </InputGroup.Append>
              ) : null}
              {form.touched[name] && form.errors[name] && (
                <Form.Control.Feedback type="invalid">
                  {form.touched[name] ? form.errors[name] : null}
                </Form.Control.Feedback>
              )}
            </>
          )}
        </FastField>
      </InputGroup>
    </FormGroup>
  )

  return (
    <div className="card-form-body-login">
      <p className="title p-0 mb-1">Welcome Back!</p>
      <p className="sub-title p-0 mb-4 mb-md-5">Please Sign in to continue</p>
      <Formik
        initialValues={initialForm}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ dirty, handleSubmit, isSubmitting }) => (
          <Form onSubmit={handleSubmit}>
            <FormValidate
              label="Email"
              name="username"
              type="email"
              maxLength={256}
              placeholder={corporateLogin ? "" : "Enter your email"}
            />
            <FormValidate
              label="Password"
              name="password"
              type={passType}
              maxLength={256}
              placeholder={corporateLogin ? "" : "Enter your password"}
              endIcon={
                corporateLogin
                  ? false
                  : () => (
                      <i
                        onClick={() =>
                          setPassType(passType === "text" ? "password" : "text")
                        }
                        className={`fa ${
                          passType === "password" ? "fa-eye-slash" : "fa-eye"
                        }`}
                      ></i>
                    )
              }
            />
            {loginChance === 0 && (
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey="6Lc8fmQfAAAAAJpj_9OxlmzcEYrrCG-Q6fcmaNcI"
                onChange={onChange}
                onExpired={() => setValidCaptcha(false)}
              />
            )}
            <div className="row mt-3">
              <div className="col">
                <Form.Check
                  inline
                  label="Remember Me"
                  type={"checkbox"}
                  id={
                    corporateLogin
                      ? "custom-inline-checkbox-remember-corporate"
                      : "custom-inline-checkbox-remember"
                  }
                  onChange={() => setRememberMe(!rememberMe)}
                  checked={rememberMe}
                />
              </div>
              <div className="col text-right">
                <Link
                  to={
                    corporateLogin
                      ? "/auth/corporate-forgot-password"
                      : "/auth/forgot-password"
                  }
                >
                  <p className="forgot-text">Forgot Password?</p>
                </Link>
              </div>
            </div>

            <BlockButton
              text={"SIGN IN"}
              buttonType={
                corporateLogin ? "button-corporate-save" : "button-save"
              }
              disabled={
                loginChance > 0 ? isSubmitting : isSubmitting || !validCaptcha
              }
              type="submit"
            />
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default withRouter(Login)
