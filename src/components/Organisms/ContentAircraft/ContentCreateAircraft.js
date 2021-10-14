import { Breadcrumbs, Link, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import FormAircraft from '../../Molecules/ContentAircraft/FormAircraft';
import CreateStyle from './Create-Style';
import { postAircraft } from '../../../store/actions/Reducers-Aircraft';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

function ContentCreateAircraft() {
  const classes = CreateStyle();
  const [dataAircraft, setDataAircraft] = useState({});
  let history = useHistory();
  const dispatch = useDispatch();
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
          <Typography className={classes.titleBreadAirCraft} color="error">
            Create Aircraft
          </Typography>
        </Breadcrumbs>
        <div className={classes.title}>
          <Typography color="textPrimary" variant="h5" component="h1">
            Create Aircraft
          </Typography>
        </div>
        <FormAircraft
          handleForm={submitAircraft}
          stateForm={dataAircraft}
          onClick={submitAircraft}
        />
      </div>
    </div>
  );
}
export default ContentCreateAircraft;
