import React, { useState } from 'react';
import { makeStyles, TextField, Typography, Button } from '@material-ui/core';

import Warning from '../../../../assets/icons/warning.svg';
import FormStyle from './Form-Style';

export default function Form({ handleForm, stateForm, read = false }) {
  const [changeBgind, setChangeBgInd] = useState(true);
  const [changeBgCh, setChangeBgCh] = useState(false);

  const handleChangeBgInd = (e) => {
    setChangeBgInd(changeBgCh);
    setChangeBgCh(changeBgind);
  };
  const handleChangeBgCh = (e) => {
    setChangeBgCh(changeBgind);
    setChangeBgInd(changeBgCh);
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
                Region Name <span style={{ color: 'red' }}>*</span>
              </Typography>
              <TextField
                value={stateForm?.region_name || ''}
                onChange={handleForm}
                name="region_name"
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
                Region Code <span style={{ color: 'red' }}>*</span>
              </Typography>
              <TextField
                InputProps={{
                  readOnly: read === true ? true : false,
                }}
                value={stateForm?.region_code || ''}
                onChange={handleForm}
                name="region_code"
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
                    value={stateForm?.presetName || ''}
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
      </div>
    </>
  );
}
