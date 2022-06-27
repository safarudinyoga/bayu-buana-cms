import React from "react"
import { Row, Col } from "react-bootstrap"
import Switch from "react-switch"
import Hints from "assets/icons/hint.svg";

function inputForm(props) {
  const {
    label,
    name,
    value,
    size,
    onChange,
    disabled,
    useHint = false
  } = props
  return (
    <Row className="form-group">
      <Col md={size?.label?.md || 3} lg={size?.label?.lg || 3}>
        <label className="text-label-input" htmlFor={name}>
          {label}
          {useHint? <img src={Hints} alt="hint" className="ml-0"></img> : ""}
        </label>
      </Col>
      <Col  md={size?.value?.md || 9} lg={size?.value?.lg || 9}>
        <div style={{display: 'inline', verticalAlign: "middle"}}>
          <Switch 
            onChange={onChange} 
            checked={value || false} 
            checkedIcon={false}
            uncheckedIcon={false}
            width={27}
            height={15}
            disabled={disabled}
          />
        </div>
      </Col>
    </Row>
  )
}

export default inputForm
