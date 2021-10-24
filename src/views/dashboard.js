import environments from "config/environment"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { setUIParams } from "redux/ui-store"

export default function Dashboard() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(
      setUIParams({
        title: "Dashboard",
        breadcrumbs: [
          {
            text: environments.APP_NAME,
          },
          {
            text: "Dashboard",
          },
        ],
      }),
    )
  }, [])
  return (
    <div className="container-fluid">
      <div className="card card-default border shadow-none">
        <div className="card-body">
          <h1>{environments.APP_NAME}</h1>
        </div>
      </div>
    </div>
  )
}
