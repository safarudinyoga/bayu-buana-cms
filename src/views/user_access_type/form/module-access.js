import { withRouter } from "react-router"
import React, { useEffect, useState } from "react"
import FormHorizontal from "components/form/horizontal"
import FormBuilder from "components/form/builder"
import useQuery from "lib/query"
import BBDataTable from "components/table/bb-data-table"
import { Table, Form } from "react-bootstrap"
import rowStatus from "lib/row-status"
const backUrl = "/master/user-access-type"

function ModuleAccess(props) {
  const isView = useQuery().get("action") === "view"
  const [formBuilder, setFormBuilder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [id, setId] = useState(null)

  useEffect(() => {
    if (!props.match.params.id) {
      setLoading(false)
    }
    setId(props.match.params.id)
  }, [props.match.params.id])

  const onSave = async () => {
    
  }

  return (
    <FormBuilder
      onBuild={(el) => setFormBuilder(el)}
      isView={isView || loading}
      onSave={onSave}
      back={backUrl}
      alertMessage={"Incomplete data"}
      isValid={true}
      showHeaderTitle={true}
      headerTitle={"Module Access - Manager"}
      txtSave={"SAVE & NEXT"}
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
            <tr>
              <td>Company Profile</td>
              <td>Corporate Management</td>
              <td>
                <Form.Check 
                  type="switch"
                  id="view-switch-1"
                />
              </td>
              <td>
                <Form.Check 
                  type="switch"
                  id="create-switch-1"
                />
              </td>
              <td>
                <Form.Check 
                  type="switch"
                  id="delete-switch-1"
                />
              </td>
              <td>
                <Form.Check 
                  type="switch"
                  id="edit-switch-1"
                />
              </td>
              <td>
                <Form.Check 
                  type="switch"
                  id="mass-update-switch-1"
                />
              </td>
              <td>
                <Form.Check 
                  type="switch"
                  id="export-switch-1"
                />
              </td>
            </tr>
            <tr>
              <td>Employee</td>
              <td>Corporate Management</td>
              <td>
                <Form.Check 
                  type="switch"
                  id="view-switch-2"
                />
              </td>
              <td>
                <Form.Check 
                  type="switch"
                  id="create-switch-2"
                />
              </td>
              <td>
                <Form.Check 
                  type="switch"
                  id="delete-switch-2"
                />
              </td>
              <td>
                <Form.Check 
                  type="switch"
                  id="edit-switch-2"
                />
              </td>
              <td>
                <Form.Check 
                  type="switch"
                  id="mass-update-switch-2"
                />
              </td>
              <td>
                <Form.Check 
                  type="switch"
                  id="export-switch-2"
                />
              </td>
            </tr>
          </tbody>
        </Table>
      </FormHorizontal>

    </FormBuilder>
  )
}

export default withRouter(ModuleAccess)
