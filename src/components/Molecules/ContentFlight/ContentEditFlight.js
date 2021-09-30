import React from 'react';
import {
  Breadcrumbs,
  makeStyles,
  Link,
  Typography,
  Button,
} from '@material-ui/core';
import Form from './Form';
import Uitable from '../../Atoms/UItable';
const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(11),
    marginRight: theme.spacing(7),
    marginLeft: theme.spacing(3),
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
function ContentEditFlight() {
  const classes = useStyles();
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
            Edit Flight Standard Mark-Up
          </Typography>
        </Breadcrumbs>
        <div className={classes.title}>
          <Typography color="textPrimary" variant="h5" component="h1">
            Edit Flight Standard Mark-Up
          </Typography>
        </div>
        <Form />
        <div style={{ marginTop: '20px' }}>
          <Uitable />
        </div>
      </div>
      <div display="flex" flexDirection="row" style={{ marginTop: '10px' }}>
        <Button variant="contained" style={{ marginRight: '34px' }}>
          Cancel
        </Button>
        <Button variant="contained" color="primary">
          Primary
        </Button>
      </div>
    </div>
  );
}
export default ContentEditFlight;
