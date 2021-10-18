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
  };
  const handleLanguage = (event) => {
    let indexElement = collectLanguage.findIndex((e) => {
      // eslint-disable-next-line no-unused-expressions
      return e.languageCode === event.target.name;
    });

    if (indexElement === -1) {
      setCOllectLanguage((prevState) => [
        ...prevState,
        { languageCode: event.target.name, languageValue: event.target.value },
      ]);
    } else if (indexElement !== -1) {
      let g = collectLanguage[indexElement];
      g.languageValue = event.target.value;
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
    const promisePostAricraft = dispatch(
      postAircraft({
        dataCraft: dataAircraft,
        dataTransalations: collectLanguage,
      }),
    );

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
<<<<<<< HEAD
=======
          dataLanguage={stateLanguage.dataLanguage}
          handleLanguage={handleLanguage}
          stateLanguage={collectLanguage}
>>>>>>> 37fd1e0ee660fc1d8375870d95f3565b05af75ec
          handleForm={handleForm}
          stateForm={dataAircraft}
          onClick={submitAircraft}
        />
      </div>
    </div>
  );
}
export default ContentCreateAircraft;
