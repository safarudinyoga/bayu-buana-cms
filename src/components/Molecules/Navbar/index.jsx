import { AppBar, Avatar, Badge, makeStyles, Toolbar } from '@material-ui/core';
import { Notifications } from '@material-ui/icons';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme) => ({
  toolBar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  logoLg: {
    marginLeft: '75px',
    display: 'block',
    width: 150,
    // tidak berlaku di sm
    [theme.breakpoints.down('sm')]: {
      display: 'block',
      width: 120,
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
          <Badge badgeContent={7} color="primary" className={classes.badge}>
            <Notifications />
          </Badge>
          <Avatar alt="Remy Sharp" src="/Images/3.jpg" />
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
