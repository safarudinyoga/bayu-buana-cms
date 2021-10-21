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
    fontWeight: 'bold',
    [theme.breakpoints.down('sm')]: {
      fontSize: '12px',
    },
  },
  title: {
    marginTop: theme.spacing(2),
  },
}));
