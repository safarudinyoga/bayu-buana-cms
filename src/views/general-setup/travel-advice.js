import BBDataTable from "components/table/bb-data-table"
import rowStatus from "lib/row-status"
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setUIParams } from "redux/ui-store"
import { Card, Form, Row, Col, Button, Modal } from "react-bootstrap"
import createIcon from "assets/icons/create.svg"
import FormInputSelectAjax from "components/form/input-select-ajax"
import {withRouter} from "react-router"
import { Editor } from "react-draft-wysiwyg"
import Api from "config/api"
import FormBuilder from "components/form/builder"
import TranslationForm from "components/form/translation-form"
import FormAlert from "components/form/alert"
import {OverlayTrigger, Tooltip} from "react-bootstrap"
// import Form from "./form";

function TravelAdvice(props) {
    const api = new Api()
  const [visibleAdd, setVisibleAdd] = React.useState(false)
  const [formBuilder, setFormBuilder] = useState(null)
  const [translations, setTranslations] = useState(["Indonesia"])
  const [title, setTitle] = React.useState("Travel Advice")
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
  const translationFields = [
    {
      label: "URL",
      name: "URL",
      type: "text",
    },
    {
      label: "Description",
      name: "Description",
      type: "richtext",
    },
  ]

  const borderFeeTax = {
      borderRadius: 10,
      width: '100%'
  };
  const titleText = {
      fontSize: 16,
      color: '#333333',
      paddingTop: 20,
      fontWeight: 600,
      paddingLeft: 10
  };
  const tableTax = {
      paddingLeft: 20
  };

    const wrapperStyle = {
        border: '1px solid #D3D3D3',
        marginBottom: 20
    }
    const editorStyle = {
        height: "10rem",
    }

    React.useEffect(async() => {
        const endpoint = "/master/cities"

        let res = await api.get(endpoint  + "/translations", {
            size: 50,
          })
        //   setTranslations(res.data.items)
    }, [])


  return (
      <div className="row">
            <div className="border" style={borderFeeTax}>
                <h1 style={titleText}>{title}</h1>
                <hr />
                {
                    visibleAdd === false ?
                        <div className="row" style={{justifyContent: 'space-between', width: '90%', margin: 'auto',}}>
                            <div className="mt-5" >
                                <p style={{fontStyle: 'italic'}}>No Travel Advice found</p>
                            </div>
                            <OverlayTrigger
                                placement="top"
                                overlay={<Tooltip>Click to create</Tooltip>}
                            >
                                <button
                                    type="button"
                                    // onClick={this.handleClick.bind(this)}
                                    onClick={() => {
                                        setVisibleAdd(true)
                                        setTitle("Create New Travel Advice")
                                    }}
                                    className="btn btn-warning float-right button-new"
                                >
                                    <img src={createIcon} className="mr-1" alt="new" />
                                    Add Travel Advice
                                </button>
                            </OverlayTrigger>
                        </div> 
                    :
                    <div style={{background: 'transparent', width: '100%'}}>
                    <FormBuilder
                        translations={translations}
                        translationFields={translationFields}
                        background={"transparent"}
                        alertMessage={"Incomplete data"}
                        back={() => {
                            setVisibleAdd(false)
                        }}
                    >
                        <div className="row" style={{ width: '140%', margin: 'auto', }}>
                            <div style={{width: '100%'}}>
                                <FormInputSelectAjax
                                    label="Country"
                                    required={true}
                                    // value={form.country_id}
                                    name="country_id"
                                    endpoint="/master/countries"
                                    column="country_name"
                                    filter={`["status", "=", 1]`}
                                    // data={countryData}
                                    // onChange={(e) =>
                                    //     setForm({...form, country_id: e.target.value || null})
                                    // }
                                    type="select"
                                    style={{width: '50%'}}
                                />
                                <FormInputSelectAjax
                                    label="URL"
                                    // value={form.country_id}
                                    name="country_id"
                                    endpoint="/master/countries"
                                    column="country_name"
                                    filter={`["status", "=", 1]`}
                                    // data={countryData}
                                    // onChange={(e) =>
                                    //     setForm({...form, country_id: e.target.value || null})
                                    // }
                                    type="select"
                                    style={{width: '50%',}}
                                />
                                <div className="row" style={{display: 'flex'}}>
                                    <Col style={{}} >
                                        <p>Description</p>
                                    </Col>
                                    <Col sm={8}>
                                        <Editor
                                            // editorState={editorState}
                                            toolbarClassName="toolbarClassName"
                                            wrapperClassName="wrapperClassName"
                                            wrapperStyle={wrapperStyle}
                                            editorStyle={editorStyle} 
                                            editorClassName="editorClassName"
                                            // onEditorStateChange={this.onEditorStateChange}
                                            toolbarStyle={{background: '#ECECEC 0% 0% no-repeat padding-box'}}
                                        />
                                    </Col>
                                </div>
                            </div>
                    </div>
                </FormBuilder>
                </div>
                }
            </div>
      </div>
  )
}



export default withRouter(TravelAdvice)