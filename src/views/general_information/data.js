import React from 'react';
import { Editor } from "react-draft-wysiwyg"
import {withRouter} from "react-router"
import { stateToHTML } from "draft-js-export-html"
import FormInputControl from "components/form/input-control"
import { useDispatch, useSelector } from 'react-redux';
import Hints from "assets/icons/hint.svg"
import { setCorporateClient } from 'redux/ui-store';


const Data = (props) => {
    console.log(props, 'props');
    let dispatch = useDispatch()
    const a = useSelector((a) => a.ui.corporateClient)
    console.log(a, '<<');
    const initialState = JSON.parse('{"entityMap":{},"blocks":[{"key":"1ljs","text":"Initializing from content state","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}]}')
    let corporateTab = {}
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
            code: "flightTerm",
            url: false,
        },
        {
            name: "HOTEL TERMS & CONDITIONS",
            code: "hotelTerm",
            url: false,
        },
        {
            name: "OTHERS TERMS & CONDITIONS",
            code: "otherTerm",
            url: false,
        },
        {
            name: "PRIVACY POLICY",
            code: "privacyPolicy",
            url: false,
        },
        {
            name: "TERMS OF USE",
            code: "termOfUse",
            url: false,
        },
        {
            name: "IMPORTANT NOTICE",
            code: "importantNotice",
            url: false,
        },
        {
            name: "NEW NORMAL",
            code: "newNormal",
            url: true,
        },
        {
            name: "PASSPORT",
            code: "pasport",
            url: true,
        },
        {
            name: "VISA",
            code: "visa",
            url: true,
        },
    ];

    const handleEditorState = (editorState, el) => {
        // console.log(props.tab, el, state);
        const name = props.tab
        const html = stateToHTML(editorState.getCurrentContent())
        if (name === "CORPORATE CLIENT") {
            if (el.code === "flightTerm") {
                corporateTab = {
                    ...corporateTab,
                    flightTerm : html
                }
                // state.corporateClient.flightTerm.value = html
            } 
            if (el.code === "hotelTerm") {
                corporateTab = {
                    ...corporateTab,
                    hotelTerm : html
                }
                // state.corporateClient.hotelTerm.value = html
            }
            if (el.code === "importantNotice") {
                corporateTab = {
                    ...corporateTab,
                    importantNotice: html
                }
                // state.corporateClient.importantNotice.value = html
            }
            if (el.code === "newNormal") {
                corporateTab = {
                    ...corporateTab,
                    newNormal: html
                }
                // state.corporateClient.newNormal.value = html
            }
            if (el.code === "otherTerm") {
                corporateTab = {
                    ...corporateTab,
                    otherTerm: html
                }
                // state.corporateClient.otherTerm.value = html
            }
            if (el.code === "pasport") {
                corporateTab = {
                    ...corporateTab,
                    pasport: html
                }
                // state.corporateClient.pasport.value = html
            }
            if (el.code === "privacyPolicy") {
                corporateTab = {
                    ...corporateTab,
                    privacyPolicy: html
                }
                // state.corporateClient.privacyPolicy.value = html
            }
            if (el.code === "termOfUse") {
                corporateTab = {
                    ...corporateTab,
                    termOfUse: html
                }
                // state.corporateClient.termOfUse.value = html
            }
            if (el.code === "visa") {
                corporateTab = {
                    ...corporateTab,
                    termOfUse: html
                }
                // state.corporateClient.visa.value = html
            }
        }
        console.log(corporateTab);
        dispatch(
            setCorporateClient({
                data: corporateTab
            })
        )
        // props.input(state)
        // // const contentBlock = htmlToDraft(html)
        // // setBodyEmail(html)
        // console.log(html);
        // props.match.params.name = html
    };
    return (
        <div>
            {
                dummyData.map((el, idx) => {
                    return (
                        <div>
                            <p style={{fontSize: 15}} >{el.name}
                                <span>
                                    <img src={Hints} alt="hint" className="ml-1 mb-2" title={"ticketing"}/>
                                </span> 
                            </p>
                            <Editor
                                // editorState={editorState}
                                // value="asdasda"
                                contentState={el.code === a.name ? a.name : ""}
                                toolbarClassName="toolbarClassName"
                                wrapperClassName="wrapperClassName"
                                editorClassName="editorClassName"
                                wrapperStyle={wrapperStyle}
                                editorStyle={editorStyle} 
                                onEditorStateChange={(editorState) => handleEditorState(editorState, el)}
                                toolbarStyle={{background: '#ECECEC 0% 0% no-repeat padding-box'}}
                            />
                            {
                                el.url ?
                                <div style={{width: '100%', paddingLeft: 20}}>
                                    <FormInputControl
                                        label="URL"
                                        // value={form.hotel_supplier_name}
                                        name="url"
                                        // onChange={(e) =>
                                        //     props.data(e.target.value)
                                        // }
                                        minLength="1"
                                        maxLength="256"
                                        hint="URL maximum 33 characters"
                                    />
                                </div>
                                :null
                            }
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Data