import React, { useState, useEffect } from 'react';
import {
  Breadcrumbs,
  Link,
  makeStyles,
  Typography,
  Box,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';

import useMediaQuery from '@material-ui/core/useMediaQuery';
import UiTableDekstop from '../../Molecules/ContentAircraft/dekstop/UiTableDekstop';
import UiTableMobile from '../../Molecules/ContentAircraft/mobile/UiTableMobile';
import TableRegion from '../../Molecules/ContentRegion/TableRegion';
import {
  fetchRegion,
  removeRegion,
} from '../../../store/actions/Reducers-Region';
import ViewStyle from './View-Style';

function ContentRegion() {
  const classes = ViewStyle();
  const dispatch = useDispatch();
  const dekstop = useMediaQuery('(min-width:600px)');

  const stateRegion = useSelector((state) => state.region);
  useEffect(() => {
    const promiseRegion = dispatch(fetchRegion());
    Promise.allSettled([promiseRegion]);
  }, []);

  const deleteRegion = (id) => {
    const removeItem = dispatch(removeRegion({ id }));

    Promise.allSettled([removeItem]).then((values) => {
      dispatch(fetchRegion());
    });
  };
  return (
    <div className={classes.container}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link className={classes.titleBread} color="inherit" href="/">
          Master Data Management
        </Link>
        <Typography className={classes.titleBread} color="textPrimary">
          Master Region
        </Typography>
      </Breadcrumbs>
      <div className={classes.title}>
        <Typography color="textPrimary" variant="h5" component="h1">
          Master Region
        </Typography>
      </div>
      <div className={classes.containerTable}>
        {/* <div className={classes.rootTab}>
          {dekstop ? (
            <UiTableDekstop
              value={value}
              TabPanel={TabPanel}
              Uitable={Uitable}
              handleChange={handleChange}
              a11yProps={a11yProps}
              classes={classes}
              dekstop={dekstop}
            />
          ) : (
            <UiTableMobile
              value={value}
              TabPanel={TabPanel}
              Uitable={Uitable}
              handleChange={handleChange}
              a11yProps={a11yProps}
              classes={classes}
              dekstop={dekstop}
            />
          )}
        </div> */}

        <div className={classes.rootTab}>
          <TableRegion
            removeFunction={deleteRegion}
            dataTable={stateRegion.dataRegion}
            titleButton="Create New"
            linkButton="/region/create-region"
          />
        </div>
      </div>
    </div>
  );
}

export default ContentRegion;
