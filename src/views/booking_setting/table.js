import BBDataTable from "components/table/bb-data-table"
import rowStatus from "lib/row-status"
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setUIParams } from "redux/ui-store"
import { Card, Form, Row, Col, Button, Modal } from "react-bootstrap"
// import Form from "./form";

export default function BookingSetting() {
  let dispatch = useDispatch()
  useEffect(() => {
    dispatch(
      setUIParams({
        title: "Sabre",
        breadcrumbs: [
          {
            text: "Setup and Configurations",
          },
          {
            text: "Intergration Partner",
          },
          {
            text: "Sabre",
          },
        ],
      }),
    )
  }, [])

  const onReset = () => {
    setParams({ ...params, filters: [] })
  }

  let [params, setParams] = useState({
    createOnModal: true,
    showAdvancedOptions: false,
    isCheckbox: false,
    title: "Partner Fee Tax",
    titleModal: "Create Partner Fee Tax",
    title: "Integration Partner",
    titleModal: "Integration Partner",
    baseRoute: "/master/integration-partners/3f61b5e0-d7cb-4f80-94e7-83114ff23903/fee-taxes",
    endpoint: "/master/integration-partners/3f61b5e0-d7cb-4f80-94e7-83114ff23903/fee-taxes",
    deleteEndpoint: "/master/batch-actions/delete/fee-tax-types",
    hideDetail: true,
    activationEndpoint: "/master/batch-actions/activate/hotels",
    deactivationEndpoint: "/master/batch-actions/deactivate/hotels",
    columns: [
      {
        title: "Fee Tax",
        data: "fee_tax_type_name"
      },
      {
        title: "Partner Fee Tax Code",
        data: "fee_tax_type_code"
      },
      {
        title: "Partner Fee Tax Name",
        data: "fee_tax_type_name"
      },
    ],
    emptyTable: "No Integration Partner Fee Tax found",
    recordName: ["integration-partner-code", "integration-partner-name"],
  });

  const borderFeeTax = {
      borderRadius: 10,
  };
  const titleText = {
      fontSize: 16,
      color: '#333333',
      paddingTop: 20,
      fontWeight: 600
  };
  const tableTax = {
      paddingLeft: 20
  };

  const data = [
    {
        day: [
            {
                label: "Mon",
                value: true,
            },
            {
                label: "Tue",
                value: true,
            },
            {
                label: "Wed",
                value: true,
            },
            {
                label: "Thu",
                value: true,
            },
            {
                label: "Fri",
                value: true,
            },
            {
                label: "Sat",
                value: false,
            },
            {
                label: "Sun",
                value: false,
            },
        ],
        time: [
            {
                timeStart: "17:00",
            },
            {
                timeEnd: "07:00"
            },
        ]
    },
    {
        day: [
            {
                label: "Mon",
                value: false,
            },
            {
                label: "Tue",
                value: false,
            },
            {
                label: "Wed",
                value: false,
            },
            {
                label: "Thu",
                value: false,
            },
            {
                label: "Fri",
                value: false,
            },
            {
                label: "Sat",
                value: true,
            },
            {
                label: "Sun",
                value: true,
            },
        ],
        time: [
            {
                timeStart: "00:00",
            },
            {
                timeEnd: "24:00"
            },
        ]
    },
  ]

  return (
      <div className="row">
        <div className="col-md-4">

        </div>
        <div className="col-md-7 border" style={borderFeeTax}>
            <h1 style={titleText}>Booking Settings</h1>
            <hr />
            <div className="row">
                <div style={{width: 300, marginLeft: 20}}>
                    <p>Ticketing Time Limit Offset</p>
                    <p style={{paddingTop: 5}}>Ticketing Time Limit Notice Period</p>
                    <p>After Office Hours</p>
                </div>
                <div>
                    <div className="row">
                        <div className="border" style={{width: 60, height: 34, borderRadius: 8,}} >
                            <p style={{textAlign: 'end', width: 45, paddingTop: 2}} >180</p>
                        </div>
                        <p style={{paddingLeft: 5, paddingTop: 2}}>Minutes</p>
                    </div>
                    <div className="row">
                        <div className="border" style={{width: 60, height: 34, borderRadius: 8,}} >
                            <p style={{textAlign: 'end', width: 45, paddingTop: 2}} >240</p>
                        </div>
                        <p style={{paddingLeft: 5, paddingTop: 2}}>Minutes</p>
                    </div>
                    <div>
                        {
                            data.map((el, idx) => {
                                console.log(el);
                                return (
                                    <div key={idx} className="row" >
                                        {
                                            el.day.map((item, index) => {
                                                return (
                                                    <div key={index}>
                                                        <Form>
                                                            <Form.Group>
                                                                <Form.Label style={{fontSize: 13, width: 31}} >{item.label}</Form.Label>
                                                                <Form.Check
                                                                    type="checkbox"
                                                                    checked={item.value}
                                                                />
                                                            </Form.Group>
                                                        </Form>
                                                    </div>
                                                )
                                            })
                                        }
                                        {
                                            el.time.map((item, index) => {
                                                return (
                                                    <div key={index}>
                                                        <div className="border" style={{width: 60, height: 34, borderRadius: 8,}} >
                                                            <p style={{textAlign: 'end', width: 45, paddingTop: 2}} >180</p>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
      </div>
  )
}
