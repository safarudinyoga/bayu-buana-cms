import React, { useState, useEffect } from 'react';
import {
  Breadcrumbs,
  makeStyles,
  Link,
  Typography,
  Button,
} from '@material-ui/core';
import Form from './Form';
import UiTableMarkUp from './UiTableMarkUpFlight';
import UiTableMarkUpHotel from './UiTableMarkUpHotel';
const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(11),
    marginRight: theme.spacing(7),
    marginLeft: theme.spacing(3),
  },
  form: {
    [theme.breakpoints.down('sm')]: {
      width: '100vw',
    },
  },
  titleBread: {
    [theme.breakpoints.down('sm')]: {
      fontSize: '12px',
    },
  },
  title: {
    marginTop: theme.spacing(2),
  },
}));
function ContentEditHotel() {
  const classes = useStyles();
  const [dataHotel, setDataHotel] = useState({});
  const handleForm = (event) => {
    setDataHotel((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };
  return (
    <div className={classes.container}>
      <div>
        <Breadcrumbs aria-label="breadcrumb">
          <Link className={classes.titleBread} color="inherit" href="/">
            Master Data Management
          </Link>
          <Link className={classes.titleBread} color="inherit" href="/">
            Standard Mark-Up
          </Link>
          <Typography className={classes.titleBread} color="error">
            Edit Hotel Standard Mark-Up
          </Typography>
        </Breadcrumbs>
        <div className={classes.title}>
          <Typography color="textPrimary" variant="h5" component="h1">
            Edit Hotel Standard Mark-Up
          </Typography>
        </div>
        <Form
          handleForm={handleForm}
          stateForm={dataHotel}
          className={classes.form}
        />
        <div style={{ marginTop: '20px' }}>
          <UiTableMarkUpHotel
            titleButton="Add Override Mark-up"
            linkButton="/master/create-flight"
          />
        </div>
      </div>
      <div
        display="flex"
        flexDirection="row"
        style={{ marginTop: '20px', marginBottom: '50px' }}
      >
        <Button
          variant="contained"
          color="primary"
          style={{ marginRight: '34px' }}
        >
          Save
        </Button>
        <Button variant="contained">Cancel</Button>
      </div>
    </div>
  );
}
export default ContentEditHotel;
