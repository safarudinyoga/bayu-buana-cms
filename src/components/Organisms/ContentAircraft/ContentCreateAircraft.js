import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Breadcrumbs, Link, Typography, Button } from '@material-ui/core';
import FormAircraft from '../../Molecules/ContentAircraft/FormAircraft';
import { postAircraft } from '../../../store/actions/Reducers-Aircraft';
import CreateStyle from './Create-Style';
function ContentCreateAircraft() {
  let history = useHistory();
  const dispatch = useDispatch();
  const classes = CreateStyle();
  const [dataAircraft, setDataAircraft] = useState({});
  const handleForm = (event) => {
    setDataAircraft((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };
  const submitAircraft = () => {
    const promisePostAricraft = dispatch(postAircraft(dataAircraft));
    Promise.allSettled([promisePostAricraft]).then((values) => {
      history.push('/aircraft');
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
          onClick={submitAircraft}
          variant="contained"
          color="primary"
          style={{ marginRight: '34px' }}
        >
          Save
        </Button>
        <Button href="/aircraft" variant="contained">
          Cancel
        </Button>
      </div>
    </div>
  );
}
export default ContentCreateAircraft;
