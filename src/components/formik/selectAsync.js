import React from "react"
import { FastField } from "formik"
import { Row, Col } from "react-bootstrap"
import Select from "components/form/select-async"

function selectAsync(props) {
  const {
    name,
    options,
    style,
    placeholder,
    onChange,
    url,
    label,
    required,
    fieldName,
    urlFilter,
    isDisabled,    
    size,  
    ...rest
  } = props
  return (
    <Row className="form-group required">
      <Col md={size?.label?.md || 3} lg={size?.label?.lg || 3}>
        <label className="text-label-input" htmlFor={name}>
          {label}
          <span className={required || ""} />
        </label>
      </Col>
      <Col md={size?.value?.md || 9} lg={size?.value?.lg || 9}>
        <FastField id={name} name={name} {...rest}>
          {({ field, form, meta }) => (
            <div style={style}>
              <Select
                {...field}               
                isDisabled={isDisabled}                 
                url={url}
                fieldName={fieldName}
                urlFilter={urlFilter}
                onChange={onChange}
                placeholder={placeholder}
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

export default selectAsync
