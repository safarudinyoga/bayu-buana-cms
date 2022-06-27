import BBDataTable from "components/table/bb-data-table"
import rowStatus from "lib/row-status"
import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { setUIParams } from "redux/ui-store"
import Api from "config/api"
import $ from "jquery"
import { Button, Modal, Table } from "react-bootstrap"
import useQuery from "lib/query"
import FormInputSelectAjax from "../../components/form/input-select-ajax"

export default function CreateUserAccess(props) {
  const [parentDivisionTypeData, setParentDivisionTypeData] = useState([])
  const isView = useQuery().get("action") === "view"
  const [loading, setLoading] = useState(true)
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  let dispatch = useDispatch()
  useEffect(() => {
    dispatch(
      setUIParams({
        title: "Create User Access",
        breadcrumbs: [
          {
            text: "Manage Access",
          },
          {
            text: "User Management",
          },
          {
            text: "Create User Access",
          },
        ],
      }),
    )
  }, [])

  return (
    <div>
      <div class="card">
        <div class="card-body">
          <div className="row">
            <p className="col-3">
              Select Employee to Grant Access <span>*</span>
            </p>
            <div className="col-6">
              <FormInputSelectAjax
                // label="Parent Division"
                // value={form.parent_division_id}
                name="parent_division_id"
                endpoint="/master/corporate-divisions"
                column="division_name"
                // filter={
                //   formId
                //     ? `[["id","!=","${formId}"],["and"],[["parent_division_id","!=","${formId}"],["or"],["parent_division_id","is",null]]]`
                //     : ``
                // }
                // onChange={(e) =>
                //   setForm({ ...form, parent_division_id: e.target.value || null })
                // }
                data={parentDivisionTypeData}
                // disabled={isView || loading}
                type="select"
                placeholder="Select Parent Division"
              />
            </div>
            {/* {(formId === undefined || !loading) && (
          )} */}
            <a href="corporate-user-profile" className="col-3">
              Create New Employee
            </a>
          </div>
          <div className="row">
            <p className="col-3">
              User Type <span>*</span>
            </p>
            <div className="col-6">
              <FormInputSelectAjax
                // label="Parent Division"
                // value={form.parent_division_id}
                name="parent_division_id"
                endpoint="/master/corporate-divisions"
                column="division_name"
                // filter={
                //   formId
                //     ? `[["id","!=","${formId}"],["and"],[["parent_division_id","!=","${formId}"],["or"],["parent_division_id","is",null]]]`
                //     : ``
                // }
                // onChange={(e) =>
                //   setForm({ ...form, parent_division_id: e.target.value || null })
                // }
                data={parentDivisionTypeData}
                // disabled={isView || loading}
                type="select"
                placeholder="Select User Type"
              />
            </div>
            {/* {(formId === undefined || !loading) && (
          )} */}
            <a className="col-3" onClick={handleShow}>
              View Module Access List
            </a>
          </div>
          <p className="mt-5" style={{ fontSize: "12px" }}>
            Note: password will be automatically generated and sent to the
            respective employee`s registered email
          </p>
        </div>
      </div>
      <div className="ml-1 mt-3 row justify-content-md-start justify-content-center">
        <Button
          variant="dark"
          type="submit"
          style={{ marginRight: 15, marginBottom: 135 }}
        >
          SAVE
        </Button>
        <Button variant="secondary">CANCEL</Button>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          <Table bordered hover>
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
                <th>View</th>
                <th>Create</th>
                <th>Delete</th>
                <th>Edit</th>
                <th>Mass Update</th>
                <th>Export</th>
              </tr>
              <tr>
                <td>Employee</td>
                <td>Corporate Management</td>
                <th>View</th>
                <th>Create</th>
                <th>Delete</th>
                <th>Edit</th>
                <th>Mass Update</th>
                <th>Export</th>
              </tr>
              <tr>
                <td>Travel Policy</td>
                <td>Corporate Management</td>
                <th>View</th>
                <th>Create</th>
                <th>Delete</th>
                <th>Edit</th>
                <th>Mass Update</th>
                <th>Export</th>
              </tr>
              <tr>
                <td>Preference</td>
                <td>Corporate Management</td>
                <th>View</th>
                <th>Create</th>
                <th>Delete</th>
                <th>Edit</th>
                <th>Mass Update</th>
                <th>Export</th>
              </tr>
            </tbody>
          </Table>
        </Modal.Body>
      </Modal>
    </div>
  )
}
