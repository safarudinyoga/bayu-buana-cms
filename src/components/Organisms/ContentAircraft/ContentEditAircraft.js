import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';
import {
  Breadcrumbs,
  makeStyles,
  Link,
  Typography,
  Button,
} from '@material-ui/core';
import FormAircraft from '../../Molecules/ContentAircraft/FormAircraft';
import {
  editAircraft,
  getAircraftById,
  postAircraft,
} from '../../../store/actions/Reducers-Aircraft';
import EditStyle from './Edit-Style';

function ContentEditAircraft() {
  let history = useHistory();
  const dispatch = useDispatch();
  const params = useParams();
  const classes = EditStyle();
  const stateAircraft = useSelector((state) => state.airCraft);
  const [dataAircraft, setDataAircraft] = useState({});
  useEffect(() => {
    const promiseDetailAircraft = dispatch(getAircraftById(params.id));
    Promise.allSettled([promiseDetailAircraft]).then((values) => {});
  }, []);
  useEffect(() => {
    setDataAircraft(stateAircraft.detailAircraft);
  }, [stateAircraft.detailAircraft]);
  const handleForm = (event) => {
    setDataAircraft((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };
  const submitAircraft = () => {
    const promiseEditAircraft = dispatch(
      editAircraft({ data: dataAircraft, id: params.id }),
    );

    Promise.allSettled([promiseEditAircraft]).then((values) => {
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
            Edit Aircraft
          </Typography>
        </Breadcrumbs>
        <div className={classes.title}>
          <Typography color="textPrimary" variant="h5" component="h1">
            Edit Aircraft
          </Typography>
        </div>
        <FormAircraft
          handleForm={handleForm}
          stateForm={dataAircraft}
          onClick={submitAircraft}
        />
      </div>
      <div
        display="flex"
        flexDirection="row"
        style={{ marginTop: '20px' }}
      ></div>
    </div>
  );
}
export default ContentEditAircraft;
