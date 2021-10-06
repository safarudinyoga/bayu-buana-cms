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
import IconsUiTable from './IconsUIiTable';

function createData(presetName, actions) {
  return {
    presetName,
    actions,
  };
}

const columns = [
  { id: 'presetName', label: 'Preset Name', minWidth: 800 },
  { id: 'actions', label: 'Actions', minWidth: 200 },
];

const rows = [
  createData('India', <IconsUiTable id={1} urlEdit="/master/edit-other" />),
  createData('China', <IconsUiTable id={1} urlEdit="/master/edit-other" />),
  createData('Italy', <IconsUiTable id={1} urlEdit="/master/edit-other" />),
  createData(
    'United States',
    <IconsUiTable id={1} urlEdit="/master/edit-other" />,
  ),
  createData('Canada', <IconsUiTable id={1} urlEdit="/master/edit-other" />),
  createData('Australia', <IconsUiTable id={1} urlEdit="/master/edit-other" />),
  createData('Germany', <IconsUiTable id={1} urlEdit="/master/edit-other" />),
  createData('Ireland', <IconsUiTable id={1} urlEdit="/master/edit-other" />),
  createData('Mexico', <IconsUiTable id={1} urlEdit="/master/edit-other" />),
  createData('Japan', <IconsUiTable id={1} urlEdit="/master/edit-other" />),
  createData('France', <IconsUiTable id={1} urlEdit="/master/edit-other" />),
  createData(
    'United Kingdom',
    <IconsUiTable id={1} urlEdit="/master/edit-other" />,
  ),
  createData('Russia', <IconsUiTable id={1} urlEdit="/master/edit-other" />),
  createData('Nigeria', <IconsUiTable id={1} urlEdit="/master/edit-other" />),
  createData('Brazil', <IconsUiTable id={1} urlEdit="/master/edit-other" />),
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
  },
  startIcon: {
    paddingLeft: '6px',
  },
}));

function UiTableOther({ titleButton, linkButton }) {
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

export default UiTableOther;
