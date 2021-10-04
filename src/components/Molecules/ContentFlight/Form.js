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
    margin: '40px 34px',
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      flexDirection: 'column',
    },
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
  childRadio: {
    display: 'flex',
    marginLeft: theme.spacing(4),
  },
}));
export default function Form({ handleForm, stateForm }) {
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
              Description
            </Typography>
            <TextareaAutosize
              onChange={handleForm}
              value={stateForm?.description || ''}
              name="description"
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
                      onChange={handleForm}
                      checked={stateForm.typeDomestic === 'fixedAmountDomestic'}
                      name="typeDomestic"
                      value="fixedAmountDomestic"
                      control={<Radio color="primary" />}
                      label="Fixed Amount"
                    />
                    <div className={classes.childRadio}>
                      <div style={{ marginRight: 10 }}>
                        <div
                          style={{
                            marginRight: 10,
                            display: 'flex',
                            alignItems: 'center',
                          }}
                        >
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
                            onChange={handleForm}
                            value={stateForm?.idrDomestic || ''}
                            name="idrDomestic"
                            className={classes.fieldTagRadio}
                            id="outlined-basic"
                            variant="outlined"
                            size="small"
                          />
                        </div>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <FormControlLabel
                          onChange={handleForm}
                          checked={
                            stateForm.typeIdrDomestic === 'ticketDomestic'
                          }
                          name="typeIdrDomestic"
                          value="ticketDomestic"
                          control={<Radio color="primary" />}
                          label="Ticket"
                        />
                        <FormControlLabel
                          onChange={handleForm}
                          checked={
                            stateForm.typeIdrDomestic === 'personDomestic'
                          }
                          name="typeIdrDomestic"
                          value="personDomestic"
                          control={<Radio color="primary" />}
                          label="Person"
                        />
                        <FormControlLabel
                          onChange={handleForm}
                          checked={
                            stateForm.typeIdrDomestic === 'transactionDomestic'
                          }
                          name="typeIdrDomestic"
                          value="transactionDomestic"
                          control={<Radio color="primary" />}
                          label="Transaction"
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <FormControlLabel
                      onChange={handleForm}
                      checked={stateForm.typeDomestic === 'percentageDomestic'}
                      name="typeDomestic"
                      value="percentageDomestic"
                      control={<Radio color="primary" />}
                      label="Percentage"
                    />
                    <div className={classes.childRadio}>
                      <div
                        style={{
                          marginRight: 10,
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        <TextField
                          onChange={handleForm}
                          value={stateForm?.percentDomestic || ''}
                          name="percentDomestic"
                          className={classes.fieldTagRadio}
                          id="outlined-basic"
                          variant="outlined"
                          size="small"
                        />
                        <Typography
                          className={classes.labelForm}
                          color="textPrimary"
                          variant="h6"
                          component="label"
                          style={{ marginLeft: 10 }}
                        >
                          %
                        </Typography>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <FormControlLabel
                          onChange={handleForm}
                          checked={
                            stateForm.includeTaxesDomestics ===
                            'includeTaxesDomestic'
                          }
                          name="includeTaxesDomestic"
                          value="includeTaxesDomestic"
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
                      onChange={handleForm}
                      checked={
                        stateForm.typeInternational ===
                        'fixedAmountInternational'
                      }
                      name="typeInternational"
                      value="fixedAmountInternational"
                      control={<Radio color="primary" />}
                      label="Fixed Amount"
                    />
                    <div className={classes.childRadio}>
                      <div style={{ marginRight: 10 }}>
                        <div
                          style={{
                            marginRight: 10,
                            display: 'flex',
                            alignItems: 'center',
                          }}
                        >
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
                            onChange={handleForm}
                            value={stateForm?.idrInternational || ''}
                            name="idrInternational"
                            className={classes.fieldTagRadio}
                            id="outlined-basic"
                            variant="outlined"
                            size="small"
                          />
                        </div>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <FormControlLabel
                          onChange={handleForm}
                          checked={
                            stateForm.typeIdrInternational ===
                            'ticketInternational'
                          }
                          name="typeIdrInternational"
                          value="ticketInternational"
                          control={<Radio color="primary" />}
                          label="Ticket"
                        />
                        <FormControlLabel
                          onChange={handleForm}
                          checked={
                            stateForm.typeIdrInternational ===
                            'personInternational'
                          }
                          name="typeIdrInternational"
                          value="personInternational"
                          control={<Radio color="primary" />}
                          label="Person"
                        />
                        <FormControlLabel
                          onChange={handleForm}
                          checked={
                            stateForm.typeIdrInternational ===
                            'transactionInternational'
                          }
                          name="typeIdrInternational"
                          value="transactionInternational"
                          control={<Radio color="primary" />}
                          label="Transaction"
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <FormControlLabel
                      onChange={handleForm}
                      checked={
                        stateForm.typeInternational ===
                        'percentageInternational'
                      }
                      name="typeInternational"
                      value="percentageInternational"
                      control={<Radio color="primary" />}
                      label="Percentage"
                    />
                    <div className={classes.childRadio}>
                      <div
                        style={{
                          marginRight: 10,
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        <TextField
                          onChange={handleForm}
                          value={stateForm?.percentInternational || ''}
                          name="percentInternational"
                          className={classes.fieldTagRadio}
                          id="outlined-basic"
                          variant="outlined"
                          size="small"
                        />
                        <Typography
                          className={classes.labelForm}
                          color="textPrimary"
                          variant="h6"
                          component="label"
                          style={{ marginLeft: 10 }}
                        >
                          %
                        </Typography>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <FormControlLabel
                          onChange={handleForm}
                          checked={
                            stateForm.includeTaxesInternational ===
                            'includeTaxesInternational'
                          }
                          name="includeTaxesInternational"
                          value="includeTaxesInternational"
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
