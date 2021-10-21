import React, { useState } from 'react';
import arrowDown from '../../../../assets/icons/arrowDown.svg';
import arrowUp from '../../../../assets/icons/arrowUp.svg';
import Pagination from '@mui/material/Pagination';

// import Left from '../../../../assets/icons/left.svg';
// import Right from '../../../../assets/icons/right.svg';
import { makeStyles } from '@material-ui/styles';

const PaginationTable = ({ pickShowing, setPickShowing }) => {
  const [isActive, setIsActive] = useState(false);
  const [focus, setFocus] = useState(false);
  const options = ['10', '50'];
  const useStyles = makeStyles((theme) => ({
    wrapper: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginLeft: '20px',
    },
    wrapperLeft: {
      display: 'flex',
      flexDirection: 'row',
    },
    wrapperRight: {
      display: 'flex',
      flexDirection: 'row',
    },
    boxPagination: {
      display: 'flex',
      flexDirection: 'row',
    },
    downArrow: {
      width: '8px',
      marginTop: '4px',
      marginLeft: '6px',
    },
    // dropdownPagination: {
    //   marginTop: '6px',
    //   marginRight: '20px',
    //   display: 'flex',
    //   alignItems: 'center',
    //   justifyContent: 'center',
    //   width: '50px',
    //   height: '35px',
    //   border: '1px solid lightGray',
    //   borderRadius: '8px',
    //   cursor: 'pointer',
    // },
    descPagination: {
      fontSize: '14px',
      color: 'gray',
      marginTop: '18px',
    },
    Arrow: {
      width: '24px',
      color: 'gray',
    },
    boxImg: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '36px',
      height: '36px',
      border: '1px solid lightGray',
      marginTop: '14px',
      cursor: 'pointer',
    },
    box1: {
      width: '36px',
      height: '36px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '14px',
      backgroundColor: `${focus ? '#5e5e5e' : 'white'}`,
      color: `${focus ? 'white' : 'black'}`,
      border: '1px solid lightGray',
      marginTop: '14px',
      cursor: 'pointer',
    },
    dropdown: {
      width: '55px',
      position: 'relative',
      marginRight: '20px',
      marginTop: '6px',
    },
    dropdownBtn: {
      borderRadius: '8px',
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
      top: '90%',
      left: '0',
      width: '45px',
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
  }));
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <div className={classes.wrapperLeft}>
        <div className={classes.dropdown}>
          <div
            className={classes.dropdownBtn}
            onClick={() => setIsActive(!isActive)}
          >
            {pickShowing ? `${pickShowing}` : '10'}
            <img
              src={isActive ? arrowUp : arrowDown}
              style={{ width: '8px', marginTop: '4px' }}
            />
          </div>
          {isActive && (
            <div className={classes.dropdownContent}>
              {options.map((option) => (
                <div
                  className={classes.dropdownItem}
                  onClick={(e) => {
                    setPickShowing(option);
                    setIsActive(false);
                  }}
                >
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>

        <p className={classes.descPagination}>Showing 1 - 10 of 100</p>
      </div>
      <div className={classes.wrapperRight}>
        <Pagination count={3} variant="outlined" shape="rounded" />
      </div>
    </div>
  );
};

export default PaginationTable;
