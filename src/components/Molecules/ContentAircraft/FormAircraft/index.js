import { Button, TextField, Typography } from '@material-ui/core';
import { GRID_COLUMN_HEADER_SEPARATOR_RESIZABLE_CSS_CLASS } from '@material-ui/data-grid';
import React, { useState } from 'react';
import Warning from '../../../../assets/icons/warning.svg';
import FormStyle from './Form-Style';

export default function Form({
  handleForm,
  stateForm,
  onClick,
  read = false,
  detailPage = false,
  dataLanguage,
  handleLanguage,
  stateLanguage,
  urlCancel,
}) {
  const [nameLanguage, setNameLanguage] = useState('');

  const changeLanguage = (value) => {
    setNameLanguage(value);
  };

  const classes = FormStyle();
  return (
    <>
      <div className={classes.containerForm}>
        <form className={classes.root} noValidate autoComplete="off">
          <div className={classes.wrapInputAircraft}>
            <div className={classes.inputGroupAirCraftName}>
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
            <div className={classes.inputGroupModel}>
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
              className={classes.titleInterface}
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
            <div className={classes.inputGroup}>
              <Typography
                className={classes.titleForm}
                color="textPrimary"
                variant="h6"
                component="label"
              >
                ICAO Code
              </Typography>
              <TextField
                InputProps={{
                  readOnly: read === true ? true : false,
                }}
                value={stateForm?.icao_code || ''}
                onChange={handleForm}
                name="icao_code"
                required
                className={classes.inputTag}
                id="outlined-basic"
                variant="outlined"
                size="small"
              />
            </div>
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
                  <div className={classes.wrapperTransalation}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      {dataLanguage?.map((e) => {
                        return (
                          <Button
                            onClick={() => changeLanguage(e.language_code)}
                            variant="outlined"
                            className={classes.buttonIndonesia}
                            style={{
                              backgroundColor:
                                nameLanguage === e.language_code
                                  ? '#e7e6efd9'
                                  : 'white',
                            }}
                          >
                            {e.language_name}
                          </Button>
                        );
                      })}
                    </div>

                    <div>
                      {dataLanguage?.map((e) => {
                        let indexElement = stateLanguage.findIndex(
                          (element) => {
                            // eslint-disable-next-line no-unused-expressions
                            return element.language_code === e.language_code;
                          },
                        );
                        return nameLanguage === e.language_code ? (
                          <TextField
                            InputProps={{
                              readOnly: read === true ? true : false,
                            }}
                            value={
                              stateLanguage[indexElement]?.aircraft_name || ''
                            }
                            onChange={handleLanguage}
                            name={e.language_code}
                            required
                            className={classes.inputTag}
                            id="outlined-basic"
                            variant="outlined"
                            size="small"
                            type="text"
                            placeholder={e.language_code}
                          />
                        ) : (
                          ''
                        );
                      })}

                      {/* <TextField
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
                      /> */}
                    </div>
                  </div>
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
          {detailPage ? (
            ''
          ) : (
            <Button
              onClick={onClick}
              variant="contained"
              className={classes.buttonSave}
            >
              Save
            </Button>
          )}
          <Button
            href={urlCancel}
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
