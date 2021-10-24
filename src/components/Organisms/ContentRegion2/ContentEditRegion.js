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
  editRegion,
  getRegionById,
  postRegion,
} from '../../../store/actions/Reducers-Region';
import EditStyle from './Edit-Style';

function ContentEditRegion() {
  let history = useHistory();
  const dispatch = useDispatch();
  const params = useParams();
  const classes = EditStyle();
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
    const promiseEditRegion = dispatch(
      editRegion({ data: dataRegion, id: params.id }),
    );

    Promise.allSettled([promiseEditRegion]).then((values) => {
      history.push('/region');
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
        <FormRegion handleForm={handleForm} stateForm={dataRegion} />
      </div>
      <div display="flex" flexDirection="row" style={{ marginTop: '20px' }}>
        <Button
          onClick={submitRegion}
          variant="contained"
          color="primary"
          style={{ marginRight: '34px' }}
        >
          Save
        </Button>
        <Button href="/region" variant="contained">
          Cancel
        </Button>
      </div>
    </div>
  );
}
export default ContentEditRegion;
