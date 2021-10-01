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
      width: `${showLeftBar ? '280px' : '75px'}`,
      opacity: 0.85,
      backgroundColor: colors.navbar.primary,
      color: '#555',
      border: '1px solid #ece7e7',
      paddingTop: theme.spacing(10),
      position: 'fixed',
      [theme.breakpoints.down('sm')]: {
        color: 'white',
        backgroundColor: theme.palette.primary.main,
        position: 'fixed',
      },
    },
    divGrid: {
      marginTop: 0,
      width: '100%',
      paddingLeft: '16px',
      paddingRight: '16px',
      [theme.breakpoints.down('sm')]: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',

        paddingLeft: '0px',
        paddingRight: '0px',
      },
    },
    item: {
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
        color: '#FDC300',
      },
    },
    icon: {
      color: 'white',
      width: '22px',
      height: '22px',

      marginRight: theme.spacing(1),
      [theme.breakpoints.up('sm')]: {
        fontSize: '28px',
      },
    },
    text: {
      fontSize: '15px',
      color: colors.navbar.text,
      fontWeight: 'bold',
      [theme.breakpoints.down('sm')]: {
        display: 'none',
      },
      '&:hover': {
        color: '#FDC300',
      },
    },
    textlistBar: {
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
      // marginTop: '-10px',
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
            <Typography className={classes.text}>DashBoard</Typography>
          )}
        </div>
        <div className={classes.item} ref={onShowLeftBar}>
          <Storefront className={classes.icon} />
          {showLeftBar && (
            <Typography className={classes.text} onClick={HandleCloseListBar}>
              Master Data Management
            </Typography>
          )}
        </div>
        {closelistBar &&
          listBarData.map((data) => {
            return (
              <div className={classes.listBar}>
                <a href="#" className={classes.textlistBar}>
                  {data}
                </a>
              </div>
            );
          })}
      </div>
    </Grid>
  );
}

export default Leftbar;
