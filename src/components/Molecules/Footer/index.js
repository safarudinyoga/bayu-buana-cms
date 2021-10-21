import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  titleFooter: {
    fontSize: '13pt',
    color: '#818181',
    textAlign: 'center',
  },
  wrapperFooter: {
    marginTop: '300px',
    // textAlign: 'center',
  },
}));

const Footer = () => {
  const classes = useStyles();
  return (
    <footer className={classes.wrapperFooter}>
      <p className={classes.titleFooter}>
        &#169; Bayu Buana Travel Services. All Rights Reversed{' '}
      </p>
    </footer>
  );
};

export default Footer;
