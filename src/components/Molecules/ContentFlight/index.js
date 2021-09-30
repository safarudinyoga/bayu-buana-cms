import React, { useState } from 'react';
import {
  Breadcrumbs,
  Link,
  makeStyles,
  Typography,
  AppBar,
  Tabs,
  Tab,
  Box,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { Chat, FlightTakeoff, Hotel } from '@material-ui/icons';
import Uitable from '../../Atoms/UItable';
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(11),
    marginRight: theme.spacing(7),
    marginLeft: theme.spacing(3),
  },
  titleBread: {
    [theme.breakpoints.down('sm')]: {
      fontSize: '12px',
    },
  },
  title: {
    marginTop: theme.spacing(2),
  },
  containerTable: {
    marginTop: theme.spacing(6),
    border: '0.5px solid #E6E6E6',
    boxShadow: '2px 2px #F0F0F0',
  },
  // hapus
  HeaderTable: {
    display: 'flex',
  },
  // hapus
  logoTable: {
    display: 'flex',
    alignItems: 'center',
    borderTop: '2px solid red',
    marginRight: theme.spacing(2),
    // borderTop: (props)=>(props.active ? '2px solid red' :''),
  },
  // hapus
  fontLogo: {
    fontSize: '18px',
    paddingLeft: theme.spacing(2),
  },
  table: {
    minWidth: 650,
  },
  containerBodyTable: {
    [theme.breakpoints.up('sm')]: {
      margin: theme.spacing(0),
    },
  },
  paperTable: {
    width: '100%',
  },
  TableContainer: {
    maxHeight: 440,
  },
  rootTab: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  appBar: {
    backgroundColor: '#f5f5f5',
  },
  tab: {
    '&:focus': {
      borderTop: '3px solid white',
      backgroundColor: '#f1f1f1',
    },
    boxShadow: '4px 0 8px #00000029;',
    flexDirection: 'row',
    color: '#333',
  },
}));

function Content() {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className={classes.container}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link className={classes.titleBread} color="inherit" href="/">
          Master Data Management
        </Link>
        <Typography className={classes.titleBread} color="textPrimary">
          Standard Mark-Up
        </Typography>
      </Breadcrumbs>
      <div className={classes.title}>
        <Typography color="textPrimary" variant="h5" component="h1">
          Standard Mark-Up
        </Typography>
      </div>
      <div className={classes.containerTable}>
        <div className={classes.rootTab}>
          <AppBar className={classes.appBar} position="static">
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="simple tabs example"
            >
              <Tab
                className={classes.tab}
                icon={<FlightTakeoff />}
                label="Flight"
                {...a11yProps(0)}
              />
              <Tab
                className={classes.tab}
                icon={<Hotel />}
                label="Hotel"
                {...a11yProps(1)}
              />
              <Tab
                className={classes.tab}
                icon={<Chat />}
                label="Other"
                {...a11yProps(2)}
              />
            </Tabs>
          </AppBar>
          <TabPanel value={value} index={0}>
            <div className={classes.containerBodyTable}>
              <Uitable />
            </div>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <div className={classes.containerBodyTable}>
              <Uitable />
            </div>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <div className={classes.containerBodyTable}>
              <Uitable />
            </div>
          </TabPanel>
        </div>
      </div>
    </div>
  );
}

export default Content;
