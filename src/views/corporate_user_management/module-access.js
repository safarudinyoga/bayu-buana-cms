import { withRouter, useHistory } from "react-router"
import React, { useEffect, useRef, useState } from "react"
import { Table, Form, Card } from "react-bootstrap"
import AccessManagerRow from "components/table/access-manager-row"
import Api from "config/api"
import { Formik } from "formik"
import * as Yup from "yup"
import "./module-access.css"

function ModuleAccess(props) {
  const history = useHistory()

  const [loading, setLoading] = useState(true)
  const [id, setId] = useState(null)
  const [modules, setModules] = useState([])
  const [capabilitiesHeader, setCapabilitiesHeader] = useState([])
  const [capabilities, setCapabilities] = useState([])
  const allowedModule = useRef([])

  const api = new Api()
  useEffect(() => {
    if (!props.match.params.id) {
      setLoading(false)
    }
    setId(props.match.params.id)
  }, [props.match.params.id])

  const [initialForm, setIntialForm] = useState({
    // Emergency Contact 1
    fullNameEmergency1: "",
    phoneNumberEmergency1: "",
    relationshipEmergency1: "",

    // Emergency Contact 2
    fullNameEmergency2: "",
    phoneNumberEmergency2: "",
    relationshipEmergency2: "",
  })

  const validationSchema = Yup.object().shape({
    // Emergency Contact 1
    fullNameEmergency1: Yup.string(),
    phoneNumberEmergency1: Yup.string(),
    relationshipEmergency1: Yup.string(),

    // Emergency Contact 2
    fullNameEmergency2: Yup.string(),
    phoneNumberEmergency2: Yup.string(),
    relationshipEmergency2: Yup.string(),
  })

  useEffect(async () => {
    try {
      let resCap = await api.get("/master/capabilities")
      const cap = []

      resCap.data.items.forEach((data) => {
        cap.push(<th>{data.capability_name}</th>)
      })
      setCapabilitiesHeader(cap)
    } catch (e) {
      console.log(e)
      throw e
    }
  }, [])

  const sendAllowedModuleData = (index) => {
    if (Object.keys(index).length > 0) {
      if (allowedModule.current.some((e) => e.id === index.id)) {
        allowedModule.current[
          allowedModule.current.findIndex((el) => el.id === index.id)
        ] = index
      } else {
        console.log("new row")
        allowedModule.current.push(index)
      }
    }
  }

  useEffect(async () => {
    try {
      if (id) {
        let resModule = await api.get(`/user/user-types/${id}/modules`)

        const modules = []
        resModule.data.items.forEach((data) => {
          allowedModule.current.push({
            id: data.id,
            capabilities: data.capabilities,
          })
          setCapabilities([
            ...capabilities,
            {
              id: data.id,
              capabilities: data.capabilities,
            },
          ])

          modules.push(
            <AccessManagerRow
              moduleName={data.module_name}
              category={data.module_package_name}
              capabilities={data.capabilities}
              moduleId={data.id}
              sendAllowedModuleData={sendAllowedModuleData}
            />,
          )
        })
        setModules(modules)
      }
    } catch (e) {
      console.log(e)
      throw e
    }
  }, [id])

  return (
    <>
      <Formik
        enableReinitialize
        initialValues={initialForm}
        validationSchema={validationSchema}
        validator={() => ({})}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          try {
            let res = await api.post(
              `user/user-types/${id}/modules`,
              allowedModule.current,
            )
            history.goBack()
          } catch (e) {}
        }}
      >
        {({
          values,
          errors,
          touched,
          dirty,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          isValid,
          setFieldValue,
          setFieldTouched,
        }) => (
          <Form onSubmit={handleSubmit}>
            <Card>
              <Form.Label
                style={{
                  textAlign: "center",
                  paddingTop: "20px",
                  textTransform: "uppercase",
                  fontWeight: "bold",
                }}
              >
                Module Access List
              </Form.Label>
              <Card.Body>
                <div
                  style={{ padding: "0 2px 2px", borderRadius: 8 }}
                  className="table-responsive"
                >
                  <Table striped className="table-module">
                    <thead>
                      <tr>
                        <th>Module Name</th>
                        <th>Category</th>
                        {capabilitiesHeader}
                      </tr>
                    </thead>
                    <tbody>{modules}</tbody>
                  </Table>
                </div>
              </Card.Body>
            </Card>
          </Form>
        )}
      </Formik>
    </>
  )
}

export default withRouter(ModuleAccess)
