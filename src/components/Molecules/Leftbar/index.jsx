import React, { useState, useRef, useEffect } from 'react';
import { Grid, makeStyles, Typography } from '@material-ui/core';
import { Storefront } from '@material-ui/icons';
import useOnClickOutside from '../../../hooks/useOnClickOutside';
import HomeIcon from '../../../assets/icons/home-run.svg';
import { colors } from '../../../utils/colors';

function Leftbar() {
  const [closelistBar, setCloseListBar] = useState(false);
  const [showLeftBar, setShowLeftBar] = useState(false);

  const onShowLeftBar = useRef();

  useOnClickOutside(
    onShowLeftBar,
    () => setCloseListBar(false) || setShowLeftBar(false),
  );
  // useOnClickOutside(onShowListBar, () => setListBar(false));

  // styling
  const useStyles = makeStyles((theme) => ({
    // container
    containerGrid: {
      top: '-55px',
      zIndex: 9999,
      height: '150vh',
      width: `${showLeftBar ? '320px' : '75px'}`,
      opacity: 0.85,
      backgroundColor: colors.navbar.primary,
      color: '#555',
      border: '1px solid #ece7e7',
      paddingTop: theme.spacing(10),
      position: 'fixed',
      paddingLeft: '25px',
      paddingRight: `${showLeftBar ? '320px' : '25px'}`,
      // [theme.breakpoints.down('sm')]: {
      //   color: 'white',
      //   backgroundColor: theme.palette.primary.main,
      //   position: 'fixed',
      // },
    },
    divGrid: {
      marginTop: 0,
      width: '100%',
      [theme.breakpoints.down('sm')]: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',

        paddingLeft: '0px',
        paddingRight: '0px',
      },
    },
    item: {
      width: '300px',

      display: 'flex',
      alignItems: 'center',
      '&:focus': {
        backgroundColor: colors.navbar.hoverNavbar,
        width: '100%',
      },
      marginBottom: theme.spacing(4),
      [theme.breakpoints.up('sm')]: {
        marginBottom: theme.spacing(3),
        cursor: 'pointer',
      },
      '&:click': {
        color: '#ffff',
      },

      '&:hover': {
        backgroundColor: `${showLeftBar ? '#FDC300' : 'transparent'}`,
        color: '#ffff',
        borderRadius: '8px',
      },
    },
    icon: {
      color: 'white',
      width: '15pt',
      height: '15pt',

      marginRight: theme.spacing(1),
      [theme.breakpoints.up('sm')]: {
        fontSize: '28px',
      },
    },
    text: {
      fontSize: '15pt',
      color: colors.navbar.text,
      fontWeight: 'bold',
      [theme.breakpoints.down('sm')]: {
        display: 'none',
      },
      '&:hover': {
        color: '#ffff',
        borderRadius: '8px',
      },
    },
    textlistBar: {
      width: '180px',
      fontSize: '15px',
      color: colors.navbar.text,
      cursor: 'pointer',
      fontWeight: 'bold',

      '&:hover': {
        color: '#FDC300',
      },
      padding: '15px 0 0 20px',
      textDecoration: 'none',
      // marginTop: '15px',
    },
    listBar: {
      display: 'flex',
      flexDirection: 'column',
      marginTop: '-25px',
      marginLeft: '25px',
    },
  }));

  const HandleCloseListBar = () => {
    setCloseListBar(!closelistBar);
  };
  const listBarData = [
    'Standard Mark up',
    'Standard Service fee',
    'Free Type',
    'Frequent Traveler Program',
    'Standar Ancillary fee',
    'Rating type',
    'Setup Flight Commision',
    'Special Date',
    'Corporate Rating',
  ];
  const classes = useStyles();
  return (
    <Grid
      item
      sm={1}
      xs={2}
      md={2}
      className={classes.containerGrid}
      onClick={() => setShowLeftBar(true)}
    >
      <div className={classes.divGrid} ref={onShowLeftBar}>
        <div className={classes.item}>
          <img src={HomeIcon} alt="iconHome" className={classes.icon} />
          {showLeftBar && (
            <Typography className={classes.text}>Dashboard</Typography>
          )}
        </div>
        <div className={classes.item} ref={onShowLeftBar}>
          <Storefront className={classes.icon} />
          {showLeftBar && (
            <Typography className={classes.text} onClick={HandleCloseListBar}>
              Master Data Management {'>'}
            </Typography>
          )}
        </div>
        <div className={classes.listBar}>
          {closelistBar &&
            listBarData.map((data) => {
              return (
                <a href="#" className={classes.textlistBar}>
                  {data}
                </a>
              );
            })}
        </div>
      </div>
    </Grid>
  );
}

export default Leftbar;
