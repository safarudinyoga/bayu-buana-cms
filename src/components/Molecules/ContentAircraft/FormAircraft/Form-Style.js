import { makeStyles } from '@material-ui/styles';
export default makeStyles((theme) => ({
  root: {
    display: 'flex',
    marginTop: '30px',
    flexDirection: 'row',
    [theme.breakpoints.down('sm')]: {
      paddingTop: '30px',
      display: 'flex',
      flexDirection: 'column',
    },
  },
  titleBread: {
    [theme.breakpoints.down('sm')]: {
      fontSize: '12px',
    },
  },
  title: {
    marginTop: theme.spacing(2),
  },
  containerForm: {
    marginTop: theme.spacing(6),
    border: '0.5px solid #E6E6E6',
    boxShadow: '2px 2px #F0F0F0',
    borderRadius: '8px',
    padding: '10px 10px 30px 10px',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      padding: '12px',
      marginLeft: '-10px',
      borderRadius: '8px',
    },
  },
  inputGroupAirCraftName: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: '20px',
    margin: '20px 34px 0px 34px',
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      flexDirection: 'column',
      margin: '10px 27px 0 22px',
    },
  },
  inputGroupModel: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: '20px',
    margin: '0px 34px 20px 34px',
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      flexDirection: 'column',
      margin: '10px 27px 0 22px',
    },
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: '20px',
    margin: '20px 34px',
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      flexDirection: 'column',
      margin: '10px 27px 0 22px',
    },
  },
  labelForm: {
    width: '20%',
    fontWeight: '400',
    fontSize: '15pt',
    color: '#333',
    [theme.breakpoints.down('sm')]: {
      width: '80%',
      fontSize: '14px',
    },
  },
  labelTitle: {
    width: '20%',
    fontWeight: '400',
    [theme.breakpoints.down('sm')]: {
      width: '80%',
      fontSize: '14px',
    },
  },
  fieldTag: {
    fontSize: '15pt',
    color: '#818181',
    fontWeight: '400',
    width: '300px',
    backgroundColor: 'white',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },

  titleFixAmount: {
    fontSize: '14px',
  },
  panelPurpose: {
    padding: '10px 0 0 0',
    marginRight: '40px',
    backgroundColor: '#F3F4F4',
    borderRadius: '8px',
    [theme.breakpoints.down('sm')]: {
      marginTop: '20px',
      width: '90%',
      margin: '10px 27px 0 22px',
      borderRadius: '8px',
      padding: '10px 0 20px 0',
    },
  },
  wrapInputAircraft: {
    flex: '1',
  },
  inputTag: {
    width: '200px',
    fontSize: '15pt',
    color: '#818181',
    fontWeight: '400',
    backgroundColor: 'white',
    borderRadius: '8px',
    marginLeft: '50px',
    [theme.breakpoints.down('sm')]: {
      width: '80%',
      marginLeft: '0',
    },
  },
  titleForm: {
    // paddingRight: '20px',
    width: '50%',
    fontSize: '14px',
    fontWeight: 'bold',
    [theme.breakpoints.down('sm')]: {
      width: '80%',
      fontSize: '14px',
    },
  },
  titleInterface: {
    fontSize: '20pt',
    color: '#333',
    fontWeight: '600',
    marginLeft: '30px',
    
    [theme.breakpoints.down('sm')]: {
      marginLeft: '15px',
    },
  },
  // styling translation
  wrapperTranslation: {
    borderBottom: '1px solid #c7cdd6',
    borderTop: '1px solid #c7cdd6',
    height: '250px',
    width: '94%',
    margin: '30px 27px 0 22px',
  },
  wrapperTrans: {
    display: 'flex',
    flexDirection: 'row',
    border: '0.5px solid #E6E6E6',
    boxShadow: '2px 2px #F0F0F0',
    borderRadius: '8px',
  },
  wrapperButton: {
    width: '25%',
    display: 'flex',
    flexDirection: 'column',
  },
  buttonIndonesia: {
    height: '38px',
    fontSize: '14px',
    textTransform: 'capitalize',
    color: 'gray',
    borderRadius: '10px',
    marginBottom: '10px',
    '&:focus': {
      fontSize: '14px',
      textTransform: 'capitalize',
      backgroundColor: 'white',
      color: 'black',
      fontWeight: 'bold',
    },
  },
  buttonChinese: {
    fontSize: '14px',
    textTransform: 'capitalize',
    backgroundColor: '#e7e6efd9',
    color: 'gray',
    borderRadius: '10px',
    '&:focus': {
      fontSize: '14px',
      textTransform: 'capitalize',
      backgroundColor: 'white',
      color: 'black',
      fontWeight: 'bold',
    },
  },
  wrapperForm: {
    display: 'flex',
    flexDirection: 'row',
    textAlign: 'center',
    marginTop: '30px',
  },
  form: { widht: '200px', height: '50px', border: '1px solid gray' },
  noted: {
    margin: '20px 0 40px 30px',
    color: 'gray',
  },
  hr: {
    margin: 20,
    border: '1px solid #C7CDD6',
  },
  titleAircraft: {
    width: '50%',
    fontSize: '14px',
    fontWeight: 'bold',
    [theme.breakpoints.down('sm')]: {
      width: '80%',
      fontSize: '14px',
    },
  },
  contentTrans: {
    margin: '30px 0 30px 0',
    [theme.breakpoints.down('sm')]: {
      margin: '30px 0 10px 0',
    },
  },
  // button Save
  buttonSave: {
    marginRight: '10px',
    backgroundColor: '#027F71',
    width: '90px',
    height: '40px',
    color: 'white',
    textTransform: 'none',
    fontWeight: '600',
    fontSize: '13pt',
  },
  buttonCancel: {
    border: '1px solid #ffffff',
    backgroundColor: 'white',
    width: '90px',
    height: '40px',
    color: '#333333',
    textTransform: 'none',
    fontSize: '13pt',
  },
}));
