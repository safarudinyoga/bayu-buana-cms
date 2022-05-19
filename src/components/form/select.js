import React from "react"
import { default as ReactSelect } from "react-select"

const Select = (props) => {
  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      color: "black",
      backgroundColor: state.isSelected ? "white" : "white",
      fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
      fontSize: 13,
      "&:hover": {
        backgroundColor: state.isFocused ? "#027F71" : "",
        color: state.isFocused ? "white" : "black",
      },
    }),
    control: (base, state) => ({
      ...base,
      border: "1px solid #DADEDF",
      fontSize: 13,
      backgroundColor: "white",
      boxShadow: state.isFocused ? 0 : 0,
      "&:hover": {
        border: "1px solid #DADEDF",
      },
      width: props.width
    }),
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1
      const transition = "opacity 300ms"
      return { ...provided, opacity, transition }
    },
  }

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
      styles={customStyles}
    />
  )
}

export default Select
