import React from "react"
import { Field } from "formik"
import { Row, Col } from "react-bootstrap"

function inputForm(props) {
  const {
    label,
    name,
    type,
    style,
    placeholder,
    maxLength,
    minLength,
    required,
    size,
    ...rest
  } = props
  return (
    <Row className="form-group required">
      <Col md={size?.label?.md || 3} lg={size?.label?.lg || 3}>
        <label className="text-label-input" htmlFor={name}>
          {label}
          <span className={required || ""}/>
        </label>
      </Col>
      <Col  md={size?.value?.md || 9} lg={size?.value?.lg || 9}>
        <Field id={name} name={name} >
          {({ field, form, meta }) => (
            <div>
              <input
                {...field}
                {...rest}
                type={type || "text"}
                style={style}
                minLength={minLength}
                maxLength={maxLength}
                placeholder={placeholder || ""}
                className={
                  form.touched[name] && form.errors[name]
                    ? "form-control is-invalid"
                    : "form-control"
                }
              />
              {form.touched[name] && form.errors[name] ? (
                <div className="invalid-feedback">{form.errors[name]}</div>
              ) : null}
            </div>
          )}
        </Field>
      </Col>
    </Row>
  )
}

export default inputForm
