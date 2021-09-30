import React, { useState, useRef } from 'react';
import { Container, Grid, makeStyles, Typography } from '@material-ui/core';
import { Bookmark, Home, Storefront } from '@material-ui/icons';
import useOnClickOutside from '../../../hooks/useOnClickOutside';
import HomeIcon from '../../../assets/icons/home-run.svg';
import { colors } from '../../../utils/colors';

function Leftbar() {
  const [showLeftBar, setShowLeftBar] = useState(false);
  console.log(showLeftBar);
  const onShowLeftBar = useRef();
  useOnClickOutside(onShowLeftBar, () => setShowLeftBar(false));

  // styling
  const useStyles = makeStyles((theme) => ({
    containerGrid: {
      top: '-55px',
      zIndex: 9999,
      height: '100vh',
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
      fontSize: '13px',
      color: colors.navbar.text,
      fontWeight: 'bold',
      [theme.breakpoints.down('sm')]: {
        display: 'none',
      },
    },
  }));

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
        <div className={classes.item}>
          {/* <Bookmark className={classes.icon} /> */}
          {/* <Typography className={classes.text}>Collections</Typography> */}
        </div>
        <div className={classes.item} ref={onShowLeftBar}>
          <Storefront className={classes.icon} />
          {showLeftBar && (
            <Typography className={classes.text}>
              Master Data Management {'>'}
            </Typography>
          )}
        </div>
      </div>
    </Grid>
  );
}

export default Leftbar;
