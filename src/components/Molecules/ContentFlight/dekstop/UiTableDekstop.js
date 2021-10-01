import { AppBar, Tabs, Tab } from '@material-ui/core';
import { Chat, FlightTakeoff, Hotel } from '@material-ui/icons';
const UiTableDekstop = (props) => {
  const { value, TabPanel, classes, a11yProps, Uitable, handleChange } = props;
  return (
    <>
          <AppBar className={classes.appBar} position="static">
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="simple tabs example"
            >
              <Tab
                className={classes.tab}
                icon={<FlightTakeoff />}
                label="Flight"
                {...a11yProps(0)}
              />
              <Tab
                className={classes.tab}
                icon={<Hotel />}
                label="Hotel"
                {...a11yProps(1)}
              />
              <Tab
                className={classes.tab}
                icon={<Chat />}
                label="Other"
                {...a11yProps(2)}
              />
            </Tabs>
          </AppBar>

      <TabPanel value={value} index={0}>
        <div className={classes.containerBodyTable}>
          <Uitable />
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <div className={classes.containerBodyTable}>
          <Uitable />
        </div>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <div className={classes.containerBodyTable}>
          <Uitable />
        </div>
      </TabPanel>
    </>
  );
};

export default UiTableDekstop;
