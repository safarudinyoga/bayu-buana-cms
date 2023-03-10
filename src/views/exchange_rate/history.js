import {withRouter} from "react-router"
import React, {useEffect, useState} from "react"
import Api from "config/api"
import {useDispatch} from "react-redux"
import {setAlert, setUIParams} from "redux/ui-store"
import env from "../../config/environment"
import { Row, Col, Button } from "react-bootstrap"
import ExchangeRateForm from 'views/exchange_rate/form'
import HistoryTable from "./history_table/history_table"

function ExchangeRateHistory(props) {
  let dispatch = useDispatch()
  let formId = props.match.params.id

  const [loading, setLoading] = useState(true)
  const [id, setId] = useState(null)
  const [form, setForm] = useState({
    country_id: "",
    state_province_category_id: "",
    fee_type_code: "",
    fee_type_name: "",
  })

  useEffect(async () => {
    let api = new Api()
    let formId = props.match.params.id

    let docTitle = "Exchange Rate Details"

    dispatch(
      setUIParams({
        title: docTitle,
        breadcrumbs: [
          {
            text: "Exchange Rate",
          },
          {
            text: docTitle,
          },
        ],
      }),
    )
  }, [])

  useEffect(() => {
    if (!props.match.params.id) {
      setLoading(false)
    }
    setId(props.match.params.id)
  }, [props.match.params.id])

  return (
    <div className="pb-5">
      <Row>
        <Col md={8} lg={5}>
          <ExchangeRateForm id={formId} hideButton={true} isView={true}/>
        </Col>
      </Row>

      <HistoryTable id={formId}/>
      <Button
        className="mt-4 mb-5"
        variant="secondary"
        onClick={() => props.history.goBack()}
      >
        BACK
      </Button>
    </div>
  )
}

export default withRouter(ExchangeRateHistory)
