import { Collapse } from 'bootstrap'
import React, { useEffect, useRef, useState } from 'react'
import { Form } from "react-bootstrap"
import { useStateWithCallback, useStateWithCallbackLazy } from 'use-state-with-callback'


function AccessManagerRow(props) {
  const { moduleName, category, capabilities, moduleId, sendAllowedModuleData } = props

  const [capabilityCheckBoxes, setCapabilityCheckBoxes] = useState([])
  const [allowedModule, setAllowedModule] = useState([])
  const [checkedCapabilities, setCheckedCapabilities] = useState([])
  const [currentModule, setCurrentModule] = useState({
    id: "",
    capabilities: {}
  })
  const [currentCapabilities, setCurrentCapabilities] = useState(capabilities)
  const [capabilityChecked, setCapabilityChecked] = useState(new Array(Object.keys(capabilities).length).fill(false))
  // const checkedValue = useRef(false)


  // When the switch is clicked, add the capability and id to the state and then pass the state to module-access component
  const handleChange = (capability, id, capabilityValue, capabilitiesList) => {
    let capsList = capabilitiesList;

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
    // console.log("Current Module",currentModule)
  }, [currentModule])
  

  useEffect(() => {
    const caps = []
    console.log("FROM API", capabilities)
    for(let cap in capabilities) {
      console.log(allowedModule["capabilities"] ? allowedModule["capabilities"][cap] : capabilities[cap])
      // console.log(moduleId+"_"+cap+":"+capabilities[cap])
      caps.push(
        <td>
          <Form.Check 
            type="switch"
            id={`${cap}-${moduleId}`}
            key={`${cap}-${moduleId}`}
            defaultChecked={allowedModule["capabilities"] ? allowedModule["capabilities"][cap] : capabilities[cap]}
            // checked={true}
            onChange={() => {
              handleChange(cap, moduleId, capabilities[cap], capabilities)
            }}
            // ref={checkedValue}
          />
        </td>
      )
    }
    setCapabilityCheckBoxes(caps)
  }, [])

  useEffect(() => {
    // console.log("Allowed Module", allowedModule)
    sendAllowedModuleData(allowedModule)
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