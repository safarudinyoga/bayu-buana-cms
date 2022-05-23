import { Collapse } from 'bootstrap'
import React, { useEffect, useState } from 'react'
import { Form } from "react-bootstrap"
import { useStateWithCallback, useStateWithCallbackLazy } from 'use-state-with-callback'


function AccessManagerRow(props) {
  const { moduleName, category, capabilities, moduleId, setAllowModules } = props

  const [capabilityCheckBoxes, setCapabilityCheckBoxes] = useState([])
  const [allowedModule, setAllowedModule] = useState([])
  const [checkedCapabilities, setCheckedCapabilities] = useState([])
  const [currentModule, setCurrentModule] = useState({
    id: "",
    capabilities: {}
  })
  const [currentCapabilities, setCurrentCapabilities] = useState(capabilities)



  // When the switch is clicked, add the capability and id to the state and then pass the state to module-access component
  const handleChange = (e, capability, id, capabilityValue, capabilitiesList) => {
    let capsList = capabilitiesList;
    console.log("Initial Value", e.target.checked)

    let caps = {
      ...capsList,
      [capability]: !capabilityValue
    }

    capsList[capability] = !capabilityValue
    setCurrentCapabilities(prev => ({
      ...prev,
      [capability]: !capabilityValue
    }))

    setAllowedModule({...allowedModule,  id: id, capabilities: caps})
    
  }

  useEffect(() => {
    console.log("Current Module",currentModule)
  }, [currentModule])
  

  useEffect(() => {
    const caps = []
    for(let cap in capabilities) {
      caps.push(
        <td>
          <Form.Check 
            type="switch"
            id={`${cap}-${moduleId}`}
            // checked={allowedModule["capabilities"] ? allowedModule["capabilities"][cap] : capabilities[cap]}
            onChange={(e) => {
              handleChange(e, cap, moduleId, capabilities[cap], capabilities)
              setAllowModules(allowedModule)
            }
              
            }
          />
        </td>
      )
    }
    setCapabilityCheckBoxes(caps)
  }, [])

  useEffect(() => {
    console.log("Allowed Module", allowedModule)

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