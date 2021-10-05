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
import AddFile from '../../../assets/icons/file-plus.svg';
import { Search } from '@material-ui/icons';
import React, { useState } from 'react';
import ModalCreateMarkUpFlight from './ModalCreateMarkUpFlight';
import IconsUiTable from './IconsUIiTable';

function createData(
  destination,
  airlineServiceType,
  applyCondition,
  markUp,
  actions,
) {
  return {
    destination,
    airlineServiceType,
    applyCondition,
    markUp,
    actions,
  };
}

const columns = [
  { id: 'destination', label: 'Destination', minWidth: 170 },
  { id: 'airlineServiceType', label: 'Airline Service Type', minWidth: 170 },
  { id: 'applyCondition', label: 'Apply Condition', minWidth: 170 },
  { id: 'markUp', label: 'Mark Up', minWidth: 170 },
  { id: 'actions', label: 'Actions', minWidth: 170 },
];

const rows = [
  createData(
    'India',
    'IN',
    1324171354,
    3287263,
    <IconsUiTable id={1} urlEdit="/master/edit-flight" />,
  ),
  createData(
    'China',
    'CN',
    1403500365,
    9596961,
    <IconsUiTable id={1} urlEdit="/master/edit-flight" />,
  ),
  createData(
    'Italy',
    'IT',
    60483973,
    301340,
    <IconsUiTable id={1} urlEdit="/master/edit-flight" />,
  ),
  createData(
    'United States',
    'US',
    327167434,
    9833520,
    <IconsUiTable id={1} urlEdit="/master/edit-flight" />,
  ),
  createData(
    'Canada',
    'CA',
    37602103,
    9984670,
    <IconsUiTable id={1} urlEdit="/master/edit-flight" />,
  ),
  createData(
    'Australia',
    'AU',
    25475400,
    7692024,
    <IconsUiTable id={1} urlEdit="/master/edit-flight" />,
  ),
  createData(
    'Germany',
    'DE',
    83019200,
    357578,
    <IconsUiTable id={1} urlEdit="/master/edit-flight" />,
  ),
  createData(
    'Ireland',
    'IE',
    4857000,
    70273,
    <IconsUiTable id={1} urlEdit="/master/edit-flight" />,
  ),
  createData(
    'Mexico',
    'MX',
    126577691,
    1972550,
    <IconsUiTable id={1} urlEdit="/master/edit-flight" />,
  ),
  createData(
    'Japan',
    'JP',
    126317000,
    377973,
    <IconsUiTable id={1} urlEdit="/master/edit-flight" />,
  ),
  createData(
    'France',
    'FR',
    67022000,
    640679,
    <IconsUiTable id={1} urlEdit="/master/edit-flight" />,
  ),
  createData(
    'United Kingdom',
    'GB',
    67545757,
    242495,
    <IconsUiTable id={1} urlEdit="/master/edit-flight" />,
  ),
  createData(
    'Russia',
    'RU',
    146793744,
    17098246,
    <IconsUiTable id={1} urlEdit="/master/edit-flight" />,
  ),
  createData(
    'Nigeria',
    'NG',
    200962417,
    923768,
    <IconsUiTable id={1} urlEdit="/master/edit-flight" />,
  ),
  createData(
    'Brazil',
    'BR',
    210147125,
    8515767,
    <IconsUiTable id={1} urlEdit="/master/edit-flight" />,
  ),
];

const useStyles = makeStyles((theme) => ({
  paperTable: {
    width: '100%',
  },
  TableContainer: {
    maxHeight: 440,
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
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      flexDirection: 'column-reverse',
    },
    marginBottom: theme.spacing(3),
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
    [theme.breakpoints.down('sm')]: {
      boxShadow: '0px 4px 4px #00000069',
      marginBottom: '20px',
    },
  },
  startIcon: {
    paddingLeft: '6px',
  },
}));

function UiTableMarkUpFlight({ titleButton, linkButton }) {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

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
          <Tooltip title="Click to create" arrow placement="top">
            <Button
              onClick={handleOpen}
              startIcon={<img src={AddFile} className={classes.startIcon} />}
              variant="contained"
              className={classes.buttonAdd}
            >
              {titleButton}
            </Button>
          </Tooltip>
          <ModalCreateMarkUpFlight setFunc={setOpen} open={open} />
        </Grid>
      </div>

      <Paper className={classes.paperTable}>
        <TableContainer className={classes.TableContainer}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.code}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
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

export default UiTableMarkUpFlight;