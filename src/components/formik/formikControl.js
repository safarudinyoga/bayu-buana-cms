import React from "react"
import Input from "./inputForm"
import Textarea from "./textAreaForm"
import Select from "./selectForm"
import SelectOnly from "./select"
import SelectAsync from "./selectAsync"
import Checkbox from './checkbox'
import Radio from './radioForm'
// import CheckboxGroup from './CheckboxGroup'
// import DatePicker from './DatePicker'
// import ChakraInput from './ChakraInput'

function FormikControl(props) {
  const { control, ...rest } = props
  switch (control) {
    case "input":
      return <Input {...rest} />
    case "textarea":
      return <Textarea {...rest} />
    case "select":
      return <Select {...rest} />
    case "selectOnly":
      return <SelectOnly {...rest} />
    case "selectAsync":
      return <SelectAsync{...rest} />
    case 'checkboxOnly':
      return <Checkbox {...rest} />
    case 'radio':
      return <Radio {...rest} />
    // case 'date':
    //   return <DatePicker {...rest} />
    // case 'chakraInput':
    //   return <ChakraInput {...rest} />
    default:
      return null
  }
}

export default FormikControl
