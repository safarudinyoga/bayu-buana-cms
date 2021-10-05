import React, { useState, useEffect } from 'react';
import {
  Breadcrumbs,
  makeStyles,
  Link,
  Typography,
  Button,
} from '@material-ui/core';
import Form from './Form';
const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(11),
    marginRight: theme.spacing(7),
    marginLeft: theme.spacing(3),
    marginBottom: theme.spacing(10),
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
function ContentCreateHotel() {
  const classes = useStyles();
  const [dataHotel, setDataHotel] = useState({});
  const handleForm = (event) => {
    setDataHotel((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };
  useEffect(() => {
    console.log(dataHotel, 'flight');
  }, [dataHotel]);
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
            Create Hotel Standard Mark-Up
          </Typography>
        </Breadcrumbs>
        <div className={classes.title}>
          <Typography color="textPrimary" variant="h5" component="h1">
            Create Hotel Standard Mark-Up
          </Typography>
        </div>
        <Form handleForm={handleForm} stateForm={dataHotel} />
      </div>
      <div display="flex" flexDirection="row" style={{ marginTop: '20px' }}>
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
export default ContentCreateHotel;
