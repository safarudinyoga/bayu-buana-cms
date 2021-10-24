import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import DetailStyle from './Detail-Style';
import { Breadcrumbs, Link, Typography, Button } from '@material-ui/core';
import FormRegion from '../../Molecules/ContentRegion/FormRegion';
import {
  editAircraft,
  getAircraftById,
  getAircraftLanguageById,
  postAircraft,
} from '../../../store/actions/Reducers-Aircraft';
import {
  editRegion,
  getRegionById,
  getRegionLanguageById,
  postRegion,
} from '../../../store/actions/Reducers-Region';
import { fetchLanguage } from '../../../store/actions/Reducers-Language';

function ContentDetailRegion() {
  const dispatch = useDispatch();
  const params = useParams();
  const classes = DetailStyle();
  const stateRegion = useSelector((state) => state.region);
  const [dataRegion, setDataRegion] = useState({});
  const [collectLanguage, setCollectLanguage] = useState([]);
  const stateLanguage = useSelector((state) => state.language);
  useEffect(() => {
    const promiseDetailRegion = dispatch(getRegionById(params.id));
    const promiseDetailRegionLanguage = dispatch(
      getRegionLanguageById(params.id),
    );
    Promise.allSettled([promiseDetailRegion, promiseDetailRegionLanguage]).then(
      (values) => {},
    );
  }, []);
  useEffect(() => {
    const promiseLanguage = dispatch(fetchLanguage());
    Promise.allSettled([promiseLanguage]).then((values) => {
      console.log(values);
    });
  }, []);
  useEffect(() => {
    setDataRegion(stateRegion.detailRegion);
  }, [stateRegion.detailRegion]);
  const handleForm = (event) => {
    setDataRegion((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };
  useEffect(() => {
    setCollectLanguage(stateRegion.detailRegionLanguage);
  }, [stateRegion.detailRegionLanguage]);

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
            Edit Region
          </Typography>
        </Breadcrumbs>
        <div className={classes.title}>
          <Typography color="textPrimary" variant="h5" component="h1">
            Edit Region
          </Typography>
        </div>
        <FormRegion
          detailPage={true}
          dataLanguage={stateLanguage.dataLanguage}
          stateLanguage={collectLanguage}
          read={true}
          handleForm={handleForm}
          stateForm={dataRegion}
          urlCancel="/region"
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
export default ContentDetailRegion;
