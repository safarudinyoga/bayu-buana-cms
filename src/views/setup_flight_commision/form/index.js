import { withRouter } from "react-router"
import React, { useEffect, useState } from 'react'
import Api from "config/api"
import useQuery from "lib/query"
import { useDispatch } from "react-redux"
import { setUIParams } from "redux/ui-store"
import { Row, Col, Tab, Nav } from "react-bootstrap"

import GeneralInformation from "./general-information"

const endpoint = "/master/flight-commisions"
const backUrl = "/master/setup-flight-commision"

const FlightCommisionForm = (props) => {
  let dispatch = useDispatch()

  let api = new Api()

  const isView = useQuery().get("action") === "view"
  const [loading, setLoading] = useState(true)
  const [id, setId] = useState(null)
  const [form, setForm] = useState({
    id: "",
    airline: "",
    origin: "",
    destination: "",
    period_issue: "",
  })

  useEffect(async () => {
    let api = new Api()
    let formId = props.match.params.id

    let docTitle = "Edit Flight Commision"
    if (!formId) {
      docTitle = "Create Flight Commision"
    } else if (isView) {
      docTitle = "Flight Commision Details"
    }

    dispatch(
      setUIParams({
        title: docTitle,
        breadcrumbs: [
          {
            text: "Master Data Management",
          },
          {
            link: backUrl,
            text: "Flight Commisions",
          },
          {
            text: docTitle,
          },
        ],
      }),
    )
    if (formId) {
      try {
        let res = await api.get(endpoint + "/" + formId)
        setForm(res.data)
      } catch (e) { }
      setLoading(false)
    }
  }, [])

  return (
    <Tab.Container>
      <Row>
        <Col>
          <GeneralInformation
            history={props.history}
            backUrl={backUrl}
          />
        </Col>
      </Row>
    </Tab.Container>
  )
}

export default withRouter(FlightCommisionForm)