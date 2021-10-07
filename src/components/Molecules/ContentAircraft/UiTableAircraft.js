import {
  InputBase,
  makeStyles,
  alpha,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Grid,
  Button,
  Tooltip,
} from '@material-ui/core';
import Download from '../../../assets/icons/download.svg';
import Printer from '../../../assets/icons/printer.svg';
import AddFile from '../../../assets/icons/file-plus.svg';
import { ExpandMore, Search } from '@material-ui/icons';
import React, { useState } from 'react';
import IconsUiTable from './IconsUIiTable';

function createData(airCraftCode, airCraftName, status, actions) {
  return {
    airCraftCode,
    airCraftName,
    status,
    actions,
  };
}

const columns = [
  { id: 'airCraftCode', label: 'Air Craft Code', minWidth: 220 },
  { id: 'airCraftName', label: 'Air Craft Name', minWidth: 220 },
  { id: 'status', label: 'Status', minWidth: 170 },
  { id: 'actions', label: 'Actions', minWidth: 170 },
];

const rows = [
  createData(
    'India',
    'IN',
    1324171354,
    <IconsUiTable id={1} urlEdit="/master/edit-flight" />,
  ),
  createData(
    'China',
    'CN',
    1403500365,
    <IconsUiTable id={1} urlEdit="/master/edit-flight" />,
  ),
  createData(
    'Italy',
    'IT',
    60483973,
    <IconsUiTable id={1} urlEdit="/master/edit-flight" />,
  ),
  createData(
    'United States',
    'US',
    327167434,
    <IconsUiTable id={1} urlEdit="/master/edit-flight" />,
  ),
  createData(
    'Canada',
    'CA',
    37602103,
    <IconsUiTable id={1} urlEdit="/master/edit-flight" />,
  ),
  createData(
    'Australia',
    'AU',
    25475400,
    <IconsUiTable id={1} urlEdit="/master/edit-flight" />,
  ),
  createData(
    'Germany',
    'DE',
    83019200,
    <IconsUiTable id={1} urlEdit="/master/edit-flight" />,
  ),
  createData(
    'Ireland',
    'IE',
    4857000,
    <IconsUiTable id={1} urlEdit="/master/edit-flight" />,
  ),
  createData(
    'Mexico',
    'MX',
    126577691,
    <IconsUiTable id={1} urlEdit="/master/edit-flight" />,
  ),
  createData(
    'Japan',
    'JP',
    126317000,
    <IconsUiTable id={1} urlEdit="/master/edit-flight" />,
  ),
  createData(
    'France',
    'FR',
    67022000,
    <IconsUiTable id={1} urlEdit="/master/edit-flight" />,
  ),
  createData(
    'United Kingdom',
    'GB',
    67545757,
    <IconsUiTable id={1} urlEdit="/master/edit-flight" />,
  ),
  createData(
    'Russia',
    'RU',
    146793744,
    <IconsUiTable id={1} urlEdit="/master/edit-flight" />,
  ),
  createData(
    'Nigeria',
    'NG',
    200962417,
    <IconsUiTable id={1} urlEdit="/master/edit-flight" />,
  ),
  createData(
    'Brazil',
    'BR',
    210147125,
    <IconsUiTable id={1} urlEdit="/master/edit-flight" />,
  ),
];

const useStyles = makeStyles((theme) => ({
  paperTable: {
    width: '100%',
    backgroundColor: 'blue',
  },
  TableContainer: {
    maxHeight: 440,
    backgroundColor: 'red',
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 'auto',
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: '20px',
    },
    border: '1px solid #D9DFE7',
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  controlTable: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column-reverse',
    },
  },
  itemStart: {
    display: 'flex',
    flexDirection: 'row',
  },
  itemEnd: {
    display: 'flex',
    flexDirection: 'row-reverse',
  },
  buttonAdd: {
    backgroundColor: '#F3C244',
    color: '#5E5E5E',
    fontSize: '14px',
    padding: '8px 10px',
    borderRadius: '8px',
    textTransform: 'capitalize',
    '&:hover': {
      backgroundColor: '#F3C244',
      boxShadow: '0px 4px 4px #00000069',
    },
  },
  buttonRounded: {
    backgroundColor: '#5E5E5E',
    color: '#fff',
    padding: '14px 14px',
    borderRadius: '300px',
    width: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 10,
    marginRight: 14,
    textTransform: 'capitalize',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#5E5E5E',
      boxShadow: '0px 4px 4px #00000069',
    },
  },
  startIcon: {
    paddingLeft: '6px',
  },
  divButton: {
    display: 'flex',
    flex: 'row',
    alignItems: 'center',
  },
}));

function UiTableAircraft({ titleButton, linkButton }) {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <div>
      <div className={classes.controlTable}>
        <Grid item sm={3}>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <Search />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
        </Grid>
        <Grid item sm={3} className={classes.itemEnd}>
          <div className={classes.divButton}>
            <div className={classes.buttonRounded}>
              <img src={Download} />
            </div>
            <div className={classes.buttonRounded}>
              <img src={Printer} />
            </div>

            <Tooltip title="Click to create" arrow placement="top">
              <Button
                startIcon={<img src={AddFile} className={classes.startIcon} />}
                variant="contained"
                href={linkButton}
                className={classes.buttonAdd}
              >
                {titleButton}
              </Button>
            </Tooltip>
          </div>
        </Grid>
      </div>

      <Paper className={classes.paperTable}>
        <TableContainer className={classes.TableContainer}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (

                  // console.log(colomun.id)
                  // tableHead
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{
                      minWidth: column.minWidth,
                      backgroundColor: '#5e5e5e',
                      color: 'white',
                      borderTopLeftRadius: '8px',
                      borderTopRightRadius: '8px',
                    }}
                  >
                    {column.label}
                  </TableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody style={{ backgroundColor: 'green' }}>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.code}
                      style={{ backgroundColor: 'salmon' }}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell
                            key={column.id}
                            align={column.align}
                            style={{ width: '20%' }}
                          >
                            {column.format && typeof value === 'number'
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}

export default UiTableAircraft;
