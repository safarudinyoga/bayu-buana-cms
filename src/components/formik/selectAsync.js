import React from "react"
import { FastField } from "formik"
import { Row, Col } from "react-bootstrap"
import Select from "components/form/select-async"

function selectAsync(props) {
  const {
    name,
    options,
    style,    
    onChange,
    isDisabled,
    placeholder,
    url,
    label,
    required,
    fieldName,
    urlFilter,   
    size,  
    ...rest
  } = props
  const objectName = name.split(".")
  if (objectName.length > 1) {
    return (
      <Row className="form-group required">
        <Col column md={3} lg={4}>
          <label className="text-label-input" htmlFor={name}>
            {label}
            <span className={required || ""} />
          </label>
        </Col>
        <Col md={9} lg={8}>
          <FastField id={name} name={name} {...rest}>
            {({ field, form, meta }) => (
              <div style={style}>
                <Select
                  {...field}  
                  {...rest}               
                  url={url}
                  isDisabled={isDisabled}
                  placeholder={placeholder || ""}
                  fieldName={fieldName}
                  urlFilter={urlFilter}
                  onChange={onChange}                  
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
        </label>
      </Col>
      <Col md={size?.value?.md || 9} lg={size?.value?.lg || 8}>
        <FastField id={name} name={name} {...rest}>
          {({ field, form, meta }) => (
            <div style={style}>
              <Select
                {...field}
                {...rest}                
                url={url}
                isDisabled={isDisabled}
                placeholder={placeholder || ""}
                fieldName={fieldName}
                urlFilter={urlFilter}                
                onChange={onChange}                
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
