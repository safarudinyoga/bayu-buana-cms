import React from 'react';
import {
  makeStyles,
  Typography,
  TextField,
  TextareaAutosize,
  RadioGroup,
  FormControlLabel,
  Radio,
  Grid,
} from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    [theme.breakpoints.down('sm')]: {
      paddingTop: '30px',
    },
  },
  titleBread: {
    [theme.breakpoints.down('sm')]: {
      fontSize: '12px',
    },
  },
  title: {
    marginTop: theme.spacing(2),
  },
  containerForm: {
    marginTop: theme.spacing(6),
    border: '0.5px solid #E6E6E6',
    boxShadow: '2px 2px #F0F0F0',
    borderRadius: '8px',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      padding: '12px',
      marginLeft: '-10px',
      borderRadius: '8px',
    },
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'row',
    margin: '40px 34px',
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      flexDirection: 'column',
      margin: '10px 27px 0 22px',
    },
  },
  labelForm: {
    width: '20%',
    fontWeight: '400',
    fontSize: '15px',
    [theme.breakpoints.down('sm')]: {
      width: '80%',
      fontSize: '14px',
    },
  },
  fieldTag: {
    width: '300px',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  fieldTagRadio: {
    width: '120px',
    [theme.breakpoints.down('sm')]: {
      marginLeft: '0',
      width: '120px',
      height: '34px',
    },
  },
  formRadioGroup: {
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      flexDirection: 'column',
    },
  },
  textAreaStyle: {
    width: '416px',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      height: '88px',
    },
  },
  childRadio: {
    display: 'flex',
    marginLeft: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      flexDirection: 'column',
      marginLeft: '0',
    },
  },
  wrapperFromControlLabel: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  textFixAmount: {
    width: '30%',
    fontWeight: '400',
    fontSize: '15px',
    [theme.breakpoints.down('sm')]: {
      marginRight: '0',
      width: '15%',
    },
  },
  wrapAmount: {
    display: 'flex',
    flexDirection: 'row',
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      flexDirection: 'column',
      marginBottom: '10px',
    },
  },
  percentageField: {
    width: '120px',
    [theme.breakpoints.down('sm')]: {
      marginLeft: '0',
      width: '50px',
      height: '34px',
    },
  },
  titleFixAmount: {
    fontSize: '14px',
  },
  panelPurpose: {
    backgroundColor: '#F3F4F4',
    padding: 1,
    margin: 30,
  },
}));
export default function FormAircraft({ handleForm, stateForm }) {
  const classes = useStyles();
  return (
    <>
      <div className={classes.containerForm}>
        <form className={classes.root} noValidate autoComplete="off">
          <Grid container>
            <Grid item sm={1} md={6} xs={1}>
              <div>
                <div className={classes.inputGroup}>
                  <Typography
                    className={classes.labelForm}
                    color="textPrimary"
                    variant="h6"
                    component="label"
                  >
                    Preset Name <span style={{ color: 'red' }}>*</span>
                  </Typography>
                  <TextField
                    value={stateForm?.presetName || ''}
                    onChange={handleForm}
                    name="presetName"
                    required
                    className={classes.fieldTag}
                    id="outlined-basic"
                    variant="outlined"
                    size="small"
                  />
                </div>
                <div className={classes.inputGroup}>
                  <Typography
                    className={classes.labelForm}
                    color="textPrimary"
                    variant="h6"
                    component="label"
                  >
                    Model
                  </Typography>
                  <TextField
                    value={stateForm?.presetName || ''}
                    onChange={handleForm}
                    name="presetName"
                    required
                    className={classes.fieldTag}
                    id="outlined-basic"
                    variant="outlined"
                    size="small"
                  />
                </div>
              </div>
            </Grid>
            <Grid item sm={1} md={6} xs={1}>
              <div className={classes.panelPurpose}>
                <div>
                  <div className={classes.inputGroup}>
                    <Typography color="textPrimary" variant="h5" component="h1">
                      For Interface Purpose
                    </Typography>
                  </div>
                </div>
                <div className={classes.inputGroup}>
                  <Typography
                    className={classes.labelForm}
                    color="textPrimary"
                    variant="h6"
                    component="label"
                  >
                    Aircraft Code
                  </Typography>
                  <TextField
                    value={stateForm?.presetName || ''}
                    onChange={handleForm}
                    name="presetName"
                    required
                    className={classes.fieldTag}
                    id="outlined-basic"
                    variant="outlined"
                    size="small"
                  />
                </div>
                <div className={classes.inputGroup}>
                  <Typography
                    className={classes.labelForm}
                    color="textPrimary"
                    variant="h6"
                    component="label"
                  >
                    ICAO Code
                  </Typography>
                  <TextField
                    value={stateForm?.presetName || ''}
                    onChange={handleForm}
                    name="presetName"
                    required
                    className={classes.fieldTag}
                    id="outlined-basic"
                    variant="outlined"
                    size="small"
                  />
                </div>
              </div>
            </Grid>
          </Grid>
        </form>
      </div>
    </>
  );
}
