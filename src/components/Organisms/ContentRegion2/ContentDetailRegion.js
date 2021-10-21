import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import DetailStyle from './Detail-Style';
import { Breadcrumbs, Link, Typography, Button } from '@material-ui/core';
import FormRegion from '../../Molecules/ContentRegion/FormRegion';
import {
  editRegion,
  getRegionById,
  postRegion,
} from '../../../store/actions/Reducers-Region';

function ContentDetailRegion() {
  const dispatch = useDispatch();
  const params = useParams();
  const classes = DetailStyle();
  const stateRegion = useSelector((state) => state.region);
  const [dataRegion, setDataRegion] = useState({});
  useEffect(() => {
    const promiseDetailRegion = dispatch(getRegionById(params.id));
    Promise.allSettled([promiseDetailRegion]).then((values) => {});
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
  const submitRegion = () => {
    dispatch(editRegion({ data: dataRegion, id: params.id }));
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
            Region Details
          </Typography>
        </Breadcrumbs>
        <div className={classes.title}>
          <Typography color="textPrimary" variant="h5" component="h1">
            Edit Region
          </Typography>
        </div>
        <FormRegion
          read={true}
          handleForm={handleForm}
          stateForm={dataRegion}
        />
      </div>
      <div display="flex" flexDirection="row" style={{ marginTop: '20px' }}>
        <Button variant="contained" href="/region">
          Cancel
        </Button>
      </div>
    </div>
  );
}
export default ContentDetailRegion;
