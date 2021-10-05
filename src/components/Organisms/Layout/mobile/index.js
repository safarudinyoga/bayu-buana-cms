import React from 'react';
import { Grid } from '@material-ui/core';
import Leftbar from '../../../../components/Molecules/Leftbar';
import Navbar from '../../../../components/Molecules/Navbar';

function MobileLayout({ children }) {
  const [openSidebar, setOpenSidebar] = React.useState(false);
  return (
    <>
      <Navbar
        setOpenSidebar={setOpenSidebar}
        openSidebar={openSidebar}
        isMobile={true}
      />
      <Grid container>
        <Grid item sm={2} xs={2}>
          {openSidebar ? <Leftbar /> : null}
        </Grid>
        <Grid item sm={12} xs={12}>
          {children}
        </Grid>
      </Grid>
    </>
  );
}

export default MobileLayout;
