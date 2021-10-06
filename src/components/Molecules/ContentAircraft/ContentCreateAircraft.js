import React, { useState, useEffect } from 'react';
import {
  Breadcrumbs,
  makeStyles,
  Link,
  Typography,
  Button,
} from '@material-ui/core';
import FormAircraft from './FormAircraft';
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
function ContentCreateAircraft() {
  const classes = useStyles();
  const [dataAircraft, setDataAircraft] = useState({});
  const handleForm = (event) => {
    setDataAircraft((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };
  useEffect(() => {
    console.log(dataAircraft, 'flight');
  }, [dataAircraft]);
  return (
    <div className={classes.container}>
      <div>
        <Breadcrumbs aria-label="breadcrumb">
          <Link className={classes.titleBread} color="inherit" href="/">
            Master Data Management
          </Link>
          <Link className={classes.titleBread} color="inherit" href="/">
            Aircraft
          </Link>
          <Typography className={classes.titleBread} color="error">
            Create Aircraft
          </Typography>
        </Breadcrumbs>
        <div className={classes.title}>
          <Typography color="textPrimary" variant="h5" component="h1">
            Create Aircraft
          </Typography>
        </div>
        <FormAircraft handleForm={handleForm} stateForm={dataAircraft} />
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
export default ContentCreateAircraft;
