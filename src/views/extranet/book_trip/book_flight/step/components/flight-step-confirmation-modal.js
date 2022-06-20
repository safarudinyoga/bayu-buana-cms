import React, { useEffect, useState } from 'react'
import { Col, Row, Card, Form, Button, Alert, Accordion, Modal } from 'react-bootstrap'
import BBModal from 'components/Modal/bb-modal';

const PopupConfirmation = (props) => {
  return (
    <BBModal
      show={props.show}
      size="sm"
      onClick={props.onClose}
      scrollable={true}
      modalContent={() => (
        <div className='text-center'>
          <p>{props.contentText}</p>
          <p>** fees apply</p>

          <div className='d-flex justify-content-center'>
            <Button 
              className='mr-3'
              onClick={props.onClickYes}
            >
              YES
            </Button>
            <Button onClick={props.onClickNo}>
              NO
            </Button>
          </div>
        </div>
      )}
    />
  )
}

export default PopupConfirmation