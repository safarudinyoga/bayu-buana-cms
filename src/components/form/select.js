import React from "react"
import { default as ReactSelect } from "react-select"

const Select = (props) => {
  const Icon = ({ innerRef, innerProps }) => (
    <img
      src="/img/icons/arrow-down.svg"
      alt="arrow down"
      style={{ marginRight: 12 }}
      ref={innerRef}
      {...innerProps}
    />
  )
  return (
    <ReactSelect
      {...props}
      components={Object.assign(
        {},
        {
          IndicatorSeparator: () => null,
          DropdownIndicator: Icon,
        },
        props.components,
      )}
    />
  )
}

export default Select
