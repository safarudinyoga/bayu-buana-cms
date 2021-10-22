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
import EditStyle from './Edit-Style';
import { fetchLanguage } from '../../../store/actions/Reducers-Language';

function ContentEditRegion() {
  let history = useHistory();
  const dispatch = useDispatch();
  const params = useParams();
  const classes = EditStyle();
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
  const handleLanguage = (event) => {
    let indexElement = collectLanguage.findIndex((e) => {
      // eslint-disable-next-line no-unused-expressions
      return e.language_code === event.target.name;
    });

    if (indexElement === -1) {
      setCollectLanguage((prevState) => [
        ...prevState,
        { language_code: event.target.name, region_name: event.target.value },
      ]);
    } else if (indexElement !== -1) {
      let g = collectLanguage[indexElement];
      g.region_name = event.target.value;
      setCollectLanguage([
        ...collectLanguage.slice(0, indexElement),
        g,
        ...collectLanguage.slice(indexElement + 1),
      ]);
    }
  };
  const submitRegion = () => {
    let isRegionName = dataRegion?.region_name || false;
    let isRegionCode = dataRegion?.region_code || false;
    let dataLanguage = stateLanguage.dataLanguage;
    let isDataTranslation =
      dataLanguage.length === collectLanguage.length ? true : false;
    if (isRegionName && isRegionCode && isDataTranslation) {
      const promiseEditRegion = dispatch(
        editRegion({
          dataRegion: dataRegion,
          id: params.id,
          dataTranslations: collectLanguage,
        }),
      );

      Promise.allSettled([promiseEditRegion]).then((values) => {
        if (values[0].value === 200) {
          history.push('/region');
        }
      });
    } else {
      window.alert('Mohon cek kembali');
    }
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
            Edit Region
          </Typography>
        </Breadcrumbs>
        <div className={classes.title}>
          <Typography color="textPrimary" variant="h5" component="h1">
            Edit Region
          </Typography>
        </div>
        <FormRegion
          dataLanguage={stateLanguage.dataLanguage}
          handleLanguage={handleLanguage}
          stateLanguage={collectLanguage}
          handleForm={handleForm}
          stateForm={dataRegion}
          onClick={submitRegion}
          urlCancel="/region"
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
export default ContentEditRegion;
