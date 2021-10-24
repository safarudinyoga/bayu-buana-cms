import { AppBar, Avatar, Badge, makeStyles, Toolbar } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import Bell from '../../../assets/icons/bell.svg';
import Help from '../../../assets/icons/help.svg';

const useStyles = makeStyles((theme) => ({
  toolBar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  logoLg: {
    marginLeft: '75px',
    display: 'flex',
    alignItems: 'center',
    marginTop: '-5px',
    width: 180,
    // transform: 'translate(-50%,-50%)',
    // // transition: theme.transitions.create('transform'),
    // tidak berlaku di sm
    [theme.breakpoints.down('sm')]: {
      display: 'block',
      width: 120,
      marginLeft: '-10px',
    },
  },
  icons: {
    display: 'flex',
    alignItems: 'center',
  },
  badge: {
    marginRight: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      marginRight: theme.spacing(5),
    },
  },
  help: {
    marginRight: '8px',
  },
  wrapperCircile: {
    width: '46px',
    height: '46px',
    backgroundColor: 'white',
    border: '1px solid #b3b3b3',
    borderRadius: '100px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: '-18px',
  },
  logoSm: {},
}));
function Navbar({ setOpenSidebar, isMobile = false, openSidebar }) {
  const classes = useStyles();
  return (
    <AppBar color="white" position="fixed">
      <Toolbar className={classes.toolBar}>
        {isMobile ? (
          <IconButton onClick={() => setOpenSidebar(!openSidebar)}>
            <MenuIcon />
          </IconButton>
        ) : null}
        <img src="/Images/logoBayu.png" className={classes.logoLg} alt="logo" />
        <div className={classes.icons}>
          <img src={Help} className={classes.help} />
          <Badge badgeContent={7} color="error" className={classes.badge}>
            <img src={Bell} />
          </Badge>
          <div className={classes.wrapperCircile}>
            <Avatar alt="Remy Sharp" src="/Images/3.jpg" />
          </div>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
