import React from 'react';
import { Checkbox } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  button: {
    backgroundColor: 'transparent',
    border: 'none',
  },
  checkBox: {
    // backgroundColor: 'white',
    // color: 'white',
  },
}));

const CheckBoxTable = ({ onChange, onClick }) => {
  const labelCheckbox = { inputProps: { 'aria-label': 'Checkbox demo' } };
  const classes = useStyles();
  return (
    <button onClick={onClick} className={classes.button}>
      <Checkbox
        color="black"
        {...labelCheckbox}
        onChange={onChange}
        className={classes.checkBox}
      />
    </button>
  );
};

export default CheckBoxTable;
