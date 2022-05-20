import React, { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { useDispatch } from "react-redux"
import { setUIParams } from "redux/ui-store"
import { Tabs, TabPane, Row } from "react-bootstrap"
import { Editor } from "react-draft-wysiwyg"
import infoIcon from "assets/icons/information.svg"
import { ReactSVG } from "react-svg"
import Data from "../general_information/data";
// import FlightBookSelect from "./flight_book-react-select"
// import FlightBookSuggest from "./flight_book-autosuggest"
// import "./flight_book.css"

const GeneralInformation = (props) => {
  const [key, setKey] = useState("CORPORATE CLIENT");

    const titleText = {
        fontSize: 16,
        color: '#333333',
        paddingTop: 20,
        fontWeight: 600,
        paddingLeft: 10
    };
    const wrapperStyle = {
        border: '1px solid #D3D3D3',
        marginBottom: 20
    };
    const editorStyle = {
        height: "10rem",
    };

    const dummyData = [
        {
            name: "FLIGHT TERMS AND CONDITIONS",
            url: false,
        },
        {
            name: "HOTEL TERMS & CONDITIONS",
            url: false,
        },
        {
            name: "OTHERS TERMS & CONDITIONS",
            url: false,
        },
        {
            name: "PRIVACY POLICY",
            url: false,
        },
        {
            name: "TERMS OF USE",
            url: false,
        },
        {
            name: "IMPORTANT NOTICE",
            url: false,
        },
        {
            name: "NEW NORMAL",
            url: true,
        },
        {
            name: "PASSPORT",
            url: true,
        },
        {
            name: "VISA",
            url: true,
        },
    ];

    

  return (
    <div className="row">
        <div className=" border">
            <h1 style={titleText}>General Information</h1>
            <hr />
            <div style={{width: '90%', margin: 'auto'}}>
                <div>
                    <p>Important Notice</p>
                    <Editor
                        // editorState={editorState}
                        toolbarClassName="toolbarClassName"
                        wrapperClassName="wrapperClassName"
                        editorClassName="editorClassName"
                        wrapperStyle={wrapperStyle}
                        editorStyle={editorStyle} 
                        // onEditorStateChange={this.onEditorStateChange}
                        toolbarStyle={{background: '#ECECEC 0% 0% no-repeat padding-box'}}
                    />
                </div>
                <div>
                    <Tabs
                        id={props.id}
                        activeKey={key}
                        onSelect={(k) => setKey(k)}
                        className={`mb-2`}
                        mountOnEnter={true}
                        unmountOnExit={true}
                    >
                        <TabPane
                        className="m-3"
                        eventKey="CORPORATE CLIENT"
                        title={
                            <div className="d-md-flex flex-row bd-highlight">
                                <span className="ml-md-2 tabs-text" style={{color: key === "CORPORATE CLIENT" ? '#027F71' : '#818181'}} >CORPORATE CLIENT</span>
                            </div>
                        }
                        >
                            <Data />
                        </TabPane>
                        <TabPane
                        className="m-3"
                        eventKey="MEMBER"
                        title={
                            <div className="d-md-flex flex-row">
                                <span className="ml-md-2 tabs-text" style={{color: key === "MEMBER" ? '#027F71' : '#818181'}} >MEMBER</span>
                            </div>
                        }
                        >
                        <Data />
                        </TabPane>
                        <TabPane
                        className="m-3"
                        eventKey="PUBLIC"
                        title={
                            <div className="d-md-flex flex-row">
                                <span className="ml-md-2 tabs-text" style={{color: key === "PUBLIC" ? '#027F71' : '#818181'}} >PUBLIC</span>
                            </div>
                        }
                        >
                        <Data />
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        </div>

    </div>
  )
}

export default GeneralInformation