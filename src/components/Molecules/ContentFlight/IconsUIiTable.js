import { makeStyles } from '@material-ui/core';
import React from 'react';
import Edit from '../../../assets/icons/edit.svg';
import Remove from '../../../assets/icons/remove.svg';

const useStyles = makeStyles(() => ({
  editIcon: {
    cursor: 'pointer',
    marginRight: '10px',
  },
  removeIcon: {
    cursor: 'pointer',
  },
}));

const ActionButton = () => {
  const classes = useStyles();
  return (
    <div>
      <img
        id="editIcon"
        className={classes.editIcon}
        src={Edit}
        alt="edit icon"
        title="Click to edit"
      />
      <img
        id="removeIcon"
        className={classes.removeIcon}
        src={Remove}
        alt="edit icon"
        title="Click to remove"
      />
    </div>
  );
};

export default ActionButton;
