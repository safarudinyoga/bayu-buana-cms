import { Breadcrumbs, Link, Typography } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import FormAircraft from '../../Molecules/ContentAircraft/FormAircraft';
import CreateStyle from './Create-Style';
import { postAircraft } from '../../../store/actions/Reducers-Aircraft';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fetchLanguage } from '../../../store/actions/Reducers-Language';

function ContentCreateAircraft() {
  const classes = CreateStyle();
  const [dataAircraft, setDataAircraft] = useState({});
  const [collectLanguage, setCOllectLanguage] = useState([]);
  let history = useHistory();
  const dispatch = useDispatch();
  const handleForm = (event) => {
    setDataAircraft((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
    console.log(collectLanguage[0].name, 'onChange Create-airCraft');
  };
  const handleLanguage = (event) => {
    let indexElement = collectLanguage.findIndex((e) => {
      // eslint-disable-next-line no-unused-expressions
      return e.language_code === event.target.name;
    });

    if (indexElement === -1) {
      setCOllectLanguage((prevState) => [
        ...prevState,
        { language_code: event.target.name, aircraft_name: event.target.value },
      ]);
    } else if (indexElement !== -1) {
      let g = collectLanguage[indexElement];
      g.aircraft_name = event.target.value;
      setCOllectLanguage([
        ...collectLanguage.slice(0, indexElement),
        g,
        ...collectLanguage.slice(indexElement + 1),
      ]);
    }
  };
  const stateLanguage = useSelector((state) => state.language);
  useEffect(() => {
    const promiseLanguage = dispatch(fetchLanguage());
    Promise.allSettled([promiseLanguage]).then((values) => {
      console.log(values);
    });
  }, []);

  const submitAircraft = () => {
    let isAircraftName = dataAircraft?.aircraft_name || false;
    let isAircraftCode = dataAircraft?.aircraft_code || false;
    let isAircraftModel = dataAircraft?.model || false;
    let isIcaoCode = dataAircraft?.icao_code || false;
    let dataLanguage = stateLanguage.dataLanguage;
    let isDataTranslation =
      dataLanguage.length === collectLanguage.length ? true : false;

    if (
      isAircraftName &&
      isAircraftCode &&
      isAircraftModel &&
      isIcaoCode &&
      isDataTranslation
    ) {
      const promisePostAricraft = dispatch(
        postAircraft({
          dataCraft: dataAircraft,
          dataTranslations: collectLanguage,
        }),
      );

      Promise.allSettled([promisePostAricraft]).then((values) => {
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
          helperText
          dataLanguage={stateLanguage.dataLanguage}
          handleLanguage={handleLanguage}
          stateLanguage={collectLanguage}
          handleForm={handleForm}
          stateForm={dataAircraft}
          onClick={submitAircraft}
          urlCancel="/aircraft"
        />
      </div>
    </div>
  );
}
export default ContentCreateAircraft;
