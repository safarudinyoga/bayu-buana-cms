import { Container, Grid, makeStyles, Typography } from '@material-ui/core';
import { Bookmark, Home, Storefront } from '@material-ui/icons';
const useStyles = makeStyles((theme) => ({
	containerGrid: {
		height: '100vh',
		width: '100%',
		backgroundColor: 'white',
		color: '#555',
		border: '1px solid #ece7e7',
		paddingTop: theme.spacing(10),
		position: 'fixed',
		[theme.breakpoints.down('sm')]: {
			color: 'white',
			backgroundColor: theme.palette.primary.main,
			position: 'fixed',
		},
	},
	divGrid: {
		width: '100%',
		paddingLeft: '16px',
		paddingRight: '16px',
		[theme.breakpoints.down('sm')]: {
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',

			paddingLeft: '0px',
			paddingRight: '0px',
		},
	},
	item: {
		display: 'flex',
		alignItems: 'center',
		marginBottom: theme.spacing(4),
		[theme.breakpoints.up('sm')]: {
			marginBottom: theme.spacing(3),
			cursor: 'pointer',
		},
	},
	icon: {
		marginRight: theme.spacing(1),
		[theme.breakpoints.up('sm')]: {
			fontSize: '28px',
		},
	},
	text: {
		fontWeight: 500,
		[theme.breakpoints.down('sm')]: {
			display: 'none',
		},
	},
}));
function Leftbar() {
	const classes = useStyles();
	return (
		<Grid item sm={1} xs={2} md={2} className={classes.containerGrid}>
			<div className={classes.divGrid}>
				<div className={classes.item}>
					<Home className={classes.icon} />
					<Typography className={classes.text}>Home</Typography>
				</div>
				<div className={classes.item}>
					<Bookmark className={classes.icon} />
					<Typography className={classes.text}>Collections</Typography>
				</div>
				<div className={classes.item}>
					<Storefront className={classes.icon} />
					<Typography className={classes.text}>Market</Typography>
				</div>
			</div>
		</Grid>
	);
}

export default Leftbar;
