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
  const objectName = name.split(".")
  if (objectName.length > 1) {
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
                  form.touched[objectName[0]]?.[objectName[1]] && form.errors[objectName[0]]?.[objectName[1]] ? "is-invalid" : null
                }`}
              />
              {form.touched[objectName[0]]?.[objectName[1]] && form.errors[objectName[0]]?.[objectName[1]] ? (
                <div className="invalid-feedback">{form.errors[objectName[0]]?.[objectName[1]]}</div>
              ) : null}
            </div>
          )}
        </FastField>
      </Col>
    </Row>
  )
              }
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
