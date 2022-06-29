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

const endpoint = "/master/configurations/team-assignments"
function TeamAssignmentForm(props) {
  const dispatch = useDispatch()
  const showCreateModal = useSelector((state) => state.ui.showCreateModal)
  const API = new Api()
  const isView = showCreateModal.disabled_form || props.isView
  const [id, setId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [formValues, setFormValues] = useState(null)
  const [listTravelConsultant, setListTravelConsultant] = useState([])
  const [travelConsultant, setTravelConsultant] = useState([])

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

    if (showCreateModal.id) {
      try {
        let { data } = await API.get(endpoint + "/" + showCreateModal.id)
        setFormValues({
          team_name: data.team_name,
          employee: data.team_members.map((item) => [
            {
              agend_id: "",
              employee_id: item?.employee_id,
              given_name: item.given_name,
              middle_name: item.middle_name,
              surname: item.surname,
              office_name: null,
              can_issue_ticket: item.is_can_issue_ticket,
              is_leader: item.is_leader,
            },
          ]),
        })
      } catch (e) {
        console.log(e)
      }
    }
  }, [])

  const getListTravelConsultant = async () => {
    try {
      let res = await API.get(`/master/configurations/travel-consultants`)
      setListTravelConsultant(
        res.data.items.map((item) => ({
          agent_id: item?.agent_employee?.agent_id,
          employee_id: item?.employee_id,
          given_name: item.person.given_name,
          middle_name: item.person.middle_name,
          surname: item.person.surname,
          office_name: item.office.office_name,
          // can_issue_ticket: false,
        })),
      )
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(async () => {
    getListTravelConsultant()
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
    console.log("submit: ", values)
  }

  console.log("formValues: ", formValues)

  const initialValues = {
    team_name: "",
    employee: [],
  }

  const validationSchema = Yup.object().shape({
    team_name: Yup.string().required("Team Name is required."),
  })
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
      initialValues={formValues || initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
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
            firstData={[]}
            secondData={listTravelConsultant}
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
