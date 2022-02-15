import React from "react"
import { Field, ErrorMessage } from "formik"
import { Row, Col } from "react-bootstrap"
import TextError from './textError'

function RadioButtons(props) {
  const { label, name, options, required, ...rest } = props
  return (
    <Row className="form-group required">
      <Col md={3} lg={3}>
        <label className="text-label-input" htmlFor={name}>
          {label}
          <span className={required || ""} />
        </label>
      </Col>
      <Col>
        <div
          style={{
            height: 38,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Field name={name}>
            {({ field }) => {
              return options.map((option) => {
                return (
                  <React.Fragment key={option.key}>
                    <input
                      type="radio"
                      id={option.value}
                      {...field}
                      {...rest}
                      value={option.value}
                      checked={field.value === option.value}
                      className="form-control"
                    />
                    <label className="text-label-input m-2" htmlFor={option.value}>{option.key}</label>
                  </React.Fragment>
                )
              })
            }}
          </Field>
        </div>
        <ErrorMessage component={TextError} name={name} />
      </Col>
    </Row>
  )
}

export default RadioButtons
