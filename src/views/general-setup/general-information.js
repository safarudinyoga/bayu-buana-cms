import React, { useRef, useState } from "react"
import { Tabs, TabPane } from "react-bootstrap"
import { Editor } from "react-draft-wysiwyg"
import { EditorState } from 'draft-js';
import Data from "../general_information/data";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const GeneralInformation = (props) => {
  const [key, setKey] = useState("CORPORATE CLIENT");
  const importantNoticeRef = useRef(null);
  const [editorImportantNoticeState, setImportantNoticeState] = useState(
    EditorState.createEmpty()
  );
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

    const _getLengthOfSelectedText = () => {
        const currentSelection = editorImportantNoticeState.getSelection();
        const isCollapsed = currentSelection.isCollapsed();
    
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
    
        if (currentContentLength - selectedTextLength > MAX_LENGTH - 1) {
          console.log('you can type max ten characters');
    
          return 'handled';
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
  return (
    <div className="row">
        <div className=" border">
            <h1 style={titleText}>General Information</h1>
            <hr />
            <div style={{width: '90%', margin: 'auto'}}>
                <div>
                    <p>Important Notice</p>
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