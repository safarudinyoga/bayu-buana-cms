import {withRouter} from "react-router"
import React, {useEffect, useState} from "react"
import Api from "config/api"
import {useDispatch} from "react-redux"
import {setAlert, setUIParams} from "redux/ui-store"
import env from "config/environment"
import { Card, ListGroup, Row, Col, Table, Badge } from "react-bootstrap"
import moment from 'moment';
import "./history_table.css"

const endpoint = "/master/currency-conversions"
function HistoryTable(props) {
    const [history, setHistory] = useState([])
    const [option, setOptions] = useState(10)
    const [showViewMore, setViewMore] = useState(true)
    const API = new Api()

    const options = [10, 25, 50, 100, "All"]

    useEffect(async () => {
        if(props.id) {
           fetchHistory(3)
        }
    }, [])

    const fetchHistory = async(size) => {
        try {
            let {data} = await API.get(`${endpoint}/${props.id}/history?size=${size}`)
            setHistory([...data.items])
        } catch(e) {}
    }

    const viewMore = async () => {
        fetchHistory(option)
        setViewMore(false)
    }
  return (
    <>
        <h5 className="font-weight-bold mt-5 ml-2">Exchange Rate History</h5>
        <Card>
            <Card.Body>
                <h3 className="card-heading">Today</h3>

                {history.length > 0 
                    ? (<>
                    <Table striped hover>
                        <tbody>
                            {
                                history.map(d => (
                                <tr>
                                    <td className="text-center">{"Andrew Griffits"}</td>
                                    <td className="text-center">
                                        <Badge className="badge-bb">
                                            {d.status === 1 ? "Changed" : ""}
                                        </Badge>
                                    </td>
                                    <td className="text-center">{d.old_value} - {d.new_value}</td>
                                    <td className="text-center">{moment(d.created_at).format("DD MMM ")} at {moment(d.created_at).format("HH.MM")}</td>
                                </tr>
                                ))
                            }
                        </tbody>
                    </Table>
                    {showViewMore && (<p className="text-center text-primary cursor-pointer mt-3" onClick={viewMore}> View more </p>)}
                    </>)
                    : <p className="text-center">No exchange rates found</p>
                }

                
            </Card.Body>
        </Card>
    </>
  )
}

export default withRouter(HistoryTable)
