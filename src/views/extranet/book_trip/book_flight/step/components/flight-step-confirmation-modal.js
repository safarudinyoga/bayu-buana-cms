import React, { useEffect, useState } from 'react'
import { Col, Row, Card, Form, Button, Alert, Accordion, Modal } from 'react-bootstrap'
import BBModal from 'components/Modal/bb-modal';
import HelpIC from 'assets/icons/help.svg'

const PopupConfirmation = (props) => {
  return (
    <BBModal
      show={props.show}
      size="sm"
      onClick={props.onClose}
      scrollable={true}
      modalContent={() => (
        <div className='text-center'>
          <div className='d-flex justify-content-center align-items-start'>
            <img src={HelpIC} className='mr-2' />
            <div>
              <p className='m-0'>{props.contentText}</p>
              <p>** fees apply</p>
            </div>
          </div>

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