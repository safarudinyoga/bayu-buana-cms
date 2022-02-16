import React from "react"
import { Button, Modal, ModalBody, ModalFooter } from "react-bootstrap"
import CancelButton from 'components/button/cancel'
import './bb-modal.css'

const ModalCreate = ({show, onClick, modalContent}) => {
	const Content = modalContent
	return (
		<Modal 
			show={show} 
			onHide={onClick}
			aria-labelledby="contained-modal-title-vcenter"
			centered
		>
		<Modal.Header closeButton className="bb-modal-header">
			<Modal.Title id="contained-modal-title-vcenter">
				Add Exchange Rate
			</Modal.Title>
		</Modal.Header>
		<ModalBody>
			<Content/>
		</ModalBody>
		</Modal>
	)
}

export default ModalCreate