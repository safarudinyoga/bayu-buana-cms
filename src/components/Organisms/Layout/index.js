import { Grid, makeStyles } from '@material-ui/core';
import Leftbar from 'components/Molecules/Leftbar';
import Navbar from 'components/Molecules/Navbar';
const useStyles = makeStyles((theme) => ({}));
function Layout({ children }) {
	const classes = useStyles();
	return (
		<div>
			<Navbar />
			<Grid container>
				<Grid item sm={2} xs={2}>
					<Leftbar />
				</Grid>
				<Grid item sm={10} xs={10}>
					{children}
				</Grid>
			</Grid>
		</div>
	);
}

export default Layout;
