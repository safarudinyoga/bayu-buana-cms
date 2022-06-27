import { withRouter, useHistory } from "react-router"
import React, { useEffect, useRef, useState } from "react"
import useQuery from "lib/query"
import BBDataTable from "components/table/bb-data-table"
import { Table, Form, Card, Button } from "react-bootstrap"
import AccessManagerRow from "components/table/access-manager-row"
import Api from "config/api"
import { Formik } from "formik"
import * as Yup from "yup"
import "../user-access-type.css"
import DataTable from "react-data-table-component"
import { useSnackbar } from "react-simple-snackbar"
import BootstrapTable from 'react-bootstrap-table-next';

const backUrl = "/master/user-access-type"
const options = {
  position: "bottom-right",
}

function ModuleAccess(props) {
  const isView = useQuery().get("action") === "view"
  const history = useHistory()
  const [formBuilder, setFormBuilder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [id, setId] = useState(null)
  const [modules, setModules] = useState([])
  const [capabilitiesHeader, setCapabilitiesHeader] = useState([])
  const [capabilities, setCapabilities] = useState([])
  const [userTypeName, setUserTypeName] = useState(null)
  const allowedModule = useRef([])
  const [openSnackbar] = useSnackbar(options)
  const [tableColumns, setTableColumns] = useState([])
  const [tableHeader, setTableHeader] = useState([{
    dataField: 'module_name',
    text: "Module Name",
    sort: true
  }, {
    dataField: 'category',
    text: 'Category'
  }])

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
        setTableHeader(tableHeader => [
          ...tableHeader,
          {
            dataField: data.capability_code,
            text: data.capability_name, 
            formatter: switchFormatter,
            formatExtraData: `${data.capability_code}`
          }
        ])

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

  useEffect(() => {
    console.log("TABLE HEADER",tableHeader)
  }, [tableHeader])
  

  // useEffect(async () => {
  //   try {
  //     let resCap = await api.get('/master/capabilities')
  //     const cap = []

  //     cap.push(
  //       { name: "Module Name", selector: row => row.module_name }, 
  //       { name: "Category", selector: row => row.module_package_name }
  //     )

  //     resCap.data.items.forEach((data) => {
  //       cap.push(
  //         { name: data.capability_name }
  //         // <th>{data.capability_name}</th>
  //       )
  //     })
  //     setCapabilitiesHeader(cap)
      
  //   } catch (e) {
  //     console.log(e)
  //     throw e
  //   }
  // }, [])

  const sendAllowedModuleData = (index) => {
    if(Object.keys(index).length > 0) {
      if(allowedModule.current.some(e => e.id === index.id)){
        allowedModule.current[allowedModule.current.findIndex(el => el.id === index.id)] = index
      } else {
        console.log("new row")
        allowedModule.current.push(index)
      }
    }
  }
  
  // useEffect(async () => {
  //   try {
  //     if(id){
  //       let resModule = await api.get(`/user/user-types/${id}/modules`)
  //       let dataModule = []

  //       resModule.data.items.forEach((data) => {
  //         dataModule.push({
  //           id: data.id,
  //           module_name: data.module_name
  //         })
  //       })
  //     }
  //   } catch (error) {
      
  //   }
  // }, [id])
  

  useEffect(async () => {
    let userTypeId = props.match.params.id

    try {
      if(id){
        let res = await api.get(`/user/user-types/${id}`)
        setUserTypeName(res.data.user_type_name)

        let resModule = await api.get(`/user/user-types/${id}/modules`)

        const modules = []
        resModule.data.items.forEach((data) => {
          allowedModule.current.push({
            id: data.id,
            capabilities: data.capabilities
          })
          setCapabilities([...capabilities, {
            id: data.id,
            capabilities: data.capabilities
          }])

          console.log("TableData",data)

          let userAccessData = {
            id: data.id,
            module_name: data.module_name,
            category: data.module_package_name,
            activate: data.capabilities.allow_activate,
            bulk_update: data.capabilities.allow_bulk_update,
            create: data.capabilities.allow_create,
            delete: data.capabilities.allow_delete,
            edit: data.capabilities.allow_edit,
            export: data.capabilities.allow_export,
            publish: data.capabilities.allow_publish,
            view: data.capabilities.allow_view
          }

          setTableColumns(tableColumns => [
            ...tableColumns,
            userAccessData
          ])

          modules.push(
            <tr>
              <td>{data.module_name}</td>
              <td>{data.module_package_name}</td>
              <AccessManagerRow 
                capabilities={data.capabilities}
                moduleId={data.id}
                sendAllowedModuleData={sendAllowedModuleData}
              />
            </tr>
          )
          
        })
        setModules(modules)
      }
      
    } catch(e) {
      console.log(e)
      throw e
    }
  }, [id])

  const handleChange = (v, cell, row) => {
    let currentValue = !cell
    console.log(v)
  }

  function switchFormatter(cell, row, rowIndex, formatExtraData){
    return (
      <Form.Check 
        type="switch"
        id={`${formatExtraData}-${row.id}`}
        defaultChecked={cell}
        className="custom-switch-bb"
        onChange={(v) => {
          handleChange(v, cell, row)
        }}
      />
    )
  }
  
  return (
    <>
      <Formik
        enableReinitialize
        initialValues={initialForm}
        validationSchema={validationSchema}
        validator={() => ({})}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          try {
            let res = await api.post(`user/user-types/${id}/modules`, allowedModule.current)
            openSnackbar(`Record '${userTypeName}' has been successfully saved.`)
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
            <>
              <Form onSubmit={handleSubmit}>
                <Card>
                  <Card.Body>
                    <h3 className="card-heading">Module Access {userTypeName ? `- ${userTypeName}` : ""}</h3>
                    <div style={{ padding: "0 2px 2px", borderRadius: 8 }} className="table-responsive">
                      {/* <DataTable
                        columns={capabilitiesHeader}
                        data={modules}
                      /> */}
                      {/* <Table striped className="table-module">
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
                      </Table> */}
                      <BootstrapTable keyField='module_name' columns={tableHeader} data={tableColumns}/>
                    </div>
                  </Card.Body>
                </Card>
                {
                  isView ? (
                    <div className="mb-2 mt-1 row justify-content-md-start justify-content-center">
                      <Button
                        variant="secondary"
                        onClick={() => props.history.goBack()}                        
                      >
                        BACK
                      </Button>
                    </div>
                  ) : (
                    <div className="ml-1 mt-3 row justify-content-md-start justify-content-center">
                      <Button
                        variant="primary"
                        type="submit"
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
                  )
                }
                
              </Form>
            </>
            
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
