import React, { useEffect, useState } from "react"
import Api from "config/api"
import { renderColumn } from "lib/translation"
import { Link } from "react-router-dom"
import rowStatus from "lib/row-status"
import { useDispatch } from "react-redux"
import { withRouter, useHistory } from "react-router"
import FormInputControl from "components/form/input-control"
import { ReactSVG } from "react-svg"
import FormikControl from "components/formik/formikControl"
import { Row, Col, InputGroup, Nav, Card, Button, Form } from "react-bootstrap"
import { setUIParams } from "redux/ui-store"
import useQuery from "lib/query"
import { Formik, FastField, Field, ErrorMessage } from "formik"
import { setAlert } from "redux/ui-store"
import FormInputSelectAjax from 'components/form/input-select-ajax'
import BBDataTable from "components/table/bb-data-table"
import { useSnackbar } from "react-simple-snackbar"
import * as Yup from "yup"
const endpoint = "/master/integration-partners"
const backUrl = "/master/integration-partner"

const options = {
  position: "bottom-right",
}

function FrequentTravelerProgramUserProfile(props) {
  let dispatch = useDispatch()
  let formId = props.match.params.id

  const [openSnackbar] = useSnackbar(options)
  const history = useHistory()
  let api = new Api()
  // let [status, setStatus] = useState({ switchStatus: true })
  const [data, setData] = useState(null)
  const isView = useQuery().get("action") === "view"
  const [loading, setLoading] = useState(true)
  const [id, setId] = useState(null)
  const [form, setForm] = useState({
    integration_partner_code: "",
    integration_partner_name: "",
    status: true,
    partner_url: "",
    partner_username: "",
    partner_password: "",
  })
	const [ passType, setPassType] = useState("password")

  useEffect(async () => {
    let api = new Api()
    let formId = props.match.params.id
    try {
      let res = await api.get(endpoint + "/" + formId)
      let data = res.data
      setData(data)
      setForm({
        ...form,
        integration_partner_code: data.integration_partner_code,
        integration_partner_name: data.integration_partner_name,
        status: data.status == 1,
        business_entity_id: data.business_entity_id.value,
        partner_url: data.partner_url,
        partner_username: data.partner_username,
        partner_password: data.partner_password ? data.partner_password : "",
      })
    } catch (e) {}
    setLoading(false)
  }, [])
  useEffect(() => {
    if (!props.match.params.id) {
      setLoading(false)
    }
    setId(props.match.params.id)
  }, [props.match.params.id])

  const initialValues = {
    integration_partner_code: "",
    integration_partner_name: "",
    partner_url: "",
    partner_username: "",
    partner_password: "",
  }

  const regexURL = new RegExp('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?'); 
  const validationSchema = Yup.object().shape({
    partner_url: Yup.string()
          .matches(regexURL, 'Invalid URL Format')
  })

  const formSize = {
    label: {
      md: 4,
      lg: 4,
    },
    value: {
      md: 7,
      lg: 7,
    },
  }

  let [selectedProductTypes, setSelectedProductTypes] = useState([])
  let [selectedProductTypeIds, setSelectedProductTypeIds] = useState([])

  const onFilterChange = (e, values) => {
    let ids = []
    if (values && values.length > 0) {
      for (let i in values) {
        ids.push(values[i].id)
      }
    }
    if (ids.length > 0) {
      setParams({ ...params, filters: [["product_type.id", "in", ids]] })
    } else {
      setParams({ ...params, filters: [] })
    }
    setSelectedProductTypes(values)
    setSelectedProductTypeIds(ids)
  }

  const extraFilter = () => {
    return (
      <FormInputSelectAjax
        label="Program Type"
        onChange={onFilterChange}
        endpoint="/master/loyalty-programs"
        column="product_type.product_type_name"
        sort="id"
        isGrouping={true}
        fieldGroup="product_type.id"
        value={selectedProductTypeIds}
        data={selectedProductTypes}
        placeholder="Please choose"
        type="selectmultiple"
        isFilter={true}
        allowClear={false}
      />
    )
  }

  const onReset = () => {
    setParams({ ...params, filters: [] })
    setSelectedProductTypes([])
    setSelectedProductTypeIds([])
  }

  let [params, setParams] = useState({
    title: "Frequent Traveler Program",
    titleModal: "Frequent Traveler Program",
    baseRoute: "/master/frequent-traveler-program/form",
    endpoint: "/master/loyalty-programs",
    deleteEndpoint: "/master/batch-actions/delete/loyalty-program",
    activationEndpoint: "/master/batch-actions/activate/loyalty-programs",
    deactivationEndpoint: "/master/batch-actions/deactivate/loyalty-programs",
    columns: [
      {
        title: "Loyalty Name",
        data: "loyalty_program_name",
        render: renderColumn("loyalty_program", "loyalty_program_name"),  
      },
      {
        title: "Type",
        data: "product_type.product_type_name",        
      },
      {
        title: "Description",
        data: "description",
        render: (data) => {
          if (data === undefined) {
            return ""
          } else {
            return data
          }
        },
      },
      {
        searchable: false,
        title: "Status",
        data: "status",
        render: rowStatus,
      },      
      {
        title: "Translated Frequent Traveler Program",
        data: "loyalty_program_translation.loyalty_program_name",
        visible: false,
      },   
    ],
    emptyTable: "No frequent traveler program found",
    recordName: ["loyalty_program_name"],
    showInfoDelete: true,
    btnDownload: ".buttons-csv",
    infoDelete: [
      {title: "Loyalty Name", recordName: "loyalty_program_name"}, 
    ],
    customFilterStatus: {
      value: "",
      options: [
        {value: "1", label: "Active"},
        {value: "3", label: "Inactive"},
      ]
    }
  })

  return (
    <Formik
      enableReinitialize
      initialValues={form || initialValues}
      validationSchema={validationSchema}
    >
      {({
        values,
        errors,
        touched,
        dirty,
        handleChange,
        handleBlur,
        handleSubmit,
        isValid,
        isSubmitting,
        setFieldValue,
        setFieldTouched,
      }) => (
        <Form onSubmit={handleSubmit}>
          <Card>
            <Card.Body>
              <h3 className="card-heading">Subscriptions</h3>
              <BBDataTable {...params} extraFilter={extraFilter} onReset={onReset} />
            </Card.Body>
          </Card>
        </Form>
      )}
    </Formik>
  )
}

export default withRouter(FrequentTravelerProgramUserProfile)
