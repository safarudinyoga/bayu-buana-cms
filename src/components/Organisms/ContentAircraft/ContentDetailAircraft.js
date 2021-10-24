import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import DetailStyle from './Detail-Style';
import { Breadcrumbs, Link, Typography, Button } from '@material-ui/core';
import FormAircraft from '../../Molecules/ContentAircraft/FormAircraft';
import {
  editAircraft,
  getAircraftById,
  getAircraftLanguageById,
  postAircraft,
} from '../../../store/actions/Reducers-Aircraft';
import { fetchLanguage } from '../../../store/actions/Reducers-Language';

function ContentDetailAircraft() {
  const dispatch = useDispatch();
  const params = useParams();
  const classes = DetailStyle();
  const stateAircraft = useSelector((state) => state.airCraft);
  const [dataAircraft, setDataAircraft] = useState({});
  const [collectLanguage, setCollectLanguage] = useState([]);
  const stateLanguage = useSelector((state) => state.language);
  useEffect(() => {
    const promiseDetailAircraft = dispatch(getAircraftById(params.id));
    const promiseDetailAircraftLanguage = dispatch(
      getAircraftLanguageById(params.id),
    );
    Promise.allSettled([
      promiseDetailAircraft,
      promiseDetailAircraftLanguage,
    ]).then((values) => {});
  }, []);
  useEffect(() => {
    const promiseLanguage = dispatch(fetchLanguage());
    Promise.allSettled([promiseLanguage]).then((values) => {
      console.log(values);
    });
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
  useEffect(() => {
    setCollectLanguage(stateAircraft.detailAircraftLanguage);
  }, [stateAircraft.detailAircraftLanguage]);

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
          detailPage={true}
          dataLanguage={stateLanguage.dataLanguage}
          stateLanguage={collectLanguage}
          read={true}
          handleForm={handleForm}
          stateForm={dataAircraft}
          urlCancel="/aircraft"
        />
      </div>
      {/* <div display="flex" flexDirection="row" style={{ marginTop: '20px' }}>
        <Button variant="contained" href="/aircraft">
          Cancel
        </Button>
      </div> */}
    </div>
  );
}
export default ContentDetailAircraft;
