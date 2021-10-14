import { Button, TextField, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Warning from '../../../../assets/icons/warning.svg';
import { postAircraft } from '../../../../store/actions/Reducers-Aircraft';
import FormStyle from './Form-Style';

export default function Form({ handleForm, stateForm, onClick, read = false }) {
  const [changeBgind, setChangeBgInd] = useState(true);
  const [changeBgCh, setChangeBgCh] = useState(false);

  const handleChangeBgInd = (e) => {
    setChangeBgInd(true);
    setChangeBgCh(false);
  };
  const handleChangeBgCh = (e) => {
    setChangeBgCh(true);
    setChangeBgInd(false);
  };

  const classes = FormStyle();
  return (
    <>
      <div className={classes.containerForm}>
        <form className={classes.root} noValidate autoComplete="off">
          <div className={classes.wrapInputAircraft}>
            <div className={classes.inputGroup}>
              <Typography
                className={classes.labelForm}
                color="textPrimary"
                variant="h6"
                component="label"
              >
                Aircraft Name <span style={{ color: 'red' }}>*</span>
              </Typography>
              <TextField
                value={stateForm?.aircraft_name || ''}
                onChange={handleForm}
                name="aircraft_name"
                required
                InputProps={{
                  readOnly: read === true ? true : false,
                }}
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
                value={stateForm?.model || ''}
                onChange={handleForm}
                name="model"
                required
                InputProps={{
                  readOnly: read === true ? true : false,
                }}
                className={classes.fieldTag}
                id="outlined-basic"
                variant="outlined"
                size="small"
              />
            </div>
          </div>

          <div className={classes.panelPurpose}>
            <Typography
              color="textPrimary"
              variant="h5"
              component="h1"
              className={classes.TitleInterface}
            >
              For Interface Purpose
            </Typography>
            <div className={classes.inputGroup}>
              <Typography
                className={classes.titleForm}
                color="textPrimary"
                variant="h6"
                component="label"
              >
                Aircraft Code <span style={{ color: 'red' }}>*</span>
              </Typography>
              <TextField
                InputProps={{
                  readOnly: read === true ? true : false,
                }}
                value={stateForm?.aircraft_code || ''}
                onChange={handleForm}
                name="aircraft_code"
                required
                className={classes.inputTag}
                id="outlined-basic"
                variant="outlined"
                size="small"
                type="number"
              />
            </div>
            {/* <div className={classes.inputGroup}>
              <Typography
                className={classes.titleForm}
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
                className={classes.inputTag}
                id="outlined-basic"
                variant="outlined"
                size="small"
              />
            </div> */}
          </div>
        </form>

        {/* form Translation */}
        <div className={classes.wrapperTranslation}>
          <div className={classes.contentTrans}>
            <Typography
              color="textPrimary"
              variant="h5"
              component="h1"
              className={classes.TitleInterface}
            >
              Translation
            </Typography>
            <div>
              <div className={classes.wrapperTrans}>
                <div className={classes.wrapperButton}>
                  <Button
                    onClick={handleChangeBgInd}
                    variant="outlined"
                    className={classes.buttonIndonesia}
                    style={{
                      backgroundColor: changeBgind ? '#e7e6efd9' : 'white',
                    }}
                  >
                    Indonesia
                  </Button>
                  <Button
                    onClick={handleChangeBgCh}
                    variant="outlined"
                    className={classes.buttonChinese}
                    style={{
                      backgroundColor: changeBgCh ? '#e7e6efd9' : 'white',
                    }}
                  >
                    Chinese Simplifield
                    <img src={Warning} />
                  </Button>
                </div>
                {/* <div className={classes.wrapperForm}>
                  <Typography
                    className={classes.titleAircraft}
                    color="textPrimary"
                    variant="h6"
                    component="label"
                  >
                    Aircraft Name
                  </Typography>
                  <TextField
                    value={stateFdataAircraftorm?.presetName || ''}
                    onChange={handleForm}
                    name="presetName"
                    required
                    className={classes.fieldTag}
                    id="outlined-basic"
                    variant="outlined"
                    size="small"
                  />
                </div> */}
              </div>
              <Typography className={classes.noted}>
                <i>
                  Note <img src={Warning} /> Incomplete data
                </i>
              </Typography>
            </div>
          </div>
        </div>
        <div
          display="flex"
          flexDirection="row"
          style={{ marginTop: '20px', margin: '30px 27px 0 22px' }}
        >
          <Button
            onClick={onClick}
            variant="contained"
            className={classes.buttonSave}
          >
            Save
          </Button>
          <Button
            href="/aircraft"
            variant="contained"
            className={classes.buttonCancel}
          >
            Cancel
          </Button>
        </div>
      </div>
    </>
  );
}
