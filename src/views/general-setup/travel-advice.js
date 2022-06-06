import React, { useState } from 'react'
import { Col } from "react-bootstrap"
import createIcon from "assets/icons/create.svg"
import FormInputSelectAjax from "components/form/input-select-ajax"
import {withRouter} from "react-router"
import { Editor } from "react-draft-wysiwyg"
import Api from "config/api"
import FormBuilder from "components/form/builder"
import {OverlayTrigger, Tooltip, Form, Button} from "react-bootstrap"
import TranslationForm from "components/form/translation-form"
import FormAlert from "components/form/alert"
import BBDataTable from "components/table/bb-data-table"

// import Form from "./form";

function TravelAdvice(props) {
    console.log(props, 'props');
    const api = new Api()
    const translationForm = React.createRef()
  const [visibleAdd, setVisibleAdd] = React.useState(false)
  const [formBuilder, setFormBuilder] = useState(null)
  console.log(formBuilder);
  const [translations, setTranslations] = useState(["Indonesia"])
  const [title, setTitle] = React.useState("Travel Advice")
  const [selectedContry, setSelectedContry] = useState(null)
  const [data, setData] = useState(null)
  const [urlText, setUrlText] = useState(null)
  const [description, setDescription] = useState(null)

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

    const fetchData = async() => {
        const url = "/master/configurations/travel-advice"
        let res = await api.get(url)
        console.log(res, '<<<');
        if (res.status === 200) {
            setData(res.data.items)
        }
    }

    React.useEffect(async() => {
        const endpoint = "/master/cities"

        let res = await api.get(endpoint  + "/translations", {
            size: 50,
        })
        setTranslations(res.data.items)
        
    }, [])
    
    React.useEffect(() => {
        fetchData()

    }, [])

    const onSave = async () => {
        // let translated = formBuilder.getTranslations()
        // setLoading(true)
        let api = new Api()
        console.log(urlText);
        try {
            if (!selectedContry) {
                console.log("error");
            }
            let endpoint = "master/configurations/travel-advice"
            let payload = {
                "content_description": {
                  "description": description,
                  "url": urlText
                },
                "content_description_id": "urn:uuid:2aac2d26-81be-d35f-9d4d-38945cbed6f8",
                "country_id": selectedContry
              }
            let res = await api.post(endpoint, payload)
            console.log(res);
        //   if (!form.company_id) {
        //     form.company_id = null
        //   }
        //   if (!form.numeric_code) {
        //     form.numeric_code = null || ""
        //   }
          
        //   if (!form.airline_asset) {
        //     form.airline_asset = null
        //   } else {
        //     if (!form.airline_asset.multimedia_description_id) {
        //       form.airline_asset = null
        //     }
        //   }
    
        //   let res = await api.putOrPost(endpoint, id, form)
        //   setId(res.data.id)
        //   for (let i in translated) {
        //     let tl = translated[i]
        //     let path = endpoint + "/" + res.data.id + "/translations"
        //     await api.putOrPost(path, tl.id, tl)
        //   }
        } catch (e) {
        //   dispatch(
        //     setAlert({
        //       message: `Failed to ${formId ? "update" : "save"} this record.`,
        //     }),
        //   )
        } finally {
        //   setLoading(false)
        //   props.history.goBack()
        //   dispatch(
        //     setAlert({
        //       message: `Record ${form.airline_code} - ${
        //         form.airline_name
        //       } has been successfully ${formId ? "updated" : "saved"}.`,
        //     }),
        //   )
        }
      }

      let params = {
        isCheckbox: false,
        showAdvancedOptions: false,
        createOnModal: false,
        showHistory: false,
        hideCreate: true,
        isHideDownloadLogo: true,
        isHideSearch: false,
        title: "Handler Setup",
        titleModal: "Handler Setup",
        baseRoute: "/master/general-setup",
        endpoint: "/master/configurations/travel-advice",
        deleteEndpoint:
          "/configurations/travel-advice/:id",
        activationEndpoint:
          "/master/batch-actions/activate/configurations/email-senders",
        deactivationEndpoint:
          "/master/batch-actions/deactivate/currency-conversions",
        columns: [
          {
            title: "Country",
            data: "country.country_name",
          },
          {
            title: "URL",
            data: "content_description.url",
          },
        ],
        emptyTable: "No Email Sender found",
        recordName: ["from_display", "from_email"],
        btnDownload: ".buttons-csv",
        module: "handler-setup",
      }


  return (
      <div className="row">
            <div className="border" style={borderFeeTax}>
                <h1 style={titleText}>{title}</h1>
                <hr />
                {
                    visibleAdd === false ?
                        <div className="row" style={{justifyContent: 'space-between', width: '90%', margin: 'auto',}}>
                            <div className="mt-5" >
                                <div style={{width: '100%'}}>
                                    {
                                        data === null ?
                                        <p style={{fontStyle: 'italic'}}>No Travel Advice found</p>
                                        : 
                                        null
                                    }
                                </div>
                            </div>
                            {
                                data === null ?
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
                                : 
                                <div style={{width: '100%'}}>
                                    <Col sm={12}>
                                        <div style={{ marginTop: 22 }}>
                                        <Button
                                            className="btn float-right button-override"
                                            onClick={() => setVisibleAdd(true)}
                                        >
                                            <img src={createIcon} className="mr-1" alt="new" />
                                            Add Travel Advice
                                        </Button>
                                        </div>
                                    </Col>
                                    <BBDataTable
                                        {...params}
                                    />
                                </div>
                            }
                        </div> 
                    :
                    <div style={{background: 'transparent', width: '100%'}}>
                    {/* <FormBuilder
                        onBuild={(el) => console.log(el)}
                        // onSave={onSave}
                        // back={() => {
                        //     // setVisibleAdd(false)
                        //     console.log('Bakc');
                        // }}
                        // translations={translations}
                        // translationFields={translationFields}
                        // background={"transparent"}
                        // alertMessage={"Incomplete data"}
                    > */}
                        <div className="row" style={{ width: '95%', margin: 'auto', }}>
                            <div style={{width: '100%'}}>
                                <FormInputSelectAjax
                                    label="Country"
                                    required={true}
                                    value={selectedContry}
                                    name="country_id"
                                    endpoint="/master/countries"
                                    column="country_name"
                                    filter={`["status", "=", 1]`}
                                    // data={selectedContry}
                                    onChange={(e) =>
                                        {
                                            setSelectedContry(e.target.value)
                                        }
                                    }
                                    type="select"
                                    style={{width: '50%'}}
                                    
                                />
                                <div className="d-flex">
                                    <Form.Label column xs={6} sm={6} md={3} lg={4}>
                                        <p style={{textAlign: 'start', marginLeft: -7}} >URL</p>
                                    </Form.Label>
                                    <Col xs={7} sm={7} md={9} lg={9}>
                                        <Form.Control
                                            type="text"
                                            minLength={1}
                                            maxLength={36}
                                            style={{ maxWidth: 250 }}
                                            value={urlText}
                                            onChange={(e) => setUrlText(e.target.value)}
                                        />
                                    </Col>
                                </div>
                                <div className="row" style={{display: 'flex'}}>
                                    <Col style={{}} >
                                        <p>Description</p>
                                    </Col>
                                    <Col sm={8}>
                                        <Editor
                                            // editorState={description}
                                            toolbarClassName="toolbarClassName"
                                            wrapperClassName="wrapperClassName"
                                            wrapperStyle={wrapperStyle}
                                            editorStyle={editorStyle} 
                                            editorClassName="editorClassName"
                                            // onEditorStateChange={(e) => setDescription(e.target.value)}
                                            toolbarStyle={{background: '#ECECEC 0% 0% no-repeat padding-box'}}
                                            onChange={(e) => setDescription(e.blocks[0].text)}
                                        />
                                    </Col>
                                </div>
                            </div>
                        </div>
                        <TranslationForm
                            ref={translationForm}
                            translations={translations}
                            isView={props.isView}
                            fields={translationFields}
                        />
                        <FormAlert
                            isValid={props.isValid}
                            message={"Incomplete data"}
                        />

                    {/* </FormBuilder> */}
                </div>
                }
            </div>
            <div style={{ marginBottom: 30, marginTop: 30, display: "flex" }}>
                <Button
                    variant="primary"
                    type="submit"
                    // disabled={isSubmitting || !dirty}
                    style={{ marginRight: 15 }}
                    onClick={() => onSave()}
                >
                    SAVE
                </Button>
                <Button variant="secondary" onClick={() => setVisibleAdd(false)}>
                    CANCEL
                </Button>
            </div>
      </div>
  )
}



export default withRouter(TravelAdvice)