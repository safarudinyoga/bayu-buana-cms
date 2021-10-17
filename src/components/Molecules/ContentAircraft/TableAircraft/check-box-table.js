import React from 'react';
import { Checkbox } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  button: {
    backgroundColor: 'transparent',
    border: 'none',
  },
  checkBox: {
    width: '0px',
    height: '0px',
    backgroundColor: 'white',
    borderRadius: '4px',
    color: '#4d4d4d',
  },
}));

const CheckBoxTable = ({ onChange, onClick, checked }) => {
  const labelCheckbox = { inputProps: { 'aria-label': 'Checkbox demo' } };
  const classes = useStyles();
  return (
    <button onClick={onClick} className={classes.button}>
      <Checkbox
        color="black"
        {...labelCheckbox}
        checked={checked}
        onChange={onChange}
        className={classes.checkBox}
      />
    </button>
  );
};

export default CheckBoxTable;
