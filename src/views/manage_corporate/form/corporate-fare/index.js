import React, { useEffect, useRef } from "react"
import { withRouter } from "react-router"
import { Form, Row, Col, Button } from "react-bootstrap"
import { useFormik } from "formik"
import * as Yup from "yup"
import DatePicker from "react-datepicker"
import moment from "moment"
import { ReactSVG } from "react-svg"

// compoenents & styles
import Select from "components/form/select"
import { components } from "react-select"
import useQuery from "lib/query"
import { useDispatch, useSelector } from "react-redux"
import { setModalTitle } from "redux/ui-store"
import { handleYears, generateArrayOfYears } from "lib/defineYearsRange"

const Option = (props) => {
  return (
    <div>
      <components.Option {...props}>
        <div className="d-flex justify-content-start align-items-center">
          <Form.Check
            type="checkbox"
            name="workingDays"
            id="workingDays"
            label={props.label}
            onChange={(e) => console.log(e)}
            checked={props.isSelected}
          />
        </div>
      </components.Option>
    </div>
  )
}

const CorporateFareModal = ({ match }) => {
  let dispatch = useDispatch()
  const isView = useQuery().get("action") === "view"
  const showCreateModal = useSelector((state) => state.ui.showCreateModal)

  const {
    handleSubmit,
    handleChange,
    values,
    errors,
    touched,
    setFieldTouched,
    setFieldValue,
  } = useFormik({
    initialValues: {
      team: "",
    },
    validationSchema: Yup.object({}),
    onSubmit: (val) => {
      console.log(val)
    },
  })

  useEffect(async () => {
    let formId = showCreateModal.id || match?.params?.id
    let docTitle = "NEW FARE"

    dispatch(setModalTitle(docTitle))

    if (formId) {
      try {
        // let { data } = await api.get(staticWarding.endpoint + "/" + formId)
        // setFormValues({
        //   ...data,
        //   from_currency_id: {modalContent
        //     value: data.from_currency.id,
        //     label: data.from_currency.currency_name,
        //   },
        //   to_currency_id: {
        //     value: data.to_currency.id,
        //     label: data.to_currency.currency_name,
        //   },
        // })
      } catch (e) {
        console.log(e)
      }
    }
  }, [])

  const calendarStartRef = useRef(null)
  const calendarEndRef = useRef(null)

  return (
    <Form style={{ padding: "0 32px 25px" }}>
      <Row>
        <Col lg={12} style={{ padding: "0 0 25px" }}>
          <Form.Group as={Row} className="form-group">
            <Form.Label column sm={4} className="mb-1">
              Branch Value
            </Form.Label>
            <Col md={3} lg={8}>
              <Select
                isClearable
                placeholder="Please Choose"
                options={[
                  {
                    value: "value",
                    label: "value ??",
                  },
                ]}
                onChange={() => {}}
                // name
                // value
                components={
                  isView
                    ? {
                        DropdownIndicator: () => null,
                        IndicatorSeparator: () => null,
                      }
                    : null
                }
                isDisabled={isView}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="form-group">
            <Form.Label column sm={4} className="mb-2">
              Account Code
            </Form.Label>
            <Col md={3} lg={8}>
              <Form.Control
                type="text"
                minLength={1}
                maxLength={36}
                placeholder=""
                readOnly={isView}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="form-group">
            <Form.Label column sm={4} className="mb-2">
              Negotiated Fare Code
            </Form.Label>
            <Col md={3} lg={8}>
              <Form.Control
                type="text"
                minLength={1}
                maxLength={36}
                placeholder=""
                readOnly={isView}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="form-group">
            <Form.Label column sm={4} className="mb-2">
              Contract Period
            </Form.Label>
            <Col md={3} lg={8} className="row d-flex align-items-center">
              <Col lg={4}>
                <DatePicker
                  ref={calendarStartRef}
                  className="form-control text-center"
                  dateFormat="dd MMMM yyyy"
                  onChange={(date) => {
                    setFieldValue(
                      "general_information.corporate_contract.date_start",
                      date,
                    )
                  }}
                  readOnly={isView}
                  // selected={
                  //   values.general_information.corporate_contract.date_start
                  // }
                  // startDate={
                  //   values.general_information.corporate_contract.date_start
                  // }
                  // endDate={
                  //   values.general_information.corporate_contract.date_end
                  // }
                  selectsStart
                  minDate={handleYears(10, new Date(), "subtract")}
                  maxDate={handleYears(10, new Date(), "add")}
                  monthsShown={2}
                  popperClassName="manage_corporate_date"
                  popperModifiers={[
                    {
                      name: "offset",
                      options: {
                        offset: [-180, 0],
                      },
                    },
                  ]}
                  shouldCloseOnSelect={false}
                  onSelect={(e) => {
                    console.log({ e, calendarEndRef })
                  }}
                  renderCustomHeader={({
                    date,
                    changeYear,
                    monthDate,
                    customHeaderCount,
                    decreaseMonth,
                    increaseMonth,
                  }) => (
                    <div>
                      <button
                        aria-label="Previous Month"
                        className={
                          "react-datepicker__navigation react-datepicker__navigation--previous"
                        }
                        style={
                          customHeaderCount === 1
                            ? { visibility: "hidden" }
                            : null
                        }
                        onClick={decreaseMonth}
                      ></button>
                      <span className="react-datepicker__current-month">
                        {monthDate.toLocaleString("en-US", {
                          month: "long",
                          // year: "numeric",
                        })}
                        <select
                          value={moment(date).year()}
                          onChange={({ target: { value } }) =>
                            changeYear(value)
                          }
                          className="select_year"
                        >
                          {generateArrayOfYears(10, 10).map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </span>
                      <button
                        aria-label="Next Month"
                        className={
                          "react-datepicker__navigation react-datepicker__navigation--next"
                        }
                        style={
                          customHeaderCount === 0
                            ? { visibility: "hidden" }
                            : null
                        }
                        onClick={increaseMonth}
                      >
                        <span className="react-datepicker__navigation-icon--next"></span>
                      </button>
                    </div>
                  )}
                >
                  <div className="wrapper-helper-button">
                    <div
                      className="wrapper_reset"
                      onClick={() => {
                        calendarStartRef.current.clear()
                        calendarStartRef.current.setSelected(null)
                      }}
                    >
                      <h5 className="reset">Reset</h5>
                      <ReactSVG src="/img/icons/reset.svg" />
                    </div>
                    <Button
                      variant="primary"
                      type="button"
                      className="button_apply"
                      onClick={(e) => {
                        console.log(e, "button")
                        // calendarStartRef.current.setSelected(
                        //   values.general_information.corporate_contract
                        //     .date_start,
                        // )
                        calendarStartRef.current.setOpen(false)
                        calendarEndRef.current.setOpen(true)
                      }}
                    >
                      APPLY
                    </Button>
                  </div>
                </DatePicker>
              </Col>
              <span className="text-center">To</span>
              <Col lg={4}>
                <DatePicker
                  className="form-control text-center"
                  dateFormat="dd MMMM yyyy"
                  onChange={(date) => {
                    setFieldValue(
                      "general_information.corporate_contract.date_end",
                      date,
                    )
                  }}
                  readOnly={isView}
                  // selected={
                  //   values.general_information.corporate_contract.date_end
                  // }
                  ref={calendarEndRef}
                  selectsEnd
                  // startDate={
                  //   values.general_information.corporate_contract.date_start
                  // }
                  // endDate={
                  //   values.general_information.corporate_contract.date_end
                  // }
                  // minDate={
                  //   values.general_information.corporate_contract.date_start
                  // }
                  maxDate={handleYears(10, new Date(), "add")}
                  monthsShown={2}
                  popperClassName="manage_corporate_date"
                  popperModifiers={[
                    {
                      name: "offset",
                      options: {
                        offset: [-180, 0],
                      },
                    },
                  ]}
                  shouldCloseOnSelect={false}
                  onSelect={(e) => {
                    // calendarEndRef.current.setSelected(e)
                  }}
                  renderCustomHeader={({
                    date,
                    changeYear,
                    monthDate,
                    customHeaderCount,
                    decreaseMonth,
                    increaseMonth,
                  }) => (
                    <div>
                      <button
                        aria-label="Previous Month"
                        className={
                          "react-datepicker__navigation react-datepicker__navigation--previous"
                        }
                        style={
                          customHeaderCount === 1
                            ? { visibility: "hidden" }
                            : null
                        }
                        onClick={decreaseMonth}
                      ></button>
                      <span className="react-datepicker__current-month">
                        {monthDate.toLocaleString("en-US", {
                          month: "long",
                          // year: "numeric",
                        })}
                        <select
                          value={moment(date).year()}
                          onChange={({ target: { value } }) =>
                            changeYear(value)
                          }
                          className="select_year"
                        >
                          {generateArrayOfYears(10, 10).map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </span>
                      <button
                        aria-label="Next Month"
                        className={
                          "react-datepicker__navigation react-datepicker__navigation--next"
                        }
                        style={
                          customHeaderCount === 0
                            ? { visibility: "hidden" }
                            : null
                        }
                        onClick={increaseMonth}
                      >
                        <span className="react-datepicker__navigation-icon--next"></span>
                      </button>
                    </div>
                  )}
                >
                  <div className="wrapper-helper-button">
                    <div
                      className="wrapper_reset"
                      onClick={() => {
                        calendarEndRef.current.clear()
                        calendarEndRef.current.setSelected(null)
                      }}
                    >
                      <h5 className="reset">Reset</h5>
                      <ReactSVG src="/img/icons/reset.svg" />
                    </div>
                    <Button
                      variant="primary"
                      type="button"
                      className="button_apply"
                      onClick={(e) => {
                        console.log(e, "button")
                        // calendarEndRef.current.setSelected(
                        //   values.general_information.corporate_contract
                        //     .date_end,
                        // )
                        calendarEndRef.current.setOpen(false)
                      }}
                    >
                      APPLY
                    </Button>
                  </div>
                </DatePicker>
              </Col>
            </Col>
          </Form.Group>
        </Col>
      </Row>
      <div
        className="mt-3 row justify-content-md-start justify-content-center"
        style={{ position: "absolute", bottom: "30px" }}
      >
        <Button
          variant="primary"
          type="submit"
          style={{ marginRight: 15, padding: "0 24px" }}
        >
          SAVE
        </Button>
        <Button variant="secondary" style={{ padding: "0 21px" }}>
          CANCEL
        </Button>
      </div>
    </Form>
  )
}

export default withRouter(CorporateFareModal)
