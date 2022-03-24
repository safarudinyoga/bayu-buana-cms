import React from 'react'
import { Form } from "react-bootstrap"


function AccessManagerRow(props) {
  const { moduleName, category } = props
  return (
    <tr>
      <td>{moduleName}</td>
      <td>{category}</td>
      <td>
        <Form.Check 
          type="switch"
          id={`view-switch-${moduleName}`}
        />
      </td>
      <td>
        <Form.Check 
          type="switch"
          id={`create-switch-${moduleName}`}
        />
      </td>
      <td>
        <Form.Check 
          type="switch"
          id={`delete-switch-${moduleName}`}
        />
      </td>
      <td>
        <Form.Check 
          type="switch"
          id={`edit-switch-${moduleName}`}
        />
      </td>
      <td>
        <Form.Check 
          type="switch"
          id={`mass-update-switch-${moduleName}`}
        />
      </td>
      <td>
        <Form.Check 
          type="switch"
          id={`export-switch-${moduleName}`}
        />
      </td>
    </tr>
  )
}

export default AccessManagerRow