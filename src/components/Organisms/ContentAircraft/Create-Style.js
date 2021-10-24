import { makeStyles } from '@material-ui/styles';
export default makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(11),
    marginRight: theme.spacing(7),
    marginLeft: theme.spacing(3),
    marginBottom: theme.spacing(10),

    [theme.breakpoints.down('sm')]: {
      width: ' 80%',
    },
  },
  titleBread: {
    fontSize: '11pt',
    color: '#818181',
    [theme.breakpoints.down('sm')]: {
      fontSize: '12px',
    },
  },
  titleBreadAirCraft: {
    fontSize: '11pt',
    color: '#E84D0E',
    [theme.breakpoints.down('sm')]: {
      fontSize: '12px',
    },
  },
  title: {
    marginTop: theme.spacing(2),
    fontSize: '24pt',
    color: '#333',
  },
}));
