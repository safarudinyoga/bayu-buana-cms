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
    maxlength,
    minlength,
    required,
    ...rest
  } = props
  const objectName = name.split(".")
  if (objectName.length > 1) {
    return (
      <Row className="form-group required">
        <Col md={3} lg={4}>
          <label className="text-label-input" htmlFor={name}>
            {label}
            <span className={required || ""} />
          </label>
        </Col>
        <Col md={9} lg={8}>
          <Field id={name} name={name} {...rest}  >
            {({ field, form, meta }) => (
              <div>
                <input
                  {...field}
                  type={type || "text"}                  
                  style={style}
                  minLength={minlength}
                  maxLength={maxlength}
                  placeholder={placeholder || ""}
                  className={
                    form.touched[objectName[0]]?.[objectName[1]] &&
                    form.errors[objectName[0]]?.[objectName[1]]
                      ? "form-control is-invalid"
                      : "form-control"
                  }
                />
                {form.touched[objectName[0]]?.[objectName[1]] &&
                form.errors[objectName[0]]?.[objectName[1]] ? (
                  <div className="invalid-feedback">
                    {form.errors[objectName[0]]?.[objectName[1]]}
                  </div>
                ) : null}
              </div>
            )}
          </Field>
        </Col>
      </Row>
    )
  }
  return (
    <Row className="form-group required">
      <Col md={3} lg={4}>
        <label className="text-label-input" htmlFor={name}>
          {label}
          <span className={required || ""} />
        </label>
      </Col>
      <Col md={9} lg={8}>
        <Field id={name} name={name}  {...rest}>
          {({ field, form, meta }) => (
            <div>
              <input
                {...field}
                type={type || "text"}               
                style={style}
                minLength={minlength}
                maxLength={maxlength}
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
