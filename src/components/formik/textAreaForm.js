import React from "react"
import { Field } from "formik"
import { Row, Col } from "react-bootstrap"

function textAreaForm(props) {
  const {
    label,
    name,    
    style,
    placeholder,
    maxLength,
    minLength,
    required,
    rows,    
    ...rest
  } = props
  return (
    <Row className="form-group required">
      <Col column md={3} lg={3}>
        <label className="text-label-input" htmlFor={name}>
          {label}
          <span className={required || ""}/>
        </label>
      </Col>
      <Col md={9} lg={9}>
        <Field id={name} name={name}>
          {({ field, form, meta }) => (
            <div>
              <textarea                
                {...field} 
                {...rest}               
                style={style}
                minLength={minLength}
                maxLength={maxLength}
                placeholder={placeholder || ""} 
                rows={rows}               
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

export default textAreaForm
