import { withRouter, useHistory } from "react-router"
import React, { useEffect, useState } from "react"
import FormHorizontal from "components/form/horizontal"
import FormBuilder from "components/form/builder"
import useQuery from "lib/query"
import BBDataTable from "components/table/bb-data-table"
import { Table, Form, Card, Button } from "react-bootstrap"
import rowStatus from "lib/row-status"
import AccessManagerRow from "components/table/access-manager-row"
import Api from "config/api"
import { Formik } from "formik"
import * as Yup from "yup"
import "../user-access-type.css"
import { useStateWithCallbackLazy } from "use-state-with-callback"

const backUrl = "/master/user-access-type"

function ModuleAccess(props) {
  const isView = useQuery().get("action") === "view"
  const history = useHistory()
  const [formBuilder, setFormBuilder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [id, setId] = useState(null)
  const [modules, setModules] = useState([])
  const [capabilitiesHeader, setCapabilitiesHeader] = useState([])
  const [categories, setCategories] = useState([])
  const [allowModules, setAllowModules] = useState([])
  const [capabilities, setCapabilities] = useStateWithCallbackLazy([])

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
      let resCap = await api.get('/master/capabilities')
      const cap = []

      resCap.data.items.forEach((data) => {
        cap.push(
          <th>{data.capability_name}</th>
        )
      })
      setCapabilitiesHeader(cap)
      
    } catch (e) {
      console.log(e)
      throw e
    }
  }, [])

  useEffect(async () => {
    let userTypeId = props.match.params.id
    console.log("PARAMS ID",userTypeId)
    console.log("STATE ID", id)

    try {
      if(userTypeId){
        let resModule = await api.get(`/user/user-types/${userTypeId}/modules`)

        const modules = []
        resModule.data.items.forEach((data) => {
          setCapabilities([...capabilities, {
            id: data.id,
            capabilities: data.capabilities
          }])

          modules.push(
            <AccessManagerRow 
              moduleName={data.module_name} 
              category={data.module_package_name} 
              capabilities={data.capabilities}
              moduleId={data.id}
              // onChange={() => {
              //   setAllowModules([...allowModules, {
              //     id: data.id,
              //     capabilities: {
              //       ...capabilities,
              //     }
              //   }])
              // }}
            />
          )
          
        })
        setModules(modules)
      }
      
    } catch(e) {
      console.log(e)
      throw e
    }
  }, [])
  

  return (
    <>
      <Formik
        enableReinitialize
        initialValues={initialForm}
        validationSchema={validationSchema}
        validator={() => ({})}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          let formatted = [{
            capabilities: {
              allow_activate: true,
              allow_bulk_update: true,
              allow_create: true,
              allow_delete: true,
              allow_edit: true,
              allow_export: true,
              allow_publish: true,
              allow_view: true
            },
            id: "3c587426-d0fd-4436-95cd-1b748a03d04a",
          }]

          try {
            let res = await api.post(`user/user-types/${id}/modules`, formatted)
            history.goBack()
          } catch(e) {}
        }}
      >
        {
          ({
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
                <Card.Body>
                  <div style={{ padding: "0 2px 2px", borderRadius: 8 }} className="table-responsive">
                    <Table striped className="table-module">
                      <thead>
                        <tr>
                          <th>Module Name</th>
                          <th>Category</th>
                          {capabilitiesHeader}
                        </tr>
                      </thead>
                      <tbody>
                        {modules}
                      </tbody>
                    </Table>
                  </div>
                </Card.Body>
              </Card>
              <div className="ml-1 mt-3 row justify-content-md-start justify-content-center">
                <Button
                  variant="primary"
                  type="submit"
                  // disabled={props.finishStep > 0 || props.employeeData?.id ? (!isValid || isSubmitting) : (!dirty || isSubmitting)}
                  style={{ marginRight: 15, marginBottom: 135 }}
                >
                  {/* {props.employeeData?.id ? "SAVE" : "SAVE & NEXT"} */}
                  SAVE
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => props.history.goBack()}
                >
                  CANCEL
                </Button>
              </div>
            </Form>
          )
        
        }
      </Formik>
      {/* <FormBuilder
        onBuild={(el) => setFormBuilder(el)}
        isView={isView || loading}
        onSave={onSave}
        back={backUrl}
        alertMessage={"Incomplete data"}
        isValid={true}
        showHeaderTitle={true}
        headerTitle={"Module Access - Manager"}
        txtSave={"SAVE"}
        hideTranslation={true}
      >
        <FormHorizontal>
          <Table responsive>
            <thead>
              <tr>
                <th>Module Name</th>
                <th>Category</th>
                <th>View</th>
                <th>Create</th>
                <th>Delete</th>
                <th>Edit</th>
                <th>Mass Update</th>
                <th>Export</th>
              </tr>
            </thead>
            <tbody>
              {modules}
            </tbody>
          </Table>
        </FormHorizontal> 

      </FormBuilder> */}
    </>
    
  )
}

export default withRouter(ModuleAccess)
