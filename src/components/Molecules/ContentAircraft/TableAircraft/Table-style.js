import { alpha } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

// eslint-disable-next-line no-undef
export default makeStyles((theme) => ({
  paperTable: {
    width: '100%',
    backgroundColor: 'white',
  },
  TableContainer: {
    maxHeight: 440,
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    // eslint-disable-next-line no-undef
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      // eslint-disable-next-line no-undef
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 'auto',
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: '20px',
      marginBottom: '10px',
    },
    border: '1px solid #D9DFE7',
    display: 'flex',
    flexDirection: 'row',
  },
  wrapperSearchDropdown: {
    display: 'flex',
    flexDirection: 'row',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  controlTable: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column-reverse',
    },
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
    },
  },
  itemStart: {
    display: 'flex',
    flexDirection: 'row',
  },
  itemEnd: {
    display: 'flex',
    flexDirection: 'row-reverse',
  },
  buttonAdd: {
    backgroundColor: '#F3C244',
    color: '#5E5E5E',
    fontSize: '14px',
    padding: '8px 10px',
    borderRadius: '8px',
    textTransform: 'capitalize',
    '&:hover': {
      backgroundColor: '#F3C244',
      boxShadow: '0px 4px 4px #00000069',
    },
  },
  buttonRounded: {
    backgroundColor: '#5E5E5E',
    color: '#fff',
    padding: '14px 14px',
    borderRadius: '300px',
    width: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 10,
    marginRight: 8,
    textTransform: 'capitalize',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#5E5E5E',
      boxShadow: '0px 4px 4px #00000069',
    },
  },
  startIcon: {
    paddingLeft: '6px',
  },
  divButton: {
    display: 'flex',
    flex: 'row',
    alignItems: 'center',
  },
  dropdown: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    minWidth: '300px',
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'flex-end',
      minWidth: '0',
    },
    [theme.breakpoints.up('sm')]: {
      minWidth: '180px',
      justifyContent: 'center',
      // marginLeft: '100px',
    },
  },
  modal: {
    width: 'auto',
    height: '100px',
    backgroundColor: '#f5f5f5',
    borderRadius: '10px',
    border: '2px solid lightGray',
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '20px',
  },
  modalHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '10px',
    marginBottom: '10px',
  },
  statusActive: {
    width: '60px',
    height: '40px',
    backgroundColor: 'white',
    minWidth: 150,
    marginLeft: '25px',
    alignItems: 'center',
    marginTop: '-20px',
    fontSize: '14px',
    borderRadius: '10px',
  },
  buttonActive: {
    width: '60px',
    height: '40px',
    backgroundColor: '#5e5e5e',
    color: 'white',
    minWidth: 150,
    marginLeft: '25px',
    alignItems: 'center',
    fontSize: '14px',
    borderRadius: '10px',
    [theme.breakpoints.down('sm')]: {
      marginLeft: '0px',
      marginBottom: '10px',
    },
  },
  buttonSpace: {
    marginBottom: '20px',
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      flexDirection: 'column',
    },
  },
  buttonRemove: {
    width: '150px',
    height: '40px',
    backgroundColor: '#5e5e5e',
    color: 'white',
    borderRadius: '10px',
    marginLeft: '10px',
    fontSize: '14px',
    textTransform: 'capitalize',
    [theme.breakpoints.down('sm')]: {
      marginLeft: '0px',
    },
  },
}));
