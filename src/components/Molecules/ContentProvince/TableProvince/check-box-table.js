import {Checkbox} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
import React from 'react';

const useStyles = makeStyles(() => ({
    button: {
        backgroundColor: 'transparent',
        border: 'none',
    },
}));

const CheckBoxTable = ({onChange, checked, indeterminate, onClick}) => {
    const labelCheckbox = {inputProps: {'aria-label': 'Checkbox demo'}};
    const classes = useStyles();
    return (
        <button onClick={onClick} className={classes.button}>
            <Checkbox
                color="black"
                checked={checked}
                {...labelCheckbox}
                onChange={onChange}
                className={classes.checkBox}
                indeterminate={indeterminate}
            />
        </button>
    );
};

export default CheckBoxTable;
