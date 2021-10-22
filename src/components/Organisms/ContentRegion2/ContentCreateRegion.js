import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Breadcrumbs, Link, Typography, Button } from '@material-ui/core';
import FormRegion from '../../Molecules/ContentRegion/FormRegion';
import { postRegion } from '../../../store/actions/Reducers-Region';
import CreateStyle from './Create-Style';
function ContentCreateRegion() {
  let history = useHistory();
  const dispatch = useDispatch();
  const classes = CreateStyle();
  const [dataRegion, setDataRegion] = useState({});
  const handleForm = (event) => {
    setDataRegion((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };
  const submitRegion = () => {
    const promisePostRegion = dispatch(postRegion(dataRegion));
    Promise.allSettled([promisePostRegion]).then((values) => {
      history.push('/region');
    });
  };
  return (
    <div className={classes.container}>
      <div>
        <Breadcrumbs aria-label="breadcrumb">
          <Link className={classes.titleBread} color="inherit" href="/">
            Master Data Management
          </Link>
          <Link className={classes.titleBread} color="inherit" href="/">
            Region
          </Link>
          <Typography className={classes.titleBread} color="error">
            Create Region
          </Typography>
        </Breadcrumbs>
        <div className={classes.title}>
          <Typography color="textPrimary" variant="h5" component="h1">
            Create Region
          </Typography>
        </div>
        <FormRegion handleForm={handleForm} stateForm={dataRegion} />
      </div>
      <div display="flex" flexDirection="row" style={{ marginTop: '20px' }}>
        <Button
          onClick={submitRegion}
          variant="contained"
          color="primary"
          style={{ marginRight: '34px' }}
        >
          Save
        </Button>
        <Button href="/region" variant="contained">
          Cancel
        </Button>
      </div>
    </div>
  );
}
export default ContentCreateRegion;
