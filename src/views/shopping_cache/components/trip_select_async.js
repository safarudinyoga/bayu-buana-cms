import React from "react"
import { SelectFetch } from "react-select-fetch"
import axios from "axios"
import env from "config/environment"

// const customStyles = {
//   option: (provided, state) => ({
//     ...provided,
//     color: "black",
//     backgroundColor: state.isSelected ? "white" : "white",
//     fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
//     fontSize: 13,
//     "&:hover": {
//       backgroundColor: state.isFocused ? "#027F71" : "",
//       color: state.isFocused ? "white" : "black",
//     },
//   }),
//   control: (base, state) => ({
//     ...base,
//     border: "1px solid #DADEDF",
//     fontSize: 13,
//     backgroundColor: "white",
//     boxShadow: state.isFocused ? 0 : 0,
//     "&:hover": {
//       border: "1px solid #DADEDF",
//     },
//   }),
//   singleValue: (provided, state) => {
//     const opacity = state.isDisabled ? 0.5 : 1
//     const transition = "opacity 300ms"
//     return { ...provided, opacity, transition }
//   },
// }

const customStyles = {
  control: () => ({
    height: 60,
    border: "1px solid #ced4da"
  }),
  valueContainer: (provided, state) => ({
    ...provided,
    padding: '27px 8px'
  })
}

const Select = (props) => {
  const { fieldName, urlFilter, status=1, sort } = props
  const Icon = ({ innerRef, innerProps }) => (
    <img
      src="/img/icons/arrow-down.svg"
      alt="arrow down"
      style={{ marginRight: 12 }}
      ref={innerRef}
      {...innerProps}
    />
  )

  const sleep = (ms) =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve()
      }, ms)
    })

  const filteringKey = (v, n) => {
    const asArray = Object.entries(v)
    const filtered = asArray.filter(([key, value]) => key == n)
    return filtered[0][1]
  }

  const get = async (url, params) => {
    const { search, offset, limit, page } = params

    const response = await axios
      .get(
        `${
          env.API_URL
        }/${url}?sort=${sort? sort :fieldName}&filters=${encodeURIComponent(`[["status",${status}],["AND"],["${fieldName}","like","${search}"]${
          urlFilter !== undefined ? `,["AND"],${urlFilter}` : ""
        }]`)}&size=10&page=${page - 1}`,
      )
      .then(function (response) {
        return response.data
      })
      .catch(function (error) {
        // handle error
        console.log(error)
      })

    await sleep(1000)

    let filteredOptions
    if (!search) {
      filteredOptions = response.items.map((item) => ({
        value: item.id,
        label: filteringKey(item, fieldName),
      }))
    } else {
      const searchLower = search.toLowerCase()

      filteredOptions = response.items
        .map((item) => ({
          value: item.id,
          label: filteringKey(item, fieldName),
        }))
        .filter(({ label }) => label.toLowerCase().includes(searchLower))
    }

    const hasMore = response.total > offset + limit
    const slicedOptions = filteredOptions.slice(0, 10)

    return {
      options: slicedOptions,
      hasMore,
    }
  }

  return (
    <SelectFetch
      {...props}
      components={Object.assign(
        {},
        {
          IndicatorSeparator: () => null,
          // DropdownIndicator: Icon,
        },
        props.components,
      )}
      get={get}
      debounceTimeout={300}
      onBlur={() => false}
      queryParams={{
        limit: 10,
      }}
      styles={customStyles}
    />
  )
}

export default Select
