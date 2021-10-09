import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import {
  Breadcrumbs,
  makeStyles,
  Link,
  Typography,
  Button,
} from '@material-ui/core';
import FormAircraft from './FormAircraft';
import {
  editAircraft,
  getAircraftById,
  postAircraft,
} from '../../../store/actions/Reducers-Aircraft';
const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(11),
    marginRight: theme.spacing(7),
    marginLeft: theme.spacing(3),
    marginBottom: theme.spacing(10),

    [theme.breakpoints.down('sm')]: {
      width: ' 80%',
    },
  },
  titleBread: {
    fontWeight: 'bold',
    [theme.breakpoints.down('sm')]: {
      fontSize: '12px',
    },
  },
  title: {
    marginTop: theme.spacing(2),
  },
}));
function ContentDetailAircraft() {
  const dispatch = useDispatch();
  const params = useParams();
  const classes = useStyles();
  const stateAircraft = useSelector((state) => state.airCraft);
  const [dataAircraft, setDataAircraft] = useState({});
  useEffect(() => {
    const promiseDetailAircraft = dispatch(getAircraftById(params.id));
    Promise.allSettled([promiseDetailAircraft]).then((values) => {});
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
  const submitAircraft = () => {
    dispatch(editAircraft({ data: dataAircraft, id: params.id }));
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
          read={true}
          handleForm={handleForm}
          stateForm={dataAircraft}
        />
      </div>
      <div display="flex" flexDirection="row" style={{ marginTop: '20px' }}>
        <Button variant="contained" href="/aircraft">
          Cancel
        </Button>
      </div>
    </div>
  );
}
export default ContentDetailAircraft;
