import { makeStyles } from '@material-ui/styles';

// eslint-disable-next-line no-undef
export default makeStyles((theme) => ({
  editIcon: {
    cursor: 'pointer',
    marginRight: '4px',
  },
  viewIcon: {
    cursor: 'pointer',
    marginRight: '4px',
  },
  removeIcon: {
    cursor: 'pointer',
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  btnPosition: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: '20px',
  },
}));
