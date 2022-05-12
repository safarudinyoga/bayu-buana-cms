import React, { useEffect } from 'react';
import {
    Card,
    Form,
    Row,
    Col,
    Button,
    Image,
    Tab,
    Nav,
    Modal,
    OverlayTrigger,
    Tooltip
} from "react-bootstrap"
import { useHistory } from 'react-router';
import createIcon from "assets/icons/create.svg";
import FormInputControl from "components/form/input-control";
import Switch from "react-switch"
import rowStatus from "lib/row-status"
import { renderColumn } from "lib/translation"
import moment from "moment"
import { withRouter } from "react-router"
// import ModalCreate from 'components/Modal/bb-modal';
import ModalForm from './modalCreate'
import Api from "config/api"
import env from "config/environment"
import useQuery from "lib/query"
import axios from "axios"
import { useDispatch } from "react-redux"
import BBDataTable from "components/table/bb-data-table"

const endpoint = "/master/integration-partner-hotels"
const backUrl = "/master/integration-partner-hotels"


function GeneralInformation(props) {
    let dispatch = useDispatch()
    // let formId = props.match.params.id
    console.log(props, ' form <<<');
    let api = new Api()
    const history = useHistory()
    const isView = useQuery().get("action") === "view"
    console.log(isView, 'is view');
    const [title, setTitile] = React.useState("")
    const [isHotelCode, setIsHotelCode] = React.useState("")
    const [isHotelInformation, setIsHotelInformation] = React.useState("")
    const [isHotelCodeBool, setIsHotelCodeBool] = React.useState(false)
    const [isEnabled, setIsEnabled] = React.useState(false)
    const [isHotelInformationBool, setIsHotelInformationBool] = React.useState(false)
    const [visibleRoomModal, setVisibleRoomModal] = React.useState(false);
    const [hotelName, setHotelName] = React.useState("")
    const [hotelCode, setHotelCode] = React.useState("")
    const [partnerHotelName, setPartnerHotelName] = React.useState("")
    const [enableHotel, setEnableHotel] = React.useState(false)
    const borderFeeTax = {
        borderRadius: 10,
    };
    const titleText = {
        fontSize: 16,
        color: '#333333',
        paddingTop: 20,
        fontWeight: 800
    };
    const tableTax = {
        paddingLeft: 20,
    }

    const handleOnSubmit = async(e) => {
        e.preventDefault()
        console.log(hotelName, hotelCode, partnerHotelName, enableHotel, title);
        if (title === "Edit Partner Hotels") {
            const payload = {
                "availability_status_enabled": true,
                "booking_advanced_offset_enabled": false,
                "closed_on_arrival_enabled": true,
                "closed_on_departure_enabled": true,
                "comment": "proident esse et enim",
                "currency_id": "aff23bc9-d6f4-e664-f9b6-7d8a34f2b709",
                "extranet_password": "eiusmod esse ut incididunt magna",
                "extranet_url": "Excepteur ut laborum ipsum qui",
                "extranet_user_name": "eu fugiat",
                "hotel_code": hotelCode,
                "hotel_code_enabled": true,
                "hotel_details": "in est dolor nostrud",
                "hotel_id": "urn:uuid:e99590da-773c-6713-5e60-d4a390ce2b97",
                "hotel_information_enabled": true,
                "hotel_name": hotelName,
                "integration_partner_id": "68fe53b9-2375-964f-ac15-42712754ff47",
                "is_enabled": true,
                "is_primary": false,
                "length_of_stay_enabled": true,
                "reservation_enabled": true,
                "room_availability_enabled": true,
                "room_rate_enabled": false,
                "web_service_password": "culpa",
                "web_service_user_name": "reprehenderit aute nostrud velit"
            }
            return new Promise((resolve, rejecet) => {
                axios.put(api.env.endpoint(`/master/integration-partner-hotels/${props.match.params.id}`), payload)
                    .then((res) => {
                        console.log(res);
                        props.history.goBack()
                    })
                    .catch((error) => {
                        console.log(error);
                        resolve(false)
                    })
            })
        } else {
            const payload = {
                "id": "0291dab3-63b0-4131-8b7c-59782fadb65a",
                "sort": 3,
                "status": 1,
                "created_at": "2022-04-13T08:27:49.323Z",
                "updated_at": "2022-04-13T08:27:49.323Z",
                "integration_partner_id": "ae5b3a42-9f4f-9dba-11f2-79ed9504a8a3",
                "hotel_id": "6ff81d6f-e6ce-0695-5754-914f16a8c689",
                "web_service_user_name": "<string>",
                "web_service_password": "<string>",
                "hotel_code": hotelCode,
                "hotel_name": hotelName,
                "currency_id": "50384143-7c4c-69b7-21b4-23a17c140c80",
                "extranet_url": "<string>",
                "extranet_user_name": "<string>",
                "extranet_password": "<string>",
                "room_rate_enabled": true,
                "room_availability_enabled": true,
                "closed_on_arrival_enabled": true,
                "closed_on_departure_enabled": true,
                "length_of_stay_enabled": true,
                "booking_advanced_offset_enabled": true,
                "availability_status_enabled": true,
                "reservation_enabled": true,
                "hotel_code_enabled": true,
                "hotel_information_enabled": true,
                "is_enabled": enableHotel,
                "is_primary": true,
                "hotel_details": "<string>",
                "comment": "<string>"
            }
            return new Promise((resolve, rejecet) => {
                axios.post(api.env.endpoint("/master/integration-partner-hotels"), payload)
                    .then((res) => {
                        props.history.goBack()
                    })
                    .catch((error) => {
                        resolve(false)
                    })
            })
        }
    }
    useEffect(async() => {
        let formId = props.match.params.id
        console.log(formId);
        if (formId) {
            try {
                let res = await api.get(endpoint + "/" + formId)
                console.log(res, "cek sini >>>");
                if (res.data) {
                    setHotelName(res.data.hotel_name)
                    setHotelCode(res.data.hotel_code)
                    setPartnerHotelName(res.data.hotel_name)
                    setIsHotelCodeBool(res.data.hotel_code_enabled)
                    setIsHotelInformationBool(res.data.hotel_information_enabled)
                    setIsEnabled(res.data.is_enabled)
                    if (res.data.hotel_code_enabled) {
                        setIsHotelCode("Hotel Code")
                    } 
                    if (res.data.hotel_information_enabled) {
                        setIsHotelInformation("Hotel Information")
                    }
                }
                let docTitle = "Edit Partner Hotels"
                if (!formId) {
                    docTitle = "Create Partner Hotels"
                } else if (isView) {
                    docTitle = "Partner Hotels Details"
                }
                setTitile(docTitle)
            } catch (e) {}
          } else {
          }
    }, [])

    let [paramsEdit, setParamsEdit] = React.useState({
        isCheckbox: false,
        module: "room",
        showAdvancedOptions: false,
        responsiveTablet: true,
        hideDetail: true,
        createOnModal: true,
        title: "Room Type",
        titleModal: "master/ Room Type",
        baseRoute: "/master/integration-partner-hotel-room-types/form",
        endpoint: "/master/integration-partner-hotel-room-types",
        deleteEndpoint: "/master/batch-actions/delete/offices",
        activationEndpoint: "/master/batch-actions/activate/offices",
        deactivationEndpoint: "/master/batch-actions/deactivate/offices",
        columns: [
        {
            title: "Room Type",
            data: "room_type_name",
        },
        {
            title: "Partner Room Type Code",
            data: "room_type_code",
        },
        {
            title: "Partner Room Type Name",
            data: "room_type_name",
        },
        ],
        emptyTable: "No offices found",
        recordName: "office_name",
        isOpenNewTab: false,
      })
    let [paramsDetail, setParamsDetail] = React.useState({
        isCheckbox: false,
        module: "room",
        showAdvancedOptions: false,
        createOnModal: true,
        responsiveTablet: true,
        title: "Room Type",
        titleModal: "master/ Room Type",
        baseRoute: "/master/integration-partner-hotel-room-types/form",
        endpoint: "/master/integration-partner-hotel-room-types",
        deleteEndpoint: "/master/batch-actions/delete/offices",
        activationEndpoint: "/master/batch-actions/activate/offices",
        deactivationEndpoint: "/master/batch-actions/deactivate/offices",
        columns: [
        {
            title: "Room Type",
            data: "room_type_name",
        },
        {
            title: "Partner Room Type Code",
            data: "room_type_code",
        },
        {
            title: "Partner Room Type Name",
            data: "room_type_name",
        },
        ],
        emptyTable: "No offices found",
        recordName: "office_name",
        isOpenNewTab: false,
    })
    return (
    <div style={{display: 'flex', width: '100%'}}>
        <div className="col-md-4">

        </div>
        <Form style={{width: '100%'}} onSubmit={handleOnSubmit} >
            <div className="border" style={borderFeeTax}>
                <div style={{paddingLeft: 20}}>
                    <h1 style={titleText}>{title || "Create Partner Hotels"}</h1>
                    <hr style={{width: '90%', marginLeft: 0}} />
                    <div style={tableTax} className="row">
                        <div>
                            <p style={{minHeight: 32,}}>
                                Hotel
                                <span className="form-label-required">*</span>
                            </p>
                            <p style={{minHeight: 32,}}>
                                Partner Hotel Code
                                <span className="form-label-required">*</span>
                            </p>
                            <p style={{minHeight: 32,}}>
                                Partner Hotel Name
                                <span className="form-label-required">*</span>
                            </p>
                            <p style={{minHeight: 32,}}>
                                Enabled
                                <span className="form-label-required">*</span>
                            </p>
                        </div>
                        <div style={{textAlignLast: "start", alignItems: 'start', alignSelf: 'start'}}>
                            <div>
                                <FormInputControl
                                    value={hotelName}          
                                    onChange={(e) => isView ? null : setHotelName(e.target.value)}
                                    type="text"
                                    minLength="1"
                                    maxLength="256"
                                    style={{width: "25vw", height: 34, marginLeft: "-8%"}}
                                />
                                <FormInputControl
                                    value={hotelCode}          
                                    onChange={(e) => isView ? null : setHotelCode(e.target.value)}
                                    type="text"
                                    minLength="1"
                                    maxLength="256"
                                    style={{width: "20vw", height: 34, marginLeft: "-8%"}}
                                />
                                <FormInputControl
                                    value={partnerHotelName}          
                                    onChange={(e) => isView ? null : setPartnerHotelName(e.target.value)}
                                    type="text"
                                    minLength="1"
                                    maxLength="256"
                                    style={{width: "25vw", height: 34, marginLeft: "-8%", marginBottom: 10}}
                                />
                                <div style={{alignSelf: 'center', alignItems: 'center', marginLeft: "30%"}}>
                                    {
                                        !isView ?
                                            <Switch
                                                checked={isHotelCodeBool}
                                                onChange={() => isHotelCodeBool ? setIsHotelCodeBool(false) : setIsHotelCodeBool(true)}
                                                offColor={"#818181"}
                                                offHandleColor={"#fff"}
                                                onColor={"#89BCB6"}
                                                onHandleColor={"#027F71"}
                                                checkedIcon={false}
                                                uncheckedIcon={false}
                                                height={14}
                                                width={34}
                                                handleDiameter={17}
                                                boxShadow={'1px 1px 10px 0px #ebebeb'}
                                            /> :
                                            <div style={{marginLeft: -5}}>
                                                <p style={{fontSize: 15}}>{isHotelCode || ""}</p>
                                                <p style={{fontSize: 15}}>{isHotelInformation || ""}</p>
                                            </div>
                                    }
                                    {
                                        isHotelCodeBool && props.match.params.id !== undefined && !isView ?
                                        <div style={{marginLeft: 10}}>
                                            <Form.Check
                                                inline
                                                label={isHotelCode || ""}
                                                type={"checkbox"}
                                                id="custom-inline-checkbox-remember"
                                                onChange={() => setIsHotelCodeBool(isHotelCodeBool ? false : true)}
                                                checked={isHotelCodeBool}
                                            />
                                            <Form.Check
                                                inline
                                                label={isHotelInformation || ""}
                                                type={"checkbox"}
                                                id="custom-inline-checkbox-remember"
                                                onChange={() => setIsHotelInformationBool(isHotelInformationBool ? false : true)}
                                                checked={isHotelInformationBool}
                                            />
                                        </div>
                                        :null
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <Modal.Footer>
                        <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip>Click to create</Tooltip>}
                            >
                            <button
                                type="button"
                                onClick={() => setVisibleRoomModal(true)}
                                className="btn btn-warning float-right button-new"
                            >
                                <img src={createIcon} className="mr-1" alt="new" />
                                Add Partner Room Type
                            </button>
                        </OverlayTrigger>
                    </Modal.Footer>
                    <div>
                        {
                            title === "Edit Partner Hotels" ?
                            <BBDataTable {...paramsEdit} />
                            : title === "Partner Hotels Details" ?
                            <BBDataTable {...paramsDetail} /> 
                            : null
                        }
                    </div>
                </div>
            </div>
            <div className="row" style={{marginTop: 20, justifyContent: 'space-between', width: '9rem', marginLeft: 2}} >
                {
                    !isView ?
                    <Button variant="primary" type="submit">
                        SAVE
                    </Button>:null
                }
                <Button variant="secondary" onClick={() => history.goBack()}>
                    CANCEL
                </Button>
            </div>
        </Form>
        {
            visibleRoomModal ?
            <ModalCreate
                show={visibleRoomModal}
                onClick={() => setVisibleRoomModal(false)}
                modalTitle={"CREATE ROOM TYPE"}
                modalContent={ModalForm}
                handleSubmit={() => console.log("ok")}
            />
            :null
        }
    </div>
    )
};

export default withRouter(GeneralInformation)