import React from "react"
import { FastField } from "formik"
import { Row, Col } from "react-bootstrap"
import Select from "components/form/select"

function selectForm(props) {
  const {
    label,
    name,
    options,
    style,
    placeholder,
    required,
    value,
    onChange,
    isDisabled,   
    ...rest
  } = props
  return (
    <Row className="form-group required">
      <Col column md={3} lg={3}>
        <label className="text-label-input" htmlFor={name}>
          {label}
          <span className={required || ""} />
        </label>
      </Col>
      <Col md={9} lg={9}>
        <FastField id={name} name={name} >
          {({ field, form, meta }) => (
            <div style={style}>
              <Select
                {...field}
                {...rest}
                options={options}
                value={value}
                isDisabled={isDisabled}
                onChange={onChange}                
                placeholder={placeholder || ""}
                className={`react-select ${
                  form.touched[name] && form.errors[name] ? "is-invalid" : null
                }`}
              />
              {form.touched[name] && form.errors[name] ? (
                <div className="invalid-feedback">{form.errors[name]}</div>
              ) : null}
            </div>
          )}
        </FastField>
      </Col>
    </Row>
  )
}

export default selectForm
