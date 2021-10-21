import { Breadcrumbs, Link, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { postRegion } from '../../../store/actions/Reducers-Region';
import { fetchLanguage } from '../../../store/actions/Reducers-Language';
import FormRegion from '../../Molecules/ContentRegion/FormRegion';
import CreateStyle from './Create-Style';

function ContentCreateRegion() {
  const classes = CreateStyle();
  const [dataRegion, setDataRegion] = useState({});
  const [collectLanguage, setCOllectLanguage] = useState([]);
  let history = useHistory();
  const dispatch = useDispatch();
  const handleForm = (event) => {
    setDataRegion((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
    // console.log(collectLanguage[0].name, 'onChange Create-airCraft');
  };
  const handleLanguage = (event) => {
    let indexElement = collectLanguage.findIndex((e) => {
      // eslint-disable-next-line no-unused-expressions
      return e.language_code === event.target.name;
    });

    if (indexElement === -1) {
      setCOllectLanguage((prevState) => [
        ...prevState,
        { language_code: event.target.name, region_name: event.target.value },
      ]);
    } else if (indexElement !== -1) {
      let g = collectLanguage[indexElement];
      g.region_name = event.target.value;
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

  const submitRegion = () => {
    let isRegionName = dataRegion?.region_name || false;
    let isRegionCode = dataRegion?.region_code || false;
    let dataLanguage = stateLanguage.dataLanguage;
    let isDataTranslation =
      dataLanguage.length === collectLanguage.length ? true : false;

    if (isRegionName && isRegionCode && isDataTranslation) {
      const promisePostRegion = dispatch(
        postRegion({
          dataRegion: dataRegion,
          dataTranslations: collectLanguage,
        }),
      );

      Promise.allSettled([promisePostRegion]).then((values) => {
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
          <Typography className={classes.titleBreadAirCraft} color="error">
            Create Region
          </Typography>
        </Breadcrumbs>
        <div className={classes.title}>
          <Typography color="textPrimary" variant="h5" component="h1">
            Create Region
          </Typography>
        </div>
        <FormRegion
          helperText
          dataLanguage={stateLanguage.dataLanguage}
          handleLanguage={handleLanguage}
          stateLanguage={collectLanguage}
          handleForm={handleForm}
          stateForm={dataRegion}
          onClick={submitRegion}
          urlCancel="/region"
        />
      </div>
    </div>
  );
}
export default ContentCreateRegion;
