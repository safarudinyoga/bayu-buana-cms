import {withRouter} from "react-router"
import React, {useEffect, useState} from "react"
import Api from "config/api"
import {useDispatch} from "react-redux"
import {setAlert, setUIParams} from "redux/ui-store"
import env from "../../config/environment"
import { Card, ListGroup, Table } from "react-bootstrap"

function ExchangeRateHistory(props) {
  let dispatch = useDispatch()
  let formId = props.match.params.id

  const [loading, setLoading] = useState(true)
  const [id, setId] = useState(null)
	const [history, setHistory] = useState([
		{
			from_currency: "0.6 (EUR)",
			to_currency: "0.000006 (EUR)",
			status: "Changed",
			user: ""
		}
	])
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
    <>
			<h4>Exchange Rate History</h4>
			<Card>
				<Card.Body>
					<h3 className="card-heading">Today</h3>

					<Table striped hover>
						<tbody>
							<tr>
								<td>Andrew Griffits</td>
								<td>Changed</td>
								<td>0.6 (EUR) - 0.000059 (EUR)</td>
								<td>10 Jan 2021 at 10.29</td>
							</tr>
							<tr>
								<td>Andrew Griffits</td>
								<td>Changed</td>
								<td>0.6 (EUR) - 0.000059 (EUR)</td>
								<td>10 Jan 2021 at 10.29</td>
							</tr>
							<tr>
								<td>Andrew Griffits</td>
								<td>Changed</td>
								<td>0.6 (EUR) - 0.000059 (EUR)</td>
								<td>10 Jan 2021 at 10.29</td>
							</tr>
						</tbody>
					</Table>
					<p className="text-center text-primary"> View more </p>
				</Card.Body>
			</Card>
    </>
  )
}

export default withRouter(ExchangeRateHistory)
