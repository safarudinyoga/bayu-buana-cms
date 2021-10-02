import React, { useState } from 'react';
import Select from 'react-select';
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
  Checkbox,
} from '@material-ui/core';

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
    width: 760,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(3, 6, 6),
  },
  titleModal: {
    fontSize: '16px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 20,
  },
  labelForm: {
    width: '30%',
    fontWeight: '400',
    fontSize: '1rem',
    display: 'flex',
  },
  labelInput: {
    marginRight: 10,
    fontWeight: '400',
    fontSize: '1rem',
  },
  fieldTagInput: {
    width: '120px',
  },
}));
const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];
function ModalEditMarkUp({ setFunc, open }) {
  const classes = useStyles();
  const [dataEditMarkUp, setDataEditMarkUp] = useState({});

  const handleInput = (event) => {
    setDataEditMarkUp((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };
  const handleDestination = (event) => {
    setDataEditMarkUp((prevState) => ({
      ...prevState,
      destination: event,
    }));
  };
  const handleAirlineService = (event) => {
    setDataEditMarkUp((prevState) => ({
      ...prevState,
      airlineServiceType: event,
    }));
  };
  const handleSpecifiedAirlines = (event) => {
    setDataEditMarkUp((prevState) => ({
      ...prevState,
      specifiedAirlines: event,
    }));
  };
  const handleSpecifiedSource = (event) => {
    setDataEditMarkUp((prevState) => ({
      ...prevState,
      specifiedSource: event,
    }));
  };
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
            Destination <span style={{ color: 'red' }}>*</span>
          </Typography>
          <Grid container>
            <Grid item md={6}>
              <Select
                onChange={handleDestination}
                options={options}
                isMulti
                name="dataDestination"
                className="basic-multi-select"
                classNamePrefix="select"
              />
            </Grid>
          </Grid>
        </div>
        <div className={classes.inputGroup}>
          <Typography
            className={classes.labelForm}
            color="textPrimary"
            variant="h6"
            component="label"
          >
            Airline Service Type<span style={{ color: 'red' }}>*</span>
          </Typography>
          <Grid container>
            <Grid item md={6}>
              <Select
                onChange={handleAirlineService}
                options={options}
                isMulti
                name="dataDestination"
                className="basic-multi-select"
                classNamePrefix="select"
              />
            </Grid>
          </Grid>
        </div>
        <div className={classes.inputGroup}>
          <Typography
            className={classes.labelForm}
            color="textPrimary"
            variant="h6"
            component="label"
          >
            Specified Airlines <span style={{ color: 'red' }}>*</span>
          </Typography>
          <Grid container>
            <Grid item md={6}>
              <Select
                onChange={handleSpecifiedAirlines}
                options={options}
                isMulti
                name="dataDestination"
                className="basic-multi-select"
                classNamePrefix="select"
              />
            </Grid>
          </Grid>
        </div>
        <div className={classes.inputGroup}>
          <Typography
            className={classes.labelForm}
            color="textPrimary"
            variant="h6"
            component="label"
          >
            Specified Source <span style={{ color: 'red' }}>*</span>
          </Typography>
          <Grid container>
            <Grid item md={6}>
              <Select
                onChange={handleSpecifiedSource}
                options={options}
                isMulti
                name="dataDestination"
                className="basic-multi-select"
                classNamePrefix="select"
              />
            </Grid>
          </Grid>
        </div>
        <div className={classes.inputGroup}>
          <Typography
            className={classes.labelForm}
            color="textPrimary"
            variant="h6"
            component="label"
          >
            Mark Up <span style={{ color: 'red' }}>*</span>
          </Typography>

          <Grid container>
            <Grid item md={3}>
              <RadioGroup
                row
                aria-label="position"
                name="position"
                defaultValue="top"
              >
                <FormControlLabel
                  onChange={handleInput}
                  name="typeDomestic"
                  value="fixedAmountDomestic"
                  control={<Radio color="primary" />}
                  label="Fixed Amount"
                />
              </RadioGroup>
            </Grid>
            <Grid item md={9}>
              <div style={{ display: 'flex', alignItems: 'start' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Typography
                    className={classes.labelInput}
                    color="textPrimary"
                    variant="h6"
                    component="label"
                  >
                    IDR
                  </Typography>
                  <TextField
                    value={dataEditMarkUp?.idrDomestic || ''}
                    onChange={handleInput}
                    name="idrDomestic"
                    className={classes.fieldTagInput}
                    id="outlined-basic"
                    variant="outlined"
                    size="small"
                    style={{ marginRight: 14 }}
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <FormControlLabel
                    onChange={handleInput}
                    checked={
                      dataEditMarkUp.typeIdrDomestic === 'ticketDomestic'
                    }
                    name="typeIdrDomestic"
                    value="ticketDomestic"
                    control={<Radio color="primary" />}
                    label="Ticket"
                  />
                  <FormControlLabel
                    onChange={handleInput}
                    checked={
                      dataEditMarkUp.typeIdrDomestic === 'personDomestic'
                    }
                    name="typeIdrDomestic"
                    value="personDomestic"
                    control={<Radio color="primary" />}
                    label="Person"
                  />
                  <FormControlLabel
                    onChange={handleInput}
                    checked={
                      dataEditMarkUp.typeIdrDomestic === 'transactionDomestic'
                    }
                    name="typeIdrDomestic"
                    value="transactionDomestic"
                    control={<Radio color="primary" />}
                    label="Transaction"
                  />
                </div>
              </div>
            </Grid>
            <Grid item md={3}>
              <div>
                <RadioGroup
                  row
                  aria-label="position"
                  name="position"
                  defaultValue="top"
                >
                  <FormControlLabel
                    onChange={handleInput}
                    checked={dataEditMarkUp.percentage === 'percentage'}
                    name="percentage"
                    value="percentage"
                    control={<Radio color="primary" />}
                    label="Percentage"
                  />
                </RadioGroup>
              </div>
            </Grid>
            <Grid item md={9}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <TextField
                  onChange={handleInput}
                  name="percent"
                  value={dataEditMarkUp?.percent || ''}
                  className={classes.fieldTagInput}
                  id="outlined-basic"
                  variant="outlined"
                  size="small"
                  style={{ marginRight: 14 }}
                />
                <Typography
                  className={classes.labelInput}
                  color="textPrimary"
                  variant="h6"
                  component="label"
                >
                  %
                </Typography>
                <FormControlLabel
                  onChange={handleInput}
                  name="includeTaxes"
                  value={dataEditMarkUp?.includeTaxes || ''}
                  control={<Checkbox color="primary" />}
                  label="Include Taxes"
                  labelPlacement="Include Taxes"
                />
              </div>
            </Grid>
          </Grid>
        </div>
        <div display="flex" flexDirection="row" style={{ marginTop: '20px' }}>
          <Button
            variant="contained"
            color="primary"
            style={{ marginRight: '34px' }}
          >
            Save
          </Button>
          <Button onClick={handleClose} variant="contained">
            Cancel
          </Button>
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
