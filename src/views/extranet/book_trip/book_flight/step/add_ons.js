import React, {useState, useEffect} from "react"
import { Col, Row, Card, Form, Button, Alert, Accordion, Modal } from 'react-bootstrap'
import BBModal from 'components/Modal/bb-modal';

const AddOn = ({ handleSelectTab }) => {
  return (
    <div className="pt-4">
      <p>This feature is not yet available</p>
      <div className='d-flex'>
        <Button 
        onClick={(e) => { 
          handleSelectTab("review")
        }}
        className="btn-flight-select mr-3"
        >
            continue booking
        </Button>
        <Button variant="secondary" onClick={() => handleSelectTab('select-seats')}>Back</Button>
      </div>
    </div>
  )
}

export default AddOn