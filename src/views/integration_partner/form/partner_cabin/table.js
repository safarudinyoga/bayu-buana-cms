import BBDataTable from "components/table/bb-data-table"
import React, { useEffect, useState } from "react"
// import DeleteModal from "./form/form-delete"
import { Card} from "react-bootstrap"
import PartnerCabins from "./form/form"
import { useDispatch, useSelector } from "react-redux"
import { setContentTitle } from "redux/ui-store"
import { useParams } from "react-router-dom"
export default function IntegrationPartnerCabinTypesTable(props) {
  const { id } = useParams()
  let dispatch = useDispatch()
  useEffect(() => {
    dispatch(
      setContentTitle("Partner Cabins"),
    )
  }, [])


  const contentTitle = useSelector((state) => state.ui.contentTitle)
  const [isReplaceTable, setIsReplaceTable] = useState(false)
  const [isDetail, setIsDetail] = useState(false)
  const [partnerCabinId, setPartnerCabinId] = useState(null)

  const handleReplaceTable = async (key) => {
    setIsReplaceTable(!key)
  }

  const handleIsDetail = (key) => {
    setIsDetail(key)
  }

  const setId = async (id) => {
    setPartnerCabinId(id)
  }
  let [params, setParams] = useState({
    isCheckbox: false,
    title: "",
    // modalDelete: true,
    titleModal: "",
    showAdvancedOptions: false,
    baseRoute: "/master/integration-partner-cabin-types/form",
    endpoint: `/master/integration-partners/${id}/cabin-types`,
    deleteEndpoint: "/master/batch-actions/delete/master/integration-partner-cabin-types",
    activationEndpoint: "/master/batch-actions/activate/integration-partner-cabin-types",
    deactivationEndpoint: "/master/batch-actions/deactivate/integration-partner-cabin-types",
    btnDownload: ".buttons-csv",
    isReplaceTable: true,
    columns: [
      {
        title: "Cabin",
        data: "cabin_type.cabin_type_name",

      },
      {
        title: "Partner Cabin Code",
        data: "cabin_type_code"
      },
      {
        title: "Partner Cabin Name",
        data: "cabin_type_name"
      },

    ],
    emptyTable: "No Partner Cabins found",
    showInfoDelete: true,
    isOpenNewTab: false,
    module:"partner-cabin",
    recordName: ["cabin_type.cabin_type_name", "cabin_type_code", "cabin_type_name"],
    showInfoDelete: true,
    infoDelete: [
      {title: "Partner Cabin Name", recordName: "cabin_type_name"}, 
    ],
    searchText: "Search",
    showModalHeader: false,
  })

  return (
    <>
      <Card>
        <Card.Body>
          <h3 className="card-heading">{contentTitle}</h3>
          {
          isReplaceTable ? <PartnerCabins isReplaceTable={isReplaceTable} handleReplaceTable={handleReplaceTable} partnerCabinId={partnerCabinId} isDetail={isDetail}/> :
          <BBDataTable {...params} handleReplaceTable={handleReplaceTable} setId={setId} handleIsDetail={handleIsDetail}/>
          }
          </Card.Body>
      </Card>
    </>
  )
}
