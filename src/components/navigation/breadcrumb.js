import { Component, useEffect, useState } from "react"
import { useSelector } from "react-redux"
import "./breadcrumb.css"
import env from "config/environment"
import { Link } from "react-router-dom"

function PageTitle() {
  const title = useSelector((state) => state.ui.title)
  useEffect(() => {
    document.title = env.APP_NAME + (title ? " - " + title : "")
  }, [title])
  return <span>{title}</span>
}

function PageBreadcrumb() {
  const breadcrumbs = useSelector((state) => state.ui.breadcrumbs)
  const [data, setData] = useState([])
  useEffect(() => {
    setData(breadcrumbs)
  }, [breadcrumbs])

  return (
    <ol className="breadcrumb">
      {data.map((bc, index) => {
        const active = index + 1 === data.length
        const bcClass = active ? "breadcrumb-item active" : "breadcrumb-item"
        return (
          <li className={bcClass} key={index}>
            {active || !bc.link ? bc.text : <Link to={bc.link}>{bc.text}</Link>}
          </li>
        )
      })}
    </ol>
  )
}

export default class Breadcrumb extends Component {
  render() {
    return (
      <div className="content-header">
        <div className="row mb-2">
          <div className="col-sm-12">
            <PageBreadcrumb />
          </div>
        </div>
        <p className="main-header-title">
          <PageTitle />
        </p>
      </div>
    )
  }
}
