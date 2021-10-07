import React, { useState, useEffect } from 'react';
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
  FormControl,
  MenuItem,
  Select,
  Checkbox,
} from '@material-ui/core';
import Download from '../../../assets/icons/download.svg';
import Printer from '../../../assets/icons/printer.svg';
import AddFile from '../../../assets/icons/file-plus.svg';
import Change from '../../../assets/icons/change.svg';
import Up from '../../../assets/icons/up.svg';
import Down from '../../../assets/icons/down.svg';
import { ExpandMore, Search } from '@material-ui/icons';
import IconsUiTable from './IconsUIiTable';
import { useSelector, useDispatch } from 'react-redux';

const labelCheckbox = { inputProps: { 'aria-label': 'Checkbox demo' } };

function createData(checkBox, aircraft_code, aircraft_name, status, actions) {
  return {
    checkBox,
    aircraft_code,
    aircraft_name,
    status,
    actions,
  };
}

const columns = [
  {
    id: 'checkBox',
    label: <Checkbox color="black" {...labelCheckbox} />,
    minWidth: 20,
  },
  { id: 'aircraft_code', label: 'Air Craft Code', minWidth: 220 },
  { id: 'aircraft_name', label: 'Air Craft Name', minWidth: 220 },
  { id: 'status', label: 'Status', minWidth: 170 },
  { id: 'actions', label: 'Actions', minWidth: 170 },
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
    [theme.breakpoints.down('sm')]: {
      marginTop: '20px',
      marginBottom: '10px',
    },
    border: '1px solid #D9DFE7',
    display: 'flex',
    flexDirection: 'row',
  },
  wrapperSearchDropdown: {
    display: 'flex',
    flexDirection: 'row',
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      flexDirection: 'column',
    },
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
    marginRight: 8,
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
  dropdown: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    minWidth: '300px',
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'flex-end',
    },
  },
  modal: {
    width: 'auto',
    height: '100px',
    backgroundColor: '#f5f5f5',
    borderRadius: '10px',
    border: '2px solid lightGray',
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '20px',
  },
  modalHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '10px',
    marginBottom: '10px',
  },
  statusActive: {
    width: '60px',
    height: '40px',
    backgroundColor: 'white',
    minWidth: 150,
    marginLeft: '25px',
    alignItems: 'center',
    marginTop: '-20px',
    fontSize: '14px',
    borderRadius: '10px',
  },
  buttonActive: {
    width: '60px',
    height: '40px',
    backgroundColor: '#5e5e5e',
    color: 'white',
    minWidth: 150,
    marginLeft: '25px',
    alignItems: 'center',
    fontSize: '14px',
    borderRadius: '10px',
    [theme.breakpoints.down('sm')]: {
      marginLeft: '0px',
      marginBottom: '10px',
    },
  },
  buttonSpace: {
    marginBottom: '20px',
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      flexDirection: 'column',
    },
  },
  buttonRemove: {
    width: '150px',
    height: '40px',
    backgroundColor: '#5e5e5e',
    color: 'white',
    borderRadius: '10px',
    marginLeft: '10px',
    fontSize: '14px',
    textTransform: 'capitalize',
    [theme.breakpoints.down('sm')]: {
      marginLeft: '0px',
    },
  },
}));

function UiTableAircraft({
  titleButton,
  linkButton,
  dataTable,
  removeFunction,
  activeButton,
  setActiveButton,
}) {
  const [rows, setRows] = useState([]);
  useEffect(() => {
    let rows3 = [];
    let dataItems = dataTable.items || [];
    dataItems.map((e) =>
      rows3.push(
        createData(
          e.checkBox,
          e.aircraft_code,
          e.aircraft_name,
          e.status,
          <IconsUiTable
            id={e.id}
            urlEdit="/master/edit-flight"
            removeFunction={remove}
          />,
        ),
      ),
    );
    setRows(rows3);
  }, [dataTable]);

  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [keyword, setkeyword] = useState('');
  const dispatch = useDispatch();
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSearch = (event) => {
    setkeyword(event.target.value);
  };
  const remove = (id) => {
    removeFunction(id);
  };

  const [activeModal, setActiveModal] = useState(false);

  const [age, setAge] = useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  return (
    <div>
      <div className={classes.controlTable}>
        <Grid item sm={3}>
          <div className={classes.wrapperSearchDropdown}>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <Search />
              </div>
              <InputBase
                onChange={(value) => {
                  handleSearch(value);
                }}
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
              />
            </div>
            <div
              className={classes.dropdown}
              onClick={(e) => setActiveModal(!activeModal)}
            >
              <strong>Advanced options</strong>
              <img src={activeModal ? Down : Up} />
            </div>
          </div>
        </Grid>
        {/* <Grid item sm={3}></Grid> */}
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

      {activeModal && (
        <div className={classes.modal}>
          <div className={classes.modalHeader}>
            <strong style={{ marginLeft: '25px', fontSize: '14px' }}>
              Status
            </strong>
            <div className={classes.buttonRounded}>
              <img src={Change} />
            </div>
          </div>
          <FormControl variant="outlined">
            <Select
              className={classes.statusActive}
              value={age}
              onChange={handleChange}
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
            >
              <MenuItem value="">Active</MenuItem>
              <MenuItem value={10}>Inactive</MenuItem>
            </Select>
          </FormControl>
        </div>
      )}
      {activeModal && (
        <div className={classes.buttonSpace}>
          <FormControl variant="outlined">
            <Select
              className={classes.buttonActive}
              value={age}
              onChange={handleChange}
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
            >
              <MenuItem value="">Update Status</MenuItem>
              <MenuItem value={10}>Active</MenuItem>
              <MenuItem value={20}>Inactive</MenuItem>
            </Select>
          </FormControl>
          <Button className={classes.buttonRemove}>Remove Aircraft</Button>
        </div>
      )}

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
                .filter((e) => e.aircraft_name.includes(keyword))
                .map((item) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={item.code}
                    >
                      {columns.map((column) => {
                        const value = item[column.id];
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

export default UiTableAircraft;
