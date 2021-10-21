import {
  Breadcrumbs,
  Link, Typography
} from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchAircraft,
  removeAircraft
} from '../../../store/actions/Reducers-Aircraft';
import TableAircraft from '../../Molecules/ContentAircraft/TableAircraft';
import ViewStyle from './View-Style';



function ContentAircraft() {
  const classes = ViewStyle();
  const dispatch = useDispatch();
  const dekstop = useMediaQuery('(min-width:600px)');

  const stateAircraft = useSelector((state) => state.airCraft);
  useEffect(() => {
    const promiseAircraft = dispatch(fetchAircraft());
    Promise.allSettled([promiseAircraft]);
  }, []);

  const deleteAircraft = (id) => {
    const removeItem = dispatch(removeAircraft({id}));

    Promise.allSettled([removeItem]).then((values) => {
      dispatch(fetchAircraft());
    });
  };
  return (
    <div className={classes.container}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link className={classes.titleBread} color="inherit" href="/">
          Master Data Management
        </Link>
        <Typography className={classes.titleBreadAirCraft} color="textPrimary">
          Aircraft
        </Typography>
      </Breadcrumbs>
      <div className={classes.title}>
        <Typography color="textPrimary" variant="h5" component="h1">
          Master Aircraft
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
          <TableAircraft
            removeFunction={deleteAircraft}
            dataTable={stateAircraft.dataAircraft}
            titleButton="Create New"
            linkButton="/aircraft/create-aircraft"
          />
        </div>
      </div>
    </div>
  );
}

export default ContentAircraft;
