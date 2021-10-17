import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import arrowDownWhite from '../../../../assets/icons/arrowDownWhite.svg';
import arrowUpWhite from '../../../../assets/icons/arrowUpWhite.svg';

const useStyles = makeStyles(() => ({
  dropdown: {
    width: '150px',
    marginLeft: '20px',
    marginTop: '-20px',
    position: 'relative',
  },
  dropdownBtn: {
    borderRadius: '10px',
    border: '1px solid lightGray',
    padding: '10px',
    backgroundColor: '#027F71',
    fontWeight: '600',
    fontSize: '13px',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    fontSize: '14px',
    '&:hover': {
      backgroundColor: '#027F71',
      color: 'white',
    },
  },
  dropdownContent: {
    position: 'absolute',
    top: '99%',
    left: '0',
    width: '143px',
    padding: '6px',
    backgroundColor: 'white',
    zIndex: '99999',
  },
  dropdownItem: {
    padding: '10px',
    cursor: 'pointer',
    color: '#5e5e5e',
    '&:hover': {
      backgroundColor: '#027F71',
      color: 'white',
    },
  },
}));

const ButtonDropdown = ({ select, setSelect }) => {
  const [isActive, setIsActive] = useState(false);
  const classes = useStyles();
  const options = ['Active', 'Inactive'];
  return (
    <div className={classes.dropdown}>
      <div
        className={classes.dropdownBtn}
        onClick={() => setIsActive(!isActive)}
      >
        Update Status
        <img
          src={isActive ? arrowUpWhite : arrowDownWhite}
          style={{ width: '10px', marginTop: '4px', marginLeft: '8px' }}
        />
      </div>
      {isActive && (
        <div className={classes.dropdownContent}>
          {options.map((option) => (
            <div
              className={classes.dropdownItem}
              onClick={(e) => {
                setSelect(option);
                setIsActive(false);
              }}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ButtonDropdown;
