import {makeStyles} from '@material-ui/styles';
export default makeStyles((theme) => ({
    container: {
        paddingTop: theme.spacing(11),
        marginRight: theme.spacing(7),
        marginLeft: theme.spacing(3),
        [theme.breakpoints.down('sm')]: {
            display: 'flex',
            flexDirection: 'column',
            paddingTop: theme.spacing(11),
            marginRight: theme.spacing(4),
            marginLeft: theme.spacing(4),
            justifyContent: 'center',
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
    containerTable: {
        marginTop: theme.spacing(6),
        border: '0.5px solid #E6E6E6',
        boxShadow: '2px 2px #F0F0F0',
        [theme.breakpoints.down('sm')]: {
            border: 'none',
            boxShadow: '0 0 #F0F0F0',
        },
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
        [theme.breakpoints.down('sm')]: {
            border: '0.5px solid #E6E6E6',
            boxShadow: '2px 2px #F0F0F0',
            paddingTop: theme.spacing(4),
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2),
            marginLeft: theme.spacing(-3),
            marginRight: theme.spacing(-3),
        },
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
        padding: 24,
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        [theme.breakpoints.down('sm')]: {
            justifyContent: 'center',
            alignItems: 'center',
        },
    },
    appBar: {
        backgroundColor: '#f5f5f5',
    },
    tab: {
        '&:focus': {
            borderTop: '3px solid #FDC300',
            backgroundColor: 'white',
        },
        boxShadow: '4px 0 8px #00000029;',
        flexDirection: 'row',
        color: '#333',
    },
    tabCircle: {
        display: 'flex',
        width: 80,
        height: 80,
        borderRadius: 40,
        borderColor: '#FDC300',
        borderStyle: 'solid',
        borderWidth: '3px',
    },
    tabsMobile: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: 'none',
        boxShadow: '2px 2px #F0F0F0',
        padding: 5,
    },
}));
