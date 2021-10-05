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
  root: {
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
    width: '30%',
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
              <div width="100vw" className={classes.formRadioGroup}>
                {/* pembuka idr */}
                <div className={classes.wrapAmount}>
                  <div>
                    {' '}
                    <FormControlLabel
                      className={classes.titleFixAmount}
                      onChange={handleForm}
                      checked={stateForm.typeDomestic === 'fixedAmountDomestic'}
                      name="typeDomestic"
                      value="fixedAmountDomestic"
                      control={<Radio color="primary" />}
                      label="Fix Amount"
                    />
                    {/* Idr dan percentage */}
                    <div className={classes.childRadio}>
                      <div>
                        <div
                          style={{
                            marginRight: 10,
                            display: 'flex',
                            alignItems: 'center',
                          }}
                        >
                          <Typography
                            className={classes.textFixAmount}
                            color="textPrimary"
                            variant="h6"
                            component="label"
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
                          <p style={{ fontSize: '14px', marginLeft: '5px' }}>
                            /Ticket
                          </p>
                        </div>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <FormControlLabel
                          className={classes.wrapperFromControlLabel}
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
                          className={classes.wrapperFromControlLabel}
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
                          className={classes.wrapperFromControlLabel}
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
                </div>
                {/* penutup idr */}

                {/* pembuka Percentage */}
                <div className={classes.wrapAmount}>
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
                        className={classes.percentageField}
                        id="outlined-basic"
                        variant="outlined"
                        size="small"
                      />
                      <Typography
                        className={classes.textFixAmount}
                        color="textPrimary"
                        variant="h6"
                        component="label"
                        style={{ marginLeft: 10 }}
                      >
                        %
                      </Typography>

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
                {/* penutup tag percentage */}
                {/* penutup domestic Amount */}
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
                {/* pembuka fix amount 2 */}
                <div className={classes.wrapAmount}>
                  <div>
                    {' '}
                    <FormControlLabel
                      onChange={handleForm}
                      className={classes.titleFixAmount}
                      checked={stateForm.typeDomestic === 'fixedAmountDomestic'}
                      name="typeDomestic"
                      value="fixedAmountDomestic"
                      control={<Radio color="primary" />}
                      label="Fix Amount"
                    />
                    {/* pembuka Idr  2 */}
                    <div className={classes.childRadio}>
                      <div>
                        <div
                          style={{
                            marginRight: 10,
                            display: 'flex',
                            alignItems: 'center',
                          }}
                        >
                          <Typography
                            className={classes.textFixAmount}
                            color="textPrimary"
                            variant="h6"
                            component="label"
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
                          <p style={{ fontSize: '14px', marginLeft: '5px' }}>
                            /Ticket
                          </p>
                        </div>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <FormControlLabel
                          className={classes.wrapperFromControlLabel}
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
                          className={classes.wrapperFromControlLabel}
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
                          className={classes.wrapperFromControlLabel}
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
                </div>
                {/* penutup idr 2 */}
                {/* pembuka Percentage 2 */}
                <div className={classes.wrapAmount}>
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
                        className={classes.percentageField}
                        id="outlined-basic"
                        variant="outlined"
                        size="small"
                      />
                      <Typography
                        className={classes.textFixAmount}
                        color="textPrimary"
                        variant="h6"
                        component="label"
                        style={{ marginLeft: 10 }}
                      >
                        %
                      </Typography>

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
                {/* penutup tag percentage 2*/}
              </div>
            </RadioGroup>
          </div>
        </form>
      </div>
    </>
  );
}