import { Tabs, Tab } from '@material-ui/core';
import { Chat, FlightTakeoff, Hotel } from '@material-ui/icons';
const UiTableMobile = (props) => {
  const {
    value = 0,
    TabPanel,
    classes,
    a11yProps,
    Uitable,
    handleChange,
    dekstop,
  } = props;
  return (
    <>
      <div className={classes.tabsMobile}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
          indicatorColor="transparent"
          textColor="primary"
        >
          <Tab
            icon={<FlightTakeoff />}
            label="Flight"
            className={
              value === 0
                ? classes.tabCircle
                : { ...classes.tabCircle, backgroundColor: 'transparent' }
            }
            {...a11yProps(0)}
          ></Tab>
          <Tab
            icon={<Hotel />}
            label="Hotel"
            className={
              value === 1
                ? classes.tabCircle
                : { ...classes.tabCircle, backgroundColor: 'transparent' }
            }
            {...a11yProps(1)}
          />
          <Tab
            icon={<Chat />}
            label="Other"
            className={
              value === 2
                ? classes.tabCircle
                : { ...classes.tabCircle, backgroundColor: 'transparent' }
            }
            {...a11yProps(2)}
          />
        </Tabs>
      </div>
      <TabPanel value={value} index={0}>
        <div className={classes.containerBodyTable}>
          <Uitable dekstop={dekstop} />
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <div className={classes.containerBodyTable}>
          <Uitable dekstop={dekstop} />
        </div>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <div className={classes.containerBodyTable}>
          <Uitable dekstop={dekstop} />
        </div>
      </TabPanel>
    </>
  );
};

export default UiTableMobile;
