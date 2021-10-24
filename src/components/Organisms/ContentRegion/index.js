import { Breadcrumbs, Link, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchRegion,
  removeRegion,
} from '../../../store/actions/Reducers-Region';
import TableRegion from '../../Molecules/ContentRegion/TableRegion';
import ViewStyle from './View-Style';

function ContentRegion() {
  const classes = ViewStyle();
  const dispatch = useDispatch();

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
        <Typography className={classes.titleBreadAirCraft} color="textPrimary">
          Region
        </Typography>
      </Breadcrumbs>
      <div className={classes.title}>
        <Typography color="textPrimary" variant="h5" component="h1">
          Master Region
        </Typography>
      </div>
      <div className={classes.containerTable}>
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
