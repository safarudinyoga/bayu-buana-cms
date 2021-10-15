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
    borderRadius: '14px',
  },
  search: {
    position: 'relative',
    borderRadius: '10px',
    // eslint-disable-next-line no-undef
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      // eslint-disable-next-line no-undef
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(4),
    marginLeft: 0,
    width: '100%',
    height: '35px',
    [theme.breakpoints.up('sm')]: {
      width: 'auto',
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: '20px',
      marginBottom: '10px',
    },
    border: '1px solid #D9DFE7',
    display: 'flex',
    flexDirection: 'row-reverse',
  },
  wrapperSearchDropdown: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
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
    color: '#D8D8D8',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '215px',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingRight: `calc(1em + ${theme.spacing(4)}px)`,
    paddingLeft: '10px',
    transition: theme.transitions.create('width'),
    width: '100%',
    fontWeight: '400',
    fontSize: '14px',
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
    fontWeight: '600',
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
    height: '10px',
    marginRight: '8px',
    textTransform: 'capitalize',
    cursor: 'pointer',
    '&:hover': {
      boxShadow: '2px 3px 6px #999',
      backgroundColor: '#5E5E5E',
      transition: '0.2s',
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
  modalTitle: {
    marginLeft: '25px',
    marginTop: '0',
    fontSize: '16px',
    fontWeight: '600',
    color: '#333333',
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
    display: 'flex',
    flexDirection: 'row',
    marginBottom: '20px',
    marginLeft: '-19px',
    marginTop: '40px',
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      flexDirection: 'column',
    },
  },
  buttonRemove: {
    width: '150px',
    height: '40px',
    backgroundColor: '#027F71',
    color: 'white',
    borderRadius: '10px',
    marginLeft: '10px',
    fontSize: '14px',
    textTransform: 'capitalize',
    marginTop: '-20px',
    [theme.breakpoints.down('sm')]: {
      marginLeft: '0px',
    },
    '&:hover': {
      backgroundColor: '#027F71',
      color: 'white',
    },
  },
  titleAdvanced: {
    fontSize: '15px',
    fontWeight: 'bold',
    color: '#333333',
  },
  tableValue: {
    backgroundColor: 'white',
  },
}));
