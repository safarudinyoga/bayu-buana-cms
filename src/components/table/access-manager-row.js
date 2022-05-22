import { Collapse } from 'bootstrap'
import React, { useEffect, useState } from 'react'
import { Form } from "react-bootstrap"
import { useStateWithCallback } from 'use-state-with-callback'


function AccessManagerRow(props) {
  const { moduleName, category, capabilities, moduleId, onChange } = props

  const [capabilityCheckBoxes, setCapabilityCheckBoxes] = useState([])
  const [allowedModule, setAllowedModule] = useState([])

  const handleChange = (capability, id) => {
    setAllowedModule([...allowedModule, {
      id: id,
      capabilities: {
        ...capabilities,
        [capability]: !capabilities[capability]
      }
    }])
  }

  useEffect(() => {
    const caps = []
    for(let cap in capabilities) {
      caps.push(
        <td>
          <Form.Check 
            type="switch"
            id={`${cap}-${moduleId}`}
            checked={capabilities[cap]}
            onChange={() =>
              handleChange(cap, moduleId)
            }
          />
        </td>
      )
    }
    setCapabilityCheckBoxes(caps)
  }, [])

  useEffect(() => {
    console.log(allowedModule)
  }, [allowedModule])
  

  return (
    <tr>
      <td>{moduleName}</td>
      <td>{category}</td>
      {capabilityCheckBoxes}
    </tr>
  )
}

export default AccessManagerRow