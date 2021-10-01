import {
  InputBase,
  makeStyles,
  alpha,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Grid,
  Button,
  Modal,
  Radio,
  FormControlLabel,
  Typography,
  TextField,
  RadioGroup,
} from '@material-ui/core';
import React, { useState } from 'react';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}
function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `50%`,
    left: `50%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 800,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  titleModal: {
    fontSize: '16px',
  },
  labelForm: {
    width: '30%',
    fontWeight: '400',
    fontSize: '15px',
  },
  labelInput: {
    marginRight: 10,
    fontWeight: '400',
    fontSize: '15px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'row',
  },
}));

function ModalEditMarkUp({ setFunc, open }) {
  const classes = useStyles();

  const [modalStyle] = React.useState(getModalStyle);

  const handleClose = () => {
    setFunc(false);
  };
  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 className={classes.titleModal} id="simple-modal-title">
        EDIT FLIGHT OVERRIDE MARKUP
      </h2>
      <div>
        <div className={classes.inputGroup}>
          <Typography
            className={classes.labelForm}
            color="textPrimary"
            variant="h6"
            component="label"
          >
            Domestic Flight Mark Up <span style={{ color: 'red' }}>*</span>
          </Typography>
          <RadioGroup
            row
            aria-label="position"
            name="position"
            defaultValue="top"
          >
            <div width="100%" className={classes.formRadioGroup}>
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  {' '}
                  <div style={{ marginRight: 30 }}>
                    <FormControlLabel
                      name="typeDomestic"
                      value="fixedAmountDomestic"
                      control={<Radio color="primary" />}
                      label="Fixed Amount"
                    />
                  </div>
                  <div className={classes.childRadio}>
                    <div style={{ marginRight: 10 }}>
                      <div
                        style={{
                          marginRight: 10,
                          display: 'flex',
                        }}
                      >
                        <Typography
                          className={classes.labelInput}
                          color="textPrimary"
                          variant="h6"
                          component="label"
                        >
                          IDR
                        </Typography>
                        <TextField
                          name="idrDomestic"
                          className={classes.fieldTagRadio}
                          id="outlined-basic"
                          variant="outlined"
                          size="small"
                          style={{ marginRight: 14 }}
                        />
                        <div
                          style={{ display: 'flex', flexDirection: 'column' }}
                        >
                          <FormControlLabel
                            name="typeIdrDomestic"
                            value="ticketDomestic"
                            control={<Radio color="primary" />}
                            label="Ticket"
                          />
                          <FormControlLabel
                            name="typeIdrDomestic"
                            value="personDomestic"
                            control={<Radio color="primary" />}
                            label="Person"
                          />
                          <FormControlLabel
                            name="typeIdrDomestic"
                            value="transactionDomestic"
                            control={<Radio color="primary" />}
                            label="Transaction"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </RadioGroup>
        </div>
      </div>
      <ModalEditMarkUp />
    </div>
  );
  return (
    <>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          {body}
        </Modal>
      </div>
    </>
  );
}

export default ModalEditMarkUp;
