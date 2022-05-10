import { Component, useEffect, useState } from "react"
import { useSelector } from "react-redux"
import "./breadcrumb.css"
import env from "config/environment"
import { Link } from "react-router-dom"
import AdImage from "../../assets/ad_img.png"
import { useHistory } from "react-router-dom"

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
          <li className={`breadcrumb-overflow ${bcClass}`} key={index}>
            {active || !bc.link ? (
              bc.text
            ) : (
              <Link to={bc.link}> {bc.text}</Link>
            )}
          </li>
        )
      })}
    </ol>
  )
}

export default class Breadcrumb extends Component {
  render() {
    const isExtranet = this.props.location.includes("extranet")
    return (
      <div className="content-header">
        <div className="row mb-2">
          <div className="col-12 col-sm-6">
            <div className="mb-2">
              <PageBreadcrumb />
            </div>
            <p className="main-header-title">
              <PageTitle />
            </p>
          </div>
          <div className="col-12 col-sm-6">
          {
            isExtranet && <img src={AdImage} className="ad-image"/>
          }
          </div>
        </div>
      </div>
    )
  }
}
