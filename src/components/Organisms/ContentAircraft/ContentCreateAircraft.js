import { Breadcrumbs, Link, Typography } from '@material-ui/core';
import React from 'react';
import FormAircraft from '../../Molecules/ContentAircraft/FormAircraft';
import CreateStyle from './Create-Style';
function ContentCreateAircraft() {
  const classes = CreateStyle();

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
            Create Aircraft
          </Typography>
        </Breadcrumbs>
        <div className={classes.title}>
          <Typography color="textPrimary" variant="h5" component="h1">
            Create Aircraft
          </Typography>
        </div>
        <FormAircraft />
      </div>
    </div>
  );
}
export default ContentCreateAircraft;
