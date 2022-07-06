import React, {useState, useRef, useReducer} from 'react';
import { Editor } from "react-draft-wysiwyg"
import {withRouter} from "react-router"
import { stateToHTML } from "draft-js-export-html"
import FormInputControl from "components/form/input-control"
import { useDispatch, useSelector } from 'react-redux';
import { EditorState } from 'draft-js';
import Hints from "assets/icons/hint.svg"
import { setCorporateClient } from 'redux/ui-store';


const Data = (props) => {
    const [, forceUpdate] = useReducer(x => x + 1, 0);
    const importantNoticeRef = useRef(null);
    const MAX_LENGTH = 4000;
    let dispatch = useDispatch()
    const a = useSelector((a) => a.ui.corporateClient);
    const [editorFlightTnc, setEditorFlightTnc] = useState(
        EditorState.createEmpty()
    );
    const [hotelTnc, setHotelTnc] = useState(
        EditorState.createEmpty()
    );
    const [otherTnc, setOtherTnc] = useState(
        EditorState.createEmpty()
    );
    const [privacyPolicy, setPrivacyPolicy] = useState(
        EditorState.createEmpty()
    );
    const [termOfUse, setTermOfUse] = useState(
        EditorState.createEmpty()
    );
    const [importantNotice, setImportantNotice] = useState(
        EditorState.createEmpty()
    );
    const [newNormal, setNewNormal] = useState(
        EditorState.createEmpty()
    );
    const [pasport, setPassport] = useState(
        EditorState.createEmpty()
    );
    const [visa, setVisa] = useState(
        EditorState.createEmpty()
    );
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
        console.log(el);
        const name = props.tab
        const html = stateToHTML(editorState.getCurrentContent())
        const length = editorState.getCurrentContent().getPlainText('').length;
        // setHotelTnc(editorState)
        if (length > 4000) {
            // return 'handled'
        } else {
            // if (name === "CORPORATE CLIENT") {
                if (el.code === "flightTerm") {
                    setEditorFlightTnc(editorState)
                    corporateTab = {
                        ...corporateTab,
                        flightTerm : html
                    }
                    // state.corporateClient.flightTerm.value = html
                } 
                if (el.code === "hotelTerm") {
                    setHotelTnc(editorState)
                    corporateTab = {
                        ...corporateTab,
                        hotelTerm : html
                    }
                    // state.corporateClient.hotelTerm.value = html
                }
                if (el.code === "importantNotice") {
                    setImportantNotice(editorState)
                    corporateTab = {
                        ...corporateTab,
                        importantNotice: html
                    }
                    // state.corporateClient.importantNotice.value = html
                }
                if (el.code === "newNormal") {
                    setNewNormal(editorState)
                    corporateTab = {
                        ...corporateTab,
                        newNormal: html
                    }
                    // state.corporateClient.newNormal.value = html
                }
                if (el.code === "otherTerm") {
                    setOtherTnc(editorState)
                    corporateTab = {
                        ...corporateTab,
                        otherTerm: html
                    }
                    // state.corporateClient.otherTerm.value = html
                }
                if (el.code === "pasport") {
                    setPassport(editorState)
                    corporateTab = {
                        ...corporateTab,
                        pasport: html
                    }
                    // state.corporateClient.pasport.value = html
                }
                if (el.code === "privacyPolicy") {
                    setPrivacyPolicy(editorState)
                    corporateTab = {
                        ...corporateTab,
                        privacyPolicy: html
                    }
                    // state.corporateClient.privacyPolicy.value = html
                }
                if (el.code === "termOfUse") {
                    setTermOfUse(editorState)
                    corporateTab = {
                        ...corporateTab,
                        termOfUse: html
                    }
                    // state.corporateClient.termOfUse.value = html
                }
                if (el.code === "visa") {
                    setVisa(editorState)
                    corporateTab = {
                        ...corporateTab,
                        termOfUse: html
                    }
                    // state.corporateClient.visa.value = html
                // }
            }
        }
        dispatch(
            setCorporateClient({
                data: corporateTab
            })
        )
        forceUpdate()
        // props.input(state)
        // // const contentBlock = htmlToDraft(html)
        // // setBodyEmail(html)
        // console.log(html);
        // props.match.params.name = html
    };

    const _getLengthOfSelectedText = () => {
        const currentSelection = editorFlightTnc.getSelection();
        const isCollapsed = currentSelection.isCollapsed();
    
        let length = 0;
    
        if (!isCollapsed) {
          const currentContent = editorFlightTnc.getCurrentContent();
          const startKey = currentSelection.getStartKey();
          const endKey = currentSelection.getEndKey();
          const startBlock = currentContent.getBlockForKey(startKey);
          const isStartAndEndBlockAreTheSame = startKey === endKey;
          const startBlockTextLength = startBlock.getLength();
          const startSelectedTextLength = startBlockTextLength - currentSelection.getStartOffset();
          const endSelectedTextLength = currentSelection.getEndOffset();
          const keyAfterEnd = currentContent.getKeyAfter(endKey);
          console.log(currentSelection)
          if (isStartAndEndBlockAreTheSame) {
            length += currentSelection.getEndOffset() - currentSelection.getStartOffset();
          } else {
            let currentKey = startKey;
    
            while (currentKey && currentKey !== keyAfterEnd) {
              if (currentKey === startKey) {
                length += startSelectedTextLength + 1;
              } else if (currentKey === endKey) {
                length += endSelectedTextLength;
              } else {
                length += currentContent.getBlockForKey(currentKey).getLength() + 1;
              }
    
              currentKey = currentContent.getKeyAfter(currentKey);
            };
          }
        }
    
        return length;
    }
    
    const _handleBeforeInput = (el) => {
        console.log(el);
        const currentContent = editorFlightTnc.getCurrentContent();
        const currentContentLength = currentContent.getPlainText('').length;
        const selectedTextLength = _getLengthOfSelectedText();
        const textinput = currentContent.getPlainText()
        console.log(textinput);
        console.log(currentContentLength, 'before input');

        if (currentContentLength > 40) {
            return 'handled';
        }
    
        if (currentContentLength - selectedTextLength > MAX_LENGTH - 1) {
          console.log('you can type max ten characters');
    
          return 'handled';
        }
    }
    
    const _handlePastedText = (pastedText) => {
        console.log(pastedText);
        const currentContent = editorFlightTnc.getCurrentContent();
        const currentContentLength = currentContent.getPlainText('').length;
        const selectedTextLength = _getLengthOfSelectedText();
    
        if (currentContentLength + pastedText.length - selectedTextLength > MAX_LENGTH) {
          console.log('you can type max ten characters');
    
          return 'handled';
        }
    }
    
    const _handleChange = (editorState) => {
        setEditorFlightTnc(editorState)
    }
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
                            {
                                el.code === "flightTerm" ?
                                    <Editor
                                        ref={importantNoticeRef}
                                        editorState={editorFlightTnc}
                                        toolbarClassName="toolbarClassName"
                                        wrapperClassName="wrapperClassName"
                                        editorClassName="editorClassName"
                                        handleBeforeInput={() => _handleBeforeInput(el)}
                                        handlePastedText={_handlePastedText}
                                        // onEditorStateChange={_handleChange}
                                        wrapperStyle={wrapperStyle}
                                        editorStyle={editorStyle} 
                                        onEditorStateChange={(editorState) => handleEditorState(editorState, el)}
                                        toolbarStyle={{background: '#ECECEC 0% 0% no-repeat padding-box'}}
                                    />
                                : el.code === "hotelTerm" ?
                                    <Editor
                                        ref={importantNoticeRef}
                                        editorState={hotelTnc}
                                        toolbarClassName="toolbarClassName"
                                        wrapperClassName="wrapperClassName"
                                        editorClassName="editorClassName"
                                        handleBeforeInput={() => _handleBeforeInput(el)}
                                        handlePastedText={_handlePastedText}
                                        // onEditorStateChange={_handleChange}
                                        wrapperStyle={wrapperStyle}
                                        editorStyle={editorStyle} 
                                        onEditorStateChange={(editorState) => handleEditorState(editorState, el)}
                                        toolbarStyle={{background: '#ECECEC 0% 0% no-repeat padding-box'}}
                                    />
                                : el.code === "otherTerm" ?
                                    <Editor
                                        ref={importantNoticeRef}
                                        editorState={otherTnc}
                                        toolbarClassName="toolbarClassName"
                                        wrapperClassName="wrapperClassName"
                                        editorClassName="editorClassName"
                                        handleBeforeInput={() => _handleBeforeInput(el)}
                                        handlePastedText={_handlePastedText}
                                        // onEditorStateChange={_handleChange}
                                        wrapperStyle={wrapperStyle}
                                        editorStyle={editorStyle} 
                                        onEditorStateChange={(editorState) => handleEditorState(editorState, el)}
                                        toolbarStyle={{background: '#ECECEC 0% 0% no-repeat padding-box'}}
                                    />
                                : el.code === "privacyPolicy" ?
                                    <Editor
                                        ref={importantNoticeRef}
                                        editorState={privacyPolicy}
                                        toolbarClassName="toolbarClassName"
                                        wrapperClassName="wrapperClassName"
                                        editorClassName="editorClassName"
                                        handleBeforeInput={() => _handleBeforeInput(el)}
                                        handlePastedText={_handlePastedText}
                                        // onEditorStateChange={_handleChange}
                                        wrapperStyle={wrapperStyle}
                                        editorStyle={editorStyle} 
                                        onEditorStateChange={(editorState) => handleEditorState(editorState, el)}
                                        toolbarStyle={{background: '#ECECEC 0% 0% no-repeat padding-box'}}
                                    />
                                : el.code === "termOfUse" ?
                                    <Editor
                                        ref={importantNoticeRef}
                                        editorState={termOfUse}
                                        toolbarClassName="toolbarClassName"
                                        wrapperClassName="wrapperClassName"
                                        editorClassName="editorClassName"
                                        handleBeforeInput={() => _handleBeforeInput(el)}
                                        handlePastedText={_handlePastedText}
                                        // onEditorStateChange={_handleChange}
                                        wrapperStyle={wrapperStyle}
                                        editorStyle={editorStyle} 
                                        onEditorStateChange={(editorState) => handleEditorState(editorState, el)}
                                        toolbarStyle={{background: '#ECECEC 0% 0% no-repeat padding-box'}}
                                    />
                                : el.code === "importantNotice" ?
                                    <Editor
                                        ref={importantNoticeRef}
                                        editorState={importantNotice}
                                        toolbarClassName="toolbarClassName"
                                        wrapperClassName="wrapperClassName"
                                        editorClassName="editorClassName"
                                        handleBeforeInput={() => _handleBeforeInput(el)}
                                        handlePastedText={_handlePastedText}
                                        // onEditorStateChange={_handleChange}
                                        wrapperStyle={wrapperStyle}
                                        editorStyle={editorStyle} 
                                        onEditorStateChange={(editorState) => handleEditorState(editorState, el)}
                                        toolbarStyle={{background: '#ECECEC 0% 0% no-repeat padding-box'}}
                                    />  
                                : el.code === "newNormal" ?
                                    <Editor
                                        ref={importantNoticeRef}
                                        editorState={newNormal}
                                        toolbarClassName="toolbarClassName"
                                        wrapperClassName="wrapperClassName"
                                        editorClassName="editorClassName"
                                        handleBeforeInput={() => _handleBeforeInput(el)}
                                        handlePastedText={_handlePastedText}
                                        // onEditorStateChange={_handleChange}
                                        wrapperStyle={wrapperStyle}
                                        editorStyle={editorStyle} 
                                        onEditorStateChange={(editorState) => handleEditorState(editorState, el)}
                                        toolbarStyle={{background: '#ECECEC 0% 0% no-repeat padding-box'}}
                                    />
                                : el.code === "passport" ?
                                    <Editor
                                        ref={importantNoticeRef}
                                        editorState={pasport}
                                        toolbarClassName="toolbarClassName"
                                        wrapperClassName="wrapperClassName"
                                        editorClassName="editorClassName"
                                        handleBeforeInput={() => _handleBeforeInput(el)}
                                        handlePastedText={_handlePastedText}
                                        // onEditorStateChange={_handleChange}
                                        wrapperStyle={wrapperStyle}
                                        editorStyle={editorStyle} 
                                        onEditorStateChange={(editorState) => handleEditorState(editorState, el)}
                                        toolbarStyle={{background: '#ECECEC 0% 0% no-repeat padding-box'}}
                                    />
                                : el.code === "visa" ?
                                    <Editor
                                        ref={importantNoticeRef}
                                        editorState={visa}
                                        toolbarClassName="toolbarClassName"
                                        wrapperClassName="wrapperClassName"
                                        editorClassName="editorClassName"
                                        handleBeforeInput={() => _handleBeforeInput(el)}
                                        handlePastedText={_handlePastedText}
                                        // onEditorStateChange={_handleChange}
                                        wrapperStyle={wrapperStyle}
                                        editorStyle={editorStyle} 
                                        onEditorStateChange={(editorState) => handleEditorState(editorState, el)}
                                        toolbarStyle={{background: '#ECECEC 0% 0% no-repeat padding-box'}}
                                    />
                                    : el.code === "pasport" ?
                                        <Editor
                                            ref={importantNoticeRef}
                                            editorState={pasport}
                                            toolbarClassName="toolbarClassName"
                                            wrapperClassName="wrapperClassName"
                                            editorClassName="editorClassName"
                                            handleBeforeInput={() => _handleBeforeInput(el)}
                                            handlePastedText={_handlePastedText}
                                            // onEditorStateChange={_handleChange}
                                            wrapperStyle={wrapperStyle}
                                            editorStyle={editorStyle} 
                                            onEditorStateChange={(editorState) => handleEditorState(editorState, el)}
                                            toolbarStyle={{background: '#ECECEC 0% 0% no-repeat padding-box'}}
                                        />
                                    :null

                            }
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