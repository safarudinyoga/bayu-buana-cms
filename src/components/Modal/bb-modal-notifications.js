import React, { useState } from "react";
import { Button, Col, Modal, ModalBody, ModalFooter, Form } from "react-bootstrap";
import CancelButton from "components/button/cancel";
import "./bb-modal.css";
import SelectAsync from "components/form/select-async";
import upIcon from "assets/icons/double-up.svg"
import downIcon from "assets/icons/double-down.svg"

const ModalNotifications = ({ show, onClick, modalContent, modalTitle, modalSize, scrollable = false }) => {
    const Content = modalContent;
    const [filter, showFilter] = useState(false);
    return (
        <Modal size={modalSize} show={show} onHide={onClick} aria-labelledby="contained-modal-title-vcenter" centered dialogClassName={!modalSize ? "bb-modal-dialog" : ""} scrollable="true">
            <Modal.Header closeButton className="bb-modal-header"></Modal.Header>
            <Modal.Header className="bb-modal-subheader" style={{ textAlign: "center" }}>
                <div className="bb-modal-subtitle">Notifications</div>
				<div onClick={() => showFilter(!filter)} style={{cursor: "pointer"}}>
					<button className="bb-modal-subtitle" style={{ fontSize: 14 }}>
						Filter
					</button>
					{filter ? (
						<img src={upIcon} alt="up" />
					) : (
						<img src={downIcon} alt="down" />
					)}
				</div>
                {filter && (
                    <div className="bb-modal-content-notification">
                        <div className="bb-modal-content-value value-grey-filter">
                            <div className="col-6">
                                <div className="bb-modal-filter-title">Category</div>
                                <div className="colomn-filter">
                                    <Form.Check type="checkbox" name="workingDays" id="workingDays" label="Newsletter" />
                                    <Form.Check type="checkbox" name="workingDays" id="workingDays" label="Survey" />
                                    <Form.Check type="checkbox" name="workingDays" id="workingDays" label="Post-Departure" />
                                    <Form.Check type="checkbox" name="workingDays" id="workingDays" label="Pre-Arrival" />
                                    <Form.Check type="checkbox" name="workingDays" id="workingDays" label="Booking Confirmation" />
                                </div>
                            </div>
                            <div className="col-6" style={{ marginLeft: 20 }}>
                                <div className="bb-modal-filter-title">Read Status</div>
                                <div className="colomn-filter">
                                    <SelectAsync
                                        isClearable
                                        isDisabled={false}
                                        url={`master/job-titles`}
                                        fieldName="job_title_name"
                                        //   onChange={(v) => {
                                        //     setFieldValue("job_title", v)
                                        //   }}
                                        placeholder="Please choose"
                                        //   className={`react-select ${
                                        //     form.touched.job_title &&
                                        //     form.errors.job_title
                                        //       ? "is-invalid"
                                        //       : null
                                        //   }`}
                                        components={{
                                            DropdownIndicator: () => null,
                                            IndicatorSeparator: () => null,
                                        }}
                                    />
                                </div>
                                <div
                                    style={{
                                        marginBottom: 10,
                                        marginTop: 50,
                                        display: "flex",
                                        justifyContent: "right",
                                        marginRight: 30,
                                    }}
                                >
                                    <Button variant="primary" type="submit" style={{ marginRight: 15 }}>
                                        SAVE
                                    </Button>
                                    <CancelButton />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </Modal.Header>
            <ModalBody className="bb-modal-body">
                <div className="bb-modal-content-notification">
                    <div className="bb-modal-content-date">June 2020</div>
                    <div className="bb-modal-content-value value-grey">
                        <div className="value-date">31 Jun</div>
                        <div className="value-message">
                            <div className="value-message-title">Point Earned</div>
                            <div className="value-message-content">Point Earned Point Earned Point Earned Point Earned Point Earned Point Earned Point Earned Point Earned</div>
                        </div>
                    </div>
                    <div className="bb-modal-content-value value-white">
                        <div className="value-date">31 Jun</div>
                        <div className="value-message">
                            <div className="value-message-title">Point Earned</div>
                            <div className="value-message-content">Point Earned Point Earned Point Earned Point Earned Point Earned Point Earned Point Earned Point Earned</div>
                        </div>
                    </div>
                </div>
                <div className="bb-modal-content-notification">
                    <div className="bb-modal-content-date">June 2020</div>
                    <div className="bb-modal-content-value value-grey">
                        <div className="value-date">31 Jun</div>
                        <div className="value-message">
                            <div className="value-message-title">Point Earned</div>
                            <div className="value-message-content">Point Earned Point Earned Point Earned Point Earned Point Earned Point Earned Point Earned Point Earned</div>
                        </div>
                    </div>
                    <div className="bb-modal-content-value value-white">
                        <div className="value-date">31 Jun</div>
                        <div className="value-message">
                            <div className="value-message-title">Point Earned</div>
                            <div className="value-message-content">Point Earned Point Earned Point Earned Point Earned Point Earned Point Earned Point Earned Point Earned</div>
                        </div>
                    </div>
                </div>
                <div className="bb-modal-content-notification">
                    <div className="bb-modal-content-date">June 2020</div>
                    <div className="bb-modal-content-value value-grey">
                        <div className="value-date">31 Jun</div>
                        <div className="value-message">
                            <div className="value-message-title">Point Earned</div>
                            <div className="value-message-content">Point Earned Point Earned Point Earned Point Earned Point Earned Point Earned Point Earned Point Earned</div>
                        </div>
                    </div>
                    <div className="bb-modal-content-value value-white">
                        <div className="value-date">31 Jun</div>
                        <div className="value-message">
                            <div className="value-message-title">Point Earned</div>
                            <div className="value-message-content">Point Earned Point Earned Point Earned Point Earned Point Earned Point Earned Point Earned Point Earned</div>
                        </div>
                    </div>
                </div>
                <div className="bb-modal-content-notification">
                    <div className="bb-modal-content-date">June 2020</div>
                    <div className="bb-modal-content-value value-grey">
                        <div className="value-date">31 Jun</div>
                        <div className="value-message">
                            <div className="value-message-title">Point Earned</div>
                            <div className="value-message-content">Point Earned Point Earned Point Earned Point Earned Point Earned Point Earned Point Earned Point Earned</div>
                        </div>
                    </div>
                    <div className="bb-modal-content-value value-white">
                        <div className="value-date">31 Jun</div>
                        <div className="value-message">
                            <div className="value-message-title">Point Earned</div>
                            <div className="value-message-content">Point Earned Point Earned Point Earned Point Earned Point Earned Point Earned Point Earned Point Earned</div>
                        </div>
                    </div>
                </div>
            </ModalBody>
        </Modal>
    );
};

export default ModalNotifications;
