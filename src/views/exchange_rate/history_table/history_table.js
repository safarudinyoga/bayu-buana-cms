import {withRouter} from "react-router"
import React, {useEffect, useState} from "react"
import Api from "config/api"
import {useDispatch} from "react-redux"
import {setAlert, setUIParams} from "redux/ui-store"
import env from "config/environment"
import { Card, Pagination, Row, Col, Table, Badge } from "react-bootstrap"
import moment from 'moment';
import "./history_table.css"
import Select from '../../../components/form/select';
import ThousandSeparator from '../../../lib/thousand-separator';

const endpoint = "/master/currency-conversions"
function HistoryTable(props) {
	const [history, setHistory] = useState([])
	const [option, setOption] = useState({value: 10, label: 10})
	const [showViewMore, setViewMore] = useState(true)
	const [item, setItem] = useState({})
	const [pageInfo, setPageInfo] = useState({
		page: 0,
		total_pages: 1
	})
	const API = new Api()

	const options = [
		{value: 10, label: 10},
		{value: 25, label: 25},
		{value: 50, label: 50},
		{value: 100, label: 100},
		{value: -1, label: "All"},
	]

	useEffect(async () => {
		if(props.id) {
			fetchHistory(3)
			getData()
		}
	}, [])

	const getData = async () => {
		try {
			let {data} = await API.get(`${endpoint}/${props.id}`)
			setItem(data)
		} catch(e) {}
	}

	const fetchHistory = async(size, page=0) => {
		try {
			size = size === "All" ? -1 : size
			let {data} = await API.get(`${endpoint}/${props.id}/history?size=${size}&page=${page}`)
			setHistory([...data.items])
			setPageInfo({page: data.page, total_pages: data.total_pages})
		} catch(e) {}
	}

	const viewMore = async () => {
		fetchHistory(option.value)
		setViewMore(false)
	}

	const TablePagination = () => {
		return (
			<Pagination>
				<Pagination.Prev disabled={pageInfo.page === 0} onClick={() => fetchHistory(option.value, pageInfo.page-1)} />
				{/* {
					pageInfo.total_pages > 7
					? (
						<div>hai</div>
					)
					: (<> */}
							{
								Array.from(Array(pageInfo.total_pages)).map((a, i) =>{
									return (<Pagination.Item 
										active={i === pageInfo.page} 
										onClick={() => i !== pageInfo.page ? fetchHistory(option.value, i) : ""}>
										{i+1}
									</Pagination.Item>)
								})
							}
					{/* </>)
				} */}
				{/* <Pagination.Item>{1}</Pagination.Item>
				{pageInfo.total_pages > 3 && pageInfo.page > 1 && <Pagination.Ellipsis />}
				<Pagination.Item active>{pageInfo.page+1}</Pagination.Item>
				{pageInfo.total_pages > 3 && pageInfo.page < pageInfo.total_pages-1 && <Pagination.Ellipsis />}
				{ pageInfo.total_pages > 1 && pageInfo.page < pageInfo.total_pages-1 && <Pagination.Item>{pageInfo.total_pages}</Pagination.Item>}*/}
				<Pagination.Next disabled={pageInfo.page === pageInfo.total_pages-1} onClick={() => fetchHistory(option.value, pageInfo.page+1)} /> 
			</Pagination>
		)
	}

	const TableFooter = () => {
		return showViewMore 
		? (<p className="text-center text-primary cursor-pointer mt-3" onClick={viewMore}> View more </p>)
		: (<>
			<Row className="mt-3">
				<Col md={6}>
					<div style={{width: 80}}>
						<Select
							menuPlacement="top"
							options={options}
							value={option}
							defaultValue={option}
							onChange={(v) => {
								console.log(v)
								setOption(v)
								fetchHistory(v.value)
							}}
						/>
					</div>
				</Col>
				<Col md={6}>
					<div className="float-right">
							<TablePagination/>
					</div>
				</Col>
			</Row>
			</>)
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
											history.map((d, i) => (
											<tr key={i}>
												<td className="text-center">{"Andrew Griffits"}</td>
												<td className="text-center">
													<Badge className="badge-bb">
														{d.status === 1 ? "Changed" : ""}
													</Badge>
												</td>
												<td className="text-center">
													{ThousandSeparator(parseFloat(d.old_value))} ({item.from_currency?.currency_code})
													<i className="mx-2 fas fa-arrow-right"></i> 
													{ThousandSeparator(parseFloat(d.new_value))} ({item.to_currency?.currency_code})
												</td>
												<td className="text-center">{moment(d.created_at).format("DD MMM ")} at {moment(d.created_at).format("HH.MM")}</td>
											</tr>
											))
										}
								</tbody>
							</Table>
							<TableFooter />
							</>)
							: <p className="text-center">No histories found</p>
						}
					</Card.Body>
        </Card>
    </>
  )
}

export default withRouter(HistoryTable)
