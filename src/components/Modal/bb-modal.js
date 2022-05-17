import React from "react"
import { Button, Modal, ModalBody, ModalFooter } from "react-bootstrap"
import CancelButton from 'components/button/cancel'
import './bb-modal.css'

const ModalCreate = ({show, onClick, modalContent, modalTitle, modalSize}) => {
	// console.log('test: ', s)
	const Content = modalContent
	return (
		<Modal 
			size={modalSize}
			show={show} 
			onHide={onClick}
			aria-labelledby="contained-modal-title-vcenter"
			centered
			dialogClassName="bb-modal-dialog"
		>
		<Modal.Header closeButton className="bb-modal-header">
		</Modal.Header>
		<ModalBody className="bb-modal-body">
			<p className="bb-modal-title">{modalTitle}</p>
			{modalContent ? <Content onHide={onClick}/> : null}
		</ModalBody>
		</Modal>
	)
}

export default ModalCreate