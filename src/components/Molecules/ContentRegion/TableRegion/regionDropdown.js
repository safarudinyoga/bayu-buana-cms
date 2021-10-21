import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import arrowDown from '../../../../assets/icons/arrowDown.svg';
import arrowUp from '../../../../assets/icons/arrowUp.svg';
import Close from '../../../../assets/icons/close.svg';

const useStyles = makeStyles((theme) => ({
  dropdown: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
    [theme.breakpoints.down('sm')]: {
      width: '195px',
      marginLeft: '20px',
      marginTop: '-20px',
      position: 'relative',
    },
  },
  dropdownBtn: {
    borderRadius: '10px',
    border: '1px solid lightGray',
    padding: '10px',
    backgroundColor: 'white',
    color: '#5e5e5e',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    cursor: 'pointer',
    fontSize: '14px',
  },
  dropdownContent: {
    position: 'absolute',
    top: '99%',
    left: '0',
    width: '186px',
    padding: '6px',
    backgroundColor: 'white',
    zIndex: '99999',
  },
  dropdownItem: {
    padding: '10px',
    cursor: 'pointer',
    color: '#5e5e5e',
    fontSize: '14px',

    '&:hover': {
      backgroundColor: '#027F71',
      color: 'white',
    },
  },
  icon: {
    marginLeft: '10px',
    width: '18px',
  },
  wrapperPicker: {
    //   width: 'auto',
    //   height: '20px',
    //   backgroundColor: 'red',
    // borderRadius: '4px',
    display: 'flex',
    alignItems: 'center',
  },
}));

const RegionDropdown = ({ picker, setPicker }) => {
  const [isActive, setIsActive] = useState(false);
  const classes = useStyles();
  const options = [
    'Asia',
    'Europe',
    'Arfica',
    'North America',
    'South America',
  ];
  return (
    <div className={classes.dropdown}>
      <div
        className={classes.dropdownBtn}
        onClick={() => setIsActive(!isActive)}
      >
        <div className={classes.wrapperPicker}>
          {picker ? `${picker}` : 'Asia'}
          <img src={Close} className={classes.icon} />
        </div>
        <img
          src={isActive ? arrowUp : arrowDown}
          style={{ width: '10px', marginTop: '4px' }}
        />
      </div>
      {isActive && (
        <div className={classes.dropdownContent}>
          {options.map((option) => (
            <div
              className={classes.dropdownItem}
              onClick={(e) => {
                setPicker(option);
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

export default RegionDropdown;
