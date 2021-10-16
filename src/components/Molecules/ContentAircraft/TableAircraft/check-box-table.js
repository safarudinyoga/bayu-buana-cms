import React from 'react';
import { Checkbox } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  button: {
    backgroundColor: 'transparent',
    border: 'none',
  },
}));

const CheckBoxTable = ({ onChange, checked, onClick }) => {
  const labelCheckbox = { inputProps: { 'aria-label': 'Checkbox demo' } };
  const classes = useStyles();
  return (
    <button onClick={onClick} className={classes.button}>
      <Checkbox
        color="black"
        checked={checked}
        {...labelCheckbox}
        onChange={onChange}
        className={classes.checkBox}
      />
    </button>
  );
};

export default CheckBoxTable;
