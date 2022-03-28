import React from 'react'
import { Field} from 'formik'
import { Row, Col } from "react-bootstrap"


function Checkbox (props) {
  const { label, name, checked, ...rest } = props
  return (
    <div className='mt-2 mb-2'>      
      <Field name={name}>
        {({ field, form }) => {          
            return (
              <React.Fragment key={name}>
                <div className='d-flex align-items-center'>
                <input
                  type='checkbox'
                  id={name}
                  {...field}
                  {...rest}                  
                  checked={checked}
                  className={
                    form.touched[name] && form.errors[name]
                      ? "form-control is-invalid"
                      : "form-control"
                  }
                />
                <span className='ml-3'>{label}</span>
                </div>

                
              </React.Fragment>
            )
         
        }}
      </Field>
      
    </div>
  )
}

export default Checkbox