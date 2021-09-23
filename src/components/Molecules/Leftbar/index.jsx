import { Container, makeStyles, Typography } from '@material-ui/core';
import { Bookmark, Home, Storefront } from '@material-ui/icons';
const useStyles = makeStyles((theme) => ({
	container: {
		height: '100vh',
		color: 'white',
		paddingTop: theme.spacing(10),
		backgroundColor: theme.palette.primary.main,
		[theme.breakpoints.up('sm')]: {
			backgroundColor: 'white',
			color: '#555',
			border: '1px solid #ece7e7',
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
		<Container className={classes.container}>
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
		</Container>
	);
}

export default Leftbar;
