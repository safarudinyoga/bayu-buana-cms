import { Grid } from '@material-ui/core';
import Leftbar from '../../../../components/Molecules/Leftbar';
import Navbar from '../../../../components/Molecules/Navbar';

function DekstopLayout({ children }) {
  return (
    <>
      <Navbar />
      <Grid container>
        <Grid item sm={1} xs={1}>
          <Leftbar />
        </Grid>
        <Grid item sm={11} xs={11}>
          {children}
        </Grid>
      </Grid>
    </>
  );
}

export default DekstopLayout;
