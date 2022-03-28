import React from "react"
import { FastField } from "formik"
import Select from "components/form/select"

function select(props) {
  
  const {    
    name,
    options,
    style,
    placeholder,    
    onChange,     
    ...rest
  } = props
  return (    
        <FastField id={name} name={name} {...rest}>
          {({ field, form, meta }) => (
            <div style={style}>
              <Select
                {...field}
                {...rest}                               
                options={options}                              
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
  
  )
}

export default select
