import React from "react"
import { FastField } from "formik"
import { Row, Col } from "react-bootstrap"
import Select from "components/form/select"
import Hints from "assets/icons/hint.svg";

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
    size,
    useHint = false,
    ...rest
  } = props
  const objectName = name.split(".")
  if (objectName.length > 1) {
    return (
      <Row className="form-group required">
        <Col md={size?.label?.md || 3} lg={size?.label?.lg || 4}>
          <label className="text-label-input" htmlFor={name}>
            {label}
            <span className={required || ""} />
            {useHint ? <img src={Hints} alt="hint" className="ml-0"></img> : ""}
          </label>
           
        </Col>
        <Col md={size?.value?.md || 9} lg={size?.value?.lg || 8}>
          <FastField id={name} name={name} {...rest}>
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
                    form.touched[objectName[0]]?.[objectName[1]] &&
                    form.errors[objectName[0]]?.[objectName[1]]
                      ? "is-invalid"
                      : null
                  }`}
                />
                {form.touched[objectName[0]]?.[objectName[1]] &&
                form.errors[objectName[0]]?.[objectName[1]] ? (
                  <div className="invalid-feedback">
                    {form.errors[objectName[0]]?.[objectName[1]]}
                  </div>
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
      <Col md={size?.label?.md || 3} lg={size?.label?.lg || 4}>
        <label className="text-label-input" htmlFor={name}>
          {label}
          <span className={required || ""} />
          {useHint ? <img src={Hints} alt="hint" className="ml-0"></img> : ""}
        </label>
      </Col>
      <Col md={size?.value?.md || 9} lg={size?.value?.lg || 8}>
        <FastField id={name} name={name} {...rest}>
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
