import ReactExport from '@ibrahimrahmani/react-export-excel';
import {
  Button,
  Grid,
  InputBase,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Tooltip,
} from '@material-ui/core';
import { Search } from '@material-ui/icons';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Change from '../../../../assets/icons/change.svg';
import Down from '../../../../assets/icons/down.svg';
import Download from '../../../../assets/icons/download.svg';
import AddFile from '../../../../assets/icons/file-plus.svg';
import Printer from '../../../../assets/icons/printer.svg';
import Up from '../../../../assets/icons/up.svg';
import { postBatchAction } from '../../../../store/actions/Reducers-Aircraft';
import IconAircraft from '../IconAircraft';
import ButtonDropdown from './buttonDropdown';
import CheckBoxTable from './check-box-table';
import RegionDropdown from './regionDropdown';
import StatusDropdown from './statusDropdown';
import TableStyle from './Table-style';
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;
const labelCheckbox = { inputProps: { 'aria-label': 'Checkbox demo' } };

function TableAircraft({
  titleButton,
  linkButton,
  dataTable,
  removeFunction,
  editFunction,
  dataStatus,
}) {
  const [rows, setRows] = useState([]);
  const [rowsExport, setRowsExport] = useState([]);
  const [boxCheck, setBoxCheck] = useState(false);
  const [select, setSelect] = useState('');
  // state for checkbox
  const [checkedList, setCheckedList] = useState([]);

  // state for ordering page : orderBy,order
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('id');

  // export PDF
  const exportPDF = () => {
    const unit = 'pt';
    const size = 'A4'; // Use A1, A2, A3 or A4
    const orientation = 'portrait'; // portrait or landscape

    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(15);

    const title = 'Aircraft Report';
    const headers = [['Air Craft Code', 'Air Craft Name', 'Status']];

    const data = rowsExport.map((elt) => [
      elt.aircode,
      elt.airname,
      elt.status,
    ]);

    let content = {
      startY: 50,
      head: headers,
      body: data,
    };

    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    // for save pdf
    // doc.save('report.pdf');

    doc.output('dataurlnewwindow');
  };

  // percobaan Checckbox
  function createData(checkBox, aircraft_code, aircraft_name, status, actions) {
    return {
      checkBox,
      aircraft_code,
      aircraft_name,
      status,
      actions,
    };
  }
  const handleCheckbox = () => {
    setBoxCheck(!boxCheck);
  };

  const columns = [
    {
      id: 'checkBox',
      label: (
        <CheckBoxTable checked={boxCheck} onClick={() => toggleCheckbox()} />
      ),
      minWidth: 20,
    },
    { id: 'aircraft_code', label: 'Aircraft Code', minWidth: 220 },
    { id: 'aircraft_name', label: 'Aircraft Name', minWidth: 220 },
    { id: 'status', label: 'Status', minWidth: 170 },
    { id: 'actions', label: 'Actions', minWidth: 170 },
  ];

  // click to select all and deselect all, not goog for using useEffect
  const toggleCheckbox = () => {
    setBoxCheck(!boxCheck);
    let rows = dataTable.items || [];
    if (!boxCheck) {
      // reverse because state is not changed yet
      setCheckedList(rows.map((data) => data.id));
    } else {
      setCheckedList([]);
    }
  };

  // check is selected or not
  const isSelected = (id) => checkedList.indexOf(id) !== -1;
  // function to handle checkbox item
  const handleCheckBox = (id) => {
    const selectedIndex = checkedList.indexOf(id);
    let newChecked = [...checkedList];

    if (selectedIndex === -1) {
      newChecked.push(id);
    } else {
      newChecked.splice(selectedIndex, 1);
    }

    setCheckedList(newChecked);
    setBoxCheck(newChecked.length !== 0);
  };

  useEffect(() => {
    if (select == 'Active') {
      dispatch(postBatchAction({ action: 'activate', ids: checkedList }));
    } else if (select == 'Inactive') {
      dispatch(postBatchAction({ action: 'deactivate', ids: checkedList }));
    }
  }, [select]);

  useEffect(() => {
    let rows1 = [];
    let rows2 = [];
    let dataItems = dataTable.items || [];

    // sort by state order and orderBy
    dataItems.sort((a, b) => {
      if (order === 'desc') {
        return a[orderBy] < b[orderBy] ? 1 : -1;
      } else {
        return a[orderBy] > b[orderBy] ? 1 : -1;
      }
    });

    if (selected !== 'Select Status...' && selected !== '') {
      // filter data items by status
      let status = selected === 'Active' ? 1 : 3;
      dataItems = dataItems.filter((e) => e.status == status);
    }

    dataItems.map((e) => {
      rows1.push(
        createData(
          <CheckBoxTable
            checked={isSelected(e.id)}
            onChange={() => handleCheckBox(e.id)}
          />,
          e.aircraft_code,
          e.aircraft_name,
          e.status === 1 ? 'Active' : 'Inactive',
          <IconAircraft
            id={e.id}
            urlDetail="/aircraft/detail-aircraft"
            urlEdit="/aircraft/edit-aircraft"
            removeFunction={remove}
          />,
        ),
      );
    });
    dataItems.map((e) =>
      rows2.push({
        aircode: e.aircraft_code,
        airname: e.aircraft_name,
        status: +e.status === 1 ? 'Active' : 'Inactive',
      }),
    );
    setRows(rows1);
    setRowsExport(rows2);
  }, [dataTable, checkedList, order, orderBy, selected]);

  const classes = TableStyle();
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

  const handleBatchRemoveAircraft = () => {
    dispatch(postBatchAction({ action: 'delete', ids: checkedList }));
  };

  const handleSearch = (event) => {
    setkeyword(event.target.value);
  };
  const remove = (id) => {
    removeFunction(id);
  };

  const [selected, setSelected] = useState('');
  const [picker, setPicker] = useState('');
  const [pickShowing, setPickShowing] = useState('');

  const reloadPage = () => {
    window.location.reload();
  };
  const handleChange = (event) => {
    setAge(event.target.value);
  };

  // handler for sorting
  const createSortHandler = (property) => (event) => {
    console.log({ createSortHandler: property, order, orderBy });
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
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
              <p className={classes.titleAdvanced}>Advanced options</p>
              <img src={activeModal ? Up : Down} />
            </div>
          </div>
        </Grid>
        {/* <Grid item sm={3}></Grid> */}
        <Grid item sm={3} className={classes.itemEnd}>
          <div className={classes.divButton}>
            <ExcelFile
              element={
                <div className={classes.buttonRounded}>
                  <img src={Download} />{' '}
                </div>
              }
              filename="Aircraft"
            >
              <ExcelSheet data={rowsExport} name="Goods">
                <ExcelColumn label="Aircraft Code" value="aircode" />
                <ExcelColumn label="Aircraft Name" value="airname" />
                <ExcelColumn label="Status" value="status" />
              </ExcelSheet>
            </ExcelFile>

            <div className={classes.buttonRounded}>
              <img src={Printer} onClick={exportPDF} />
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
            <div>
              <p className={classes.modalTitleRegion}>Region</p>
              <RegionDropdown picker={picker} setPicker={setPicker} />
              <p className={classes.modalTitleStatus}>Status</p>
              <StatusDropdown selected={selected} setSelected={setSelected} />
            </div>
            <div onClick={reloadPage} className={classes.buttonRounded}>
              <img src={Change} style={{ marginBottom: '1px' }} />
            </div>
          </div>
          {/* <FormControl variant="outlined">
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
          </FormControl> */}
        </div>
      )}
      {boxCheck && (
        <div className={classes.buttonSpace}>
          <ButtonDropdown select={select} setSelect={setSelect} />
          {/* <FormControl variant="outlined">
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
          </FormControl> */}
          <Button
            className={classes.buttonRemove}
            onClick={() => handleBatchRemoveAircraft()}
          >
            Remove Aircraft
          </Button>
        </div>
      )}

      <Paper className={classes.paperTable}>
        <TableContainer className={classes.TableContainer}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow className={classes.tableTitle}>
                {columns.map((column) => {
                  return (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{
                        width: column.minWidth,
                        backgroundColor: '#5e5e5e',
                        color: 'white',
                        borderTopLeftRadius: `${
                          column.id === 'airCraftCode' ? '8px' : 'none'
                        } `,
                        // borderTopRightRadius: '8px',
                      }}
                    >
                      {/* make column clickable */}
                      <TableSortLabel
                        active={orderBy === column.id}
                        direction={order}
                        onClick={createSortHandler(column.id)}
                      >
                        {column.label}
                      </TableSortLabel>
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .filter(
                  (e) =>
                    e.aircraft_name
                      .toLowerCase()
                      .includes(keyword.toLowerCase()) ||
                    e.aircraft_code.includes(keyword),
                )
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
                          <TableCell
                            key={column.id}
                            className={classes.tableValue}
                            align={column.align}
                            style={{
                              width: '20%',
                            }}
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

export default TableAircraft;
