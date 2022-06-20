import BbDataTable from 'components/table/bb-data-table'
import React, { useEffect, useState } from 'react'
import { Card, Col, Row, Tab } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { setUIParams } from 'redux/ui-store'
import Form from "./form"

const CorporateFrequentTravelerProgramTable = () => {
  let dispatch = useDispatch()
  useEffect(() => {
    dispatch(
      setUIParams({
        title: "User Profile",
        breadcrumbs: [
          {
            text: "User Profile"
          }
        ]
      })
    )
  }, [])

  const [params, setParams] = useState({
    isCheckbox: false,
    title: "Your Frequent Traveler and Hotel Guest Programs",
    titleModal: "Frequent Traveler Program",
    baseRoute: "/master/corporate-frequent-traveler-program/form",
    endpoint: "/",
    modalDelete: true,
    showAdvancedOptions: false,
    columns: [
      {
        title: "Loyalty Name"
      },
      {
        title: "Type"
      },
      {
        title: "Loyalty Number"
      }
    ],
    emptyTable: "No Frequent Traveler and Hotel Guest found",
    showInfoDelete: true,
    isOpenNewTab: false,
    btnDownload: ".buttons-csv",
    module: "corporate-frequent-traveler-programs",
    recordName: [],
    sizePerPage: 5,

  })
  

  return (
    <>
      <Tab.Container>
        <Row>
          <Col sm={3}>

          </Col>
          <Col sm={9}>
            <Card>
              <Card.Body>
                <h3 className='card-heading'>Your Frequent Traveler and Hotel Guest Programs</h3>
                <BbDataTable {...params} onReset={onReset} modalContent={Form} />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Tab.Container>
    </>
  )
}

export default CorporateFrequentTravelerProgramTable