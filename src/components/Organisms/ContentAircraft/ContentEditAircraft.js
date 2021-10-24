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
  getAircraftLanguageById,
  postAircraft,
} from '../../../store/actions/Reducers-Aircraft';
import EditStyle from './Edit-Style';
import { fetchLanguage } from '../../../store/actions/Reducers-Language';

function ContentEditAircraft() {
  let history = useHistory();
  const dispatch = useDispatch();
  const params = useParams();
  const classes = EditStyle();
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
  const handleLanguage = (event) => {
    let indexElement = collectLanguage.findIndex((e) => {
      // eslint-disable-next-line no-unused-expressions
      return e.language_code === event.target.name;
    });

    if (indexElement === -1) {
      setCollectLanguage((prevState) => [
        ...prevState,
        { language_code: event.target.name, aircraft_name: event.target.value },
      ]);
    } else if (indexElement !== -1) {
      let g = collectLanguage[indexElement];
      g.aircraft_name = event.target.value;
      setCollectLanguage([
        ...collectLanguage.slice(0, indexElement),
        g,
        ...collectLanguage.slice(indexElement + 1),
      ]);
    }
  };
  const submitAircraft = () => {
    let isAircraftName = dataAircraft?.aircraft_name || false;
    let isAircraftCode = dataAircraft?.aircraft_code || false;
    let isAircraftModel = !dataAircraft?.model ? false : true;
    let isIcaoCode = dataAircraft?.icao_code || false;
    let dataLanguage = stateLanguage.dataLanguage;
    let isDataTranslation =
      dataLanguage.length === collectLanguage.length ? true : false;
    console.log(isAircraftModel, 'MOD');
    if (
      isAircraftName &&
      isAircraftCode &&
      isAircraftModel &&
      isIcaoCode &&
      isDataTranslation
    ) {
      const promiseEditAircraft = dispatch(
        editAircraft({
          dataCraft: dataAircraft,
          id: params.id,
          dataTranslations: collectLanguage,
        }),
      );

      Promise.allSettled([promiseEditAircraft]).then((values) => {
        if (values[0].value === 200) {
          history.push('/aircraft');
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
          dataLanguage={stateLanguage.dataLanguage}
          handleLanguage={handleLanguage}
          stateLanguage={collectLanguage}
          handleForm={handleForm}
          stateForm={dataAircraft}
          onClick={submitAircraft}
          urlCancel="/aircraft"
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
