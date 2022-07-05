import React, { useRef, useState } from "react"
import { Form, Tabs, TabPane, Button } from "react-bootstrap"
import { Editor } from "react-draft-wysiwyg"
import { EditorState } from 'draft-js';
import CancelButton from "components/button/cancel"
import Data from "../general_information/data";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Formik } from "formik"
import { setAlert } from "redux/ui-store"
import Hints from "assets/icons/hint.svg"
import { useDispatch } from "react-redux"
import Api from "config/api"
// const [formValues, setFormValues] = useState(null)

const GeneralInformation = (props) => {
  let api = new Api()
  const dispatch = useDispatch()
  const endpoint = `/master/configurations/general-infos`
  const [key, setKey] = useState("CORPORATE CLIENT");
  const importantNoticeRef = useRef(null);
  const [editorImportantNoticeState, setImportantNoticeState] = useState(
    EditorState.createEmpty()
  );
  const [inputData, setInputData] = useState({})
  const MAX_LENGTH = 4000;
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

    const onSubmit = async (values, a) => {
        console.log("submit: ", values)
        // try {
        //   for (let i in values) {
        //     let oca = values[i]
        //     await api.put(endpoint, false, oca)
        //   }
        //   dispatch(
        //     setAlert({
        //       message: `General Information has been successfully updated.`,
        //     }),
        //   )
        // } catch (e) {
        //   dispatch(
        //     setAlert({
        //       message: "Failed to save this record.",
        //     }),
        //   )
        // }
      }

    const _getLengthOfSelectedText = () => {
        const currentSelection = editorImportantNoticeState.getSelection();
        const isCollapsed = currentSelection.isCollapsed();
        console.log(currentSelection, 'selection');
    
        let length = 0;
    
        if (!isCollapsed) {
          const currentContent = editorImportantNoticeState.getCurrentContent();
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
    
    const _handleBeforeInput = () => {
        const currentContent = editorImportantNoticeState.getCurrentContent();
        const currentContentLength = currentContent.getPlainText('').length;
        const selectedTextLength = _getLengthOfSelectedText();
        
        if (currentContentLength > 4000) {
            return 'handled';
        }
    
        if (currentContentLength - selectedTextLength > MAX_LENGTH - 1) {
          console.log('you can type max ten characters');
    
        }
    }
    
    const _handlePastedText = (pastedText) => {
        const currentContent = editorImportantNoticeState.getCurrentContent();
        const currentContentLength = currentContent.getPlainText('').length;
        const selectedTextLength = _getLengthOfSelectedText();
    
        if (currentContentLength + pastedText.length - selectedTextLength > MAX_LENGTH) {
          console.log('you can type max ten characters');
    
          return 'handled';
        }
    }
    
    const _handleChange = (editorState) => {
        setImportantNoticeState(editorState)
    }

    // const initialValues = {
       
    // }
    
    //   console.log("formValues: ", formValues)
      
  return (
    <Formik
        // initialValues={formValues || initialValues}
        onSubmit={onSubmit}
    >
    {({ dirty, handleSubmit, isSubmitting, setFieldValue, values }) => (
    <Form onSubmit={handleSubmit}>
    <div>  
        <div className="row">
            <div className=" border">
                <h1 style={titleText}>General Information</h1>
                <hr />
                <div style={{width: '90%', margin: 'auto'}}>
                    <div>
                        <p>Important Notice
                            <span>
                                <img src={Hints} alt="hint" className="ml-1 mb-2" title={"ticketing"}/>
                            </span> 
                        </p>
                        <Editor
                            ref={importantNoticeRef}
                            editorState={editorImportantNoticeState}
                            toolbarClassName="toolbarClassName"
                            wrapperClassName="wrapperClassName"
                            editorClassName="editorClassName"
                            handleBeforeInput={_handleBeforeInput}
                            handlePastedText={_handlePastedText}
                            onEditorStateChange={_handleChange}
                            wrapperStyle={wrapperStyle}
                            editorStyle={editorStyle} 
                            toolbarStyle={{background: '#ECECEC 0% 0% no-repeat padding-box'}}
                            // setFormValues={setFormValues}
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
        <div
            style={{
            marginBottom: 30,
            marginTop: 30,
            display: "flex",
            }}
        >
        <Button
            variant="primary"
            type="submit"
            style={{ marginRight: 15 }}
            >
            SAVE & NEXT
        </Button>
        <CancelButton />
        </div>
    </div>
    </Form>
        )}
    </Formik>
  )
}

export default GeneralInformation
