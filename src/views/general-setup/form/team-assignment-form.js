import React, { useState, useEffect } from "react"
import { withRouter } from "react-router"
import { Form, FormGroup, InputGroup, Button } from "react-bootstrap"
import { Formik, FastField } from "formik"
import * as Yup from "yup"
import useQuery from "lib/query"
import Api from "config/api"
import { useDispatch, useSelector } from "react-redux"
import { setAlert, setCreateModal, setModalTitle } from "redux/ui-store"
import CancelButton from "components/button/cancel"
import CardAddOrRemove from "components/card/add-or-remove-list"
import FormikControl from "components/formik/formikControl"

const dummy1 = [
  {
    name: "Tiffany Young",
    category: "BCD",
  },
  {
    name: "Dhani Doel",
    category: "BCD",
  },
  {
    name: "Jhon Bill",
    category: "NCD",
  },
]

const dummy2 = [
  {
    name: "Tamara Ling",
    category: "NCD",
  },
  {
    name: "Margot Roe",
    category: "NCD",
  },
  {
    name: "Betty Jhon",
    category: "NCD",
  },
  {
    name: "Miando Nael",
    category: "BCD",
  },
  {
    name: "Bel Nuts",
    category: "BCD",
  },
  {
    name: "Tamara Ling",
    category: "NCD",
  },
]

const endpoint = ""
function TeamAssignmentForm(props) {
  const dispatch = useDispatch()
  const showCreateModal = useSelector((state) => state.ui.showCreateModal)
  const API = new Api()
  const isView = showCreateModal.disabled_form || props.isView
  const [id, setId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [formValues, setFormValues] = useState(null)

  useEffect(async () => {
    let formId = showCreateModal.id || props.id

    let docTitle = (
      <div>
        TEAM ASSIGNMENT<br></br>MODIFY TEAM
      </div>
    )
    if (!formId) {
      docTitle = (
        <div>
          TEAM ASSIGNMENT<br></br>ADD TEAM
        </div>
      )
    }

    dispatch(setModalTitle(docTitle))

    // if (formId) {
    //   try {
    //     let { data } = await API.get(endpoint + "/" + formId)
    //     setFormValues({
    //       ...data,
    //       currency_id: {
    //         value: data.currency_id,
    //         label: data.currency_id,
    //       },
    //       bank_id: {
    //         value: data.bank_id,
    //         label: data.bank_id,
    //       },
    //     })
    //   } catch (e) {
    //     console.log(e)
    //   }
    // }
  }, [])

  useEffect(() => {
    if (!showCreateModal.id) {
      setLoading(false)
    }

    if (formValues) {
      setLoading(false)
    }

    setId(showCreateModal.id)
  }, [showCreateModal.id, formValues])

  const onSubmit = async (values, a) => {
    console.log(values)
  }

  const formSize = {
    label: {
      md: 5,
      lg: 5,
    },
    value: {
      md: 7,
      lg: 7,
    },
  }

  return (
    <Formik
      //   initialValues={formValues || initialValues}
      //   validationSchema={validationSchema}
      onSubmit={onSubmit}
      validateOnMount
      enableReinitialize
    >
      {({ dirty, handleSubmit, isSubmitting, setFieldValue, values }) => (
        <Form onSubmit={handleSubmit} className="m-2 px-3">
          <div className="d-flex justify-content-center my-4">
            <FormikControl
              control="input"
              required="label-required"
              label="Team Name"
              name="team_name"
              style={{ maxWidth: 250 }}
              size={formSize}
              disabled={isView || loading}
              maxLength={36}
            />
          </div>
          <CardAddOrRemove
            firstData={dummy1}
            secondData={dummy2}
            firstCardTitle="team members"
            secondCardTitle="travel consultant name"
            onModal
          />
          <div className="d-flex justify-content-center">
            {!props.hideButton && (
              <div
                style={{
                  marginBottom: 30,
                  marginTop: 30,
                  display: "flex",
                }}
              >
                {!isView && (
                  <Button
                    className="px-4"
                    variant="primary"
                    type="submit"
                    disabled={isSubmitting}
                    style={{ marginRight: 15 }}
                  >
                    SAVE
                  </Button>
                )}
                <CancelButton
                  onClick={() =>
                    dispatch(
                      setCreateModal({
                        show: false,
                        id: null,
                        disabled_form: false,
                      }),
                    )
                  }
                />
              </div>
            )}
          </div>
        </Form>
      )}
    </Formik>
  )
}
export default withRouter(TeamAssignmentForm)
