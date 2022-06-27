import React, { useEffect, useState } from 'react'
import { Form } from "react-bootstrap"
import useQuery from "lib/query"

function AccessManagerRow(props) {
  const { moduleName, category, capabilities, moduleId, sendAllowedModuleData } = props

  const isView = useQuery().get("action") === "view"
  const [capabilityCheckBoxes, setCapabilityCheckBoxes] = useState([])
  const [allowedModule, setAllowedModule] = useState([])

  // When the switch is clicked, add the capability and id to the state and then pass the state to module-access component
  const handleChange = (capability, id, capabilityValue, capabilitiesList) => {
    let capsList = capabilitiesList;

    let caps = {
      ...capsList,
      [capability]: !capabilityValue
    }

    capsList[capability] = !capabilityValue
    setAllowedModule({...allowedModule,  id: id, capabilities: caps})
    
  }  

  useEffect(() => {
    const caps = []
    for(let cap in capabilities) {
      caps.push(
        <td>
          <Form.Check 
            type="switch"
            id={`${cap}-${moduleId}`}
            key={`${cap}-${moduleId}`}
            defaultChecked={allowedModule["capabilities"] ? allowedModule["capabilities"][cap] : capabilities[cap]}
            disabled={isView}
            className="custom-switch-bb"
            onChange={() => {
              handleChange(cap, moduleId, capabilities[cap], capabilities)
            }}
          />
        </td>
      )
    }
    setCapabilityCheckBoxes(caps)
  }, [])

  useEffect(() => {
    sendAllowedModuleData(allowedModule)
  }, [allowedModule])
  
  return (
    {capabilityCheckBoxes}
    // <tr>
    //   <td>{moduleName}</td>
    //   <td>{category}</td>
    //   {capabilityCheckBoxes}
    // </tr>
  )
}

export default AccessManagerRow