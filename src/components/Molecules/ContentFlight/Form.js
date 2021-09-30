import React from 'react';
import {
  makeStyles,
  Typography,
  TextField,
  TextareaAutosize,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(11),
    marginRight: theme.spacing(7),
    marginLeft: theme.spacing(3),
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
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    margin: '40px 34px',
  },
  labelForm: {
    width: '30%',
    fontWeight: '400',
    fontSize: '15px',
  },
  fieldTag: {
    width: '300px',
  },
  fieldTagRadio: {
    width: '120px',
  },
  formRadioGroup: {
    display: 'flex',
    flexDirection: 'column',
  },
  textAreaStyle: {
    width: '416px',
  },
}));
export default function Form() {
  const classes = useStyles();
  return (
    <>
      <div className={classes.containerForm}>
        <form className={classes.root} noValidate autoComplete="off">
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
              Description
            </Typography>
            <TextareaAutosize
              className={classes.textAreaStyle}
              aria-label="minimum height"
              minRows={4}
            />
          </div>
          <div className={classes.inputGroup}>
            <Typography
              className={classes.labelForm}
              color="textPrimary"
              variant="h6"
              component="label"
            >
              Domestic Flight Mark Up <span style={{ color: 'red' }}>*</span>
            </Typography>
            <RadioGroup
              row
              aria-label="position"
              name="position"
              defaultValue="top"
            >
              <div width="100%" className={classes.formRadioGroup}>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <div>
                    {' '}
                    <FormControlLabel
                      value="fixedAmount"
                      control={<Radio color="primary" />}
                      label="Fixed Amount"
                    />
                    <div style={{ display: 'flex' }}>
                      <div style={{ marginRight: 10 }}>
                        <Typography
                          className={classes.labelForm}
                          color="textPrimary"
                          variant="h6"
                          component="label"
                          style={{ marginRight: 10 }}
                        >
                          IDR
                        </Typography>
                        <TextField
                          className={classes.fieldTagRadio}
                          id="outlined-basic"
                          variant="outlined"
                          size="small"
                        />
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <FormControlLabel
                          value="ticket"
                          control={<Radio color="primary" />}
                          label="Ticket"
                        />
                        <FormControlLabel
                          value="person"
                          control={<Radio color="primary" />}
                          label="Person"
                        />
                        <FormControlLabel
                          value="transaction"
                          control={<Radio color="primary" />}
                          label="Transaction"
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <FormControlLabel
                      value="fixedAmount"
                      control={<Radio color="primary" />}
                      label="Fixed Amount"
                    />
                    <div style={{ display: 'flex' }}>
                      <div style={{ marginRight: 10 }}>
                        <TextField
                          className={classes.fieldTagRadio}
                          id="outlined-basic"
                          variant="outlined"
                          size="small"
                        />
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <FormControlLabel
                          value="includeTaxes"
                          control={<Radio color="primary" />}
                          label="Include Taxes"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </RadioGroup>
          </div>
          <div className={classes.inputGroup}>
            <Typography
              className={classes.labelForm}
              color="textPrimary"
              variant="h6"
              component="label"
            >
              International Flight Mark Up{' '}
              <span style={{ color: 'red' }}>*</span>
            </Typography>
            <RadioGroup
              row
              aria-label="position"
              name="position"
              defaultValue="top"
            >
              <div width="100%" className={classes.formRadioGroup}>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <div>
                    {' '}
                    <FormControlLabel
                      value="fixedAmount"
                      control={<Radio color="primary" />}
                      label="Fixed Amount"
                    />
                    <div style={{ display: 'flex' }}>
                      <div style={{ marginRight: 10 }}>
                        <Typography
                          className={classes.labelForm}
                          color="textPrimary"
                          variant="h6"
                          component="label"
                          style={{ marginRight: 10 }}
                        >
                          IDR
                        </Typography>
                        <TextField
                          className={classes.fieldTagRadio}
                          id="outlined-basic"
                          variant="outlined"
                          size="small"
                        />
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <FormControlLabel
                          value="ticket"
                          control={<Radio color="primary" />}
                          label="Ticket"
                        />
                        <FormControlLabel
                          value="person"
                          control={<Radio color="primary" />}
                          label="Person"
                        />
                        <FormControlLabel
                          value="transaction"
                          control={<Radio color="primary" />}
                          label="Transaction"
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <FormControlLabel
                      value="fixedAmount"
                      control={<Radio color="primary" />}
                      label="Fixed Amount"
                    />
                    <div style={{ display: 'flex' }}>
                      <div style={{ marginRight: 10 }}>
                        <TextField
                          className={classes.fieldTagRadio}
                          id="outlined-basic"
                          variant="outlined"
                          size="small"
                        />
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <FormControlLabel
                          value="includeTaxes"
                          control={<Radio color="primary" />}
                          label="Include Taxes"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </RadioGroup>
          </div>
        </form>
      </div>
    </>
  );
}
