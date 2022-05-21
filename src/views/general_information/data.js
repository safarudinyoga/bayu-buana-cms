import React from 'react';
import { Editor } from "react-draft-wysiwyg"
import FormInputControl from "components/form/input-control"

export default function Data() {
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
        <div>
            {
                dummyData.map((el, idx) => {
                    return (
                        <div>
                            <p style={{fontSize: 15}} >{el.name}</p>
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
                            {
                                el.url ?
                                <FormInputControl
                                    label="Hotel Supplier Name"
                                    // value={form.hotel_supplier_name}
                                    name="hotel_supplier_name"
                                    // onChange={(e) =>
                                    //     setForm({...form, hotel_supplier_name: e.target.value})
                                    // }
                                    type="text"
                                    minLength="1"
                                    maxLength="256"
                                />
                                :null
                            }
                        </div>
                    )
                })
            }
        </div>
    )
}