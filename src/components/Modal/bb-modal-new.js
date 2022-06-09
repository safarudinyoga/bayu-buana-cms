import React from "react"
import { Button, Modal, ModalBody, ModalFooter } from "react-bootstrap"
import CancelButton from 'components/button/cancel'
import './bb-modal.css'

const ModalCreateNew = ({show, onClick, modalContent, modalTitle, modalSize, scrollable=false}) => {
	// console.log('test modal new: ', show ,modalTitle)
	const Content = modalContent
	return (
		<Modal 
			size={modalSize}
			show={show} 
			onHide={onClick}
			aria-labelledby="contained-modal-title-vcenter"
			centered
			dialogClassName={!modalSize ? "bb-modal-dialog" : ""}
			scrollable={scrollable}
		>
		<Modal.Header closeButton className="bb-modal-header">
		</Modal.Header>
		<ModalBody className="bb-modal-body">
			{modalTitle 
				? <p className="bb-modal-title">{modalTitle}</p> 
				: null
			}
			{modalContent ? <Content onHide={onClick}/> : null}
		</ModalBody>
		</Modal>
	)
}

export default ModalCreateNew