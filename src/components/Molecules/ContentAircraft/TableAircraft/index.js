import React, { useEffect, useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import ReactExport from '@ibrahimrahmani/react-export-excel';
import {
  Button,
  FormControl,
  Grid,
  InputBase,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  Checkbox,
} from '@material-ui/core';
import { Search } from '@material-ui/icons';
import { useDispatch } from 'react-redux';
import Change from '../../../../assets/icons/change.svg';
import Down from '../../../../assets/icons/down.svg';
import Download from '../../../../assets/icons/download.svg';
import AddFile from '../../../../assets/icons/file-plus.svg';
import Printer from '../../../../assets/icons/printer.svg';
import Up from '../../../../assets/icons/up.svg';
import IconAircraft from '../IconAircraft';
import TableStyle from './Table-style';
import CheckBoxTable from './check-box-table';
import Dropdown from './dropdown';
import ButtonDropdown from './buttonDropdown';
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

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
  const [openBox, setOpenBox] = useState(false);

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
      label: <CheckBoxTable onChange={handleCheckbox} />,
      minWidth: 20,
    },
    { id: 'aircraft_code', label: 'Air Craft Code', minWidth: 220 },
    { id: 'aircraft_name', label: 'Air Craft Name', minWidth: 220 },
    { id: 'status', label: 'Status', minWidth: 170 },
    { id: 'actions', label: 'Actions', minWidth: 170 },
  ];

  useEffect(() => {
    let rows1 = [];
    let rows2 = [];
    let dataItems = dataTable.items || [];
    dataItems.map((e) =>
      rows1.push(
        createData(
          <CheckBoxTable
            // checked={boxCheck}
            onClick={() => handleChildBox(e)}
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
      ),
    );
    dataItems.map((e) =>
      rows2.push({
        aircode: e.aircraft_code,
        airname: e.aircraft_name,
        status: +e.status === 1 ? 'Active' : 'Inactive',
      }),
    );
    setRows(rows1);
    console.log(rows2, 'rows4');
    setRowsExport(rows2);
  }, [dataTable, boxCheck]);

  const handleChildBox = (e) => {
    // let index = rows.findIndex((item, index) => {
    //   return item.aircraft_code === e.aircraft_code ? true : false;
    // });
    // console.log(index, 'includex click');
    // // console.log(e);
    // // console.log(rows, 'handleClickx');
    // if (e.aircraft_code === rows[index].aircraft_code) {
    //   setOpenBox(true);
    // } else {
    //   setOpenBox(false);
    // }
    setOpenBox(!openBox);
    console.log(openBox, 'click di handleBox');
  };

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

  const handleSearch = (event) => {
    setkeyword(event.target.value);
  };
  const remove = (id) => {
    removeFunction(id);
  };

  const [selected, setSelected] = useState('');
  const [select, setSelect] = useState('');

  const [activeModal, setActiveModal] = useState(false);

  const [age, setAge] = useState('');

  const reloadPage = () => {
    window.location.reload();
  };
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
            <p className={classes.modalTitle}>Status</p>
            <div onClick={reloadPage} className={classes.buttonRounded}>
              <img src={Change} style={{ marginBottom: '1px' }} />
            </div>
          </div>
          <Dropdown selected={selected} setSelected={setSelected} />
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
      {boxCheck || openBox ? (
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
          <Button className={classes.buttonRemove}>Remove Aircraft</Button>
        </div>
      ) : (
        ''
      )}

      <Paper className={classes.paperTable}>
        <TableContainer className={classes.TableContainer}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow className={classes.tableTitle}>
                {columns.map((column) => {
                  console.log(column.id);
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
                      {column.label}
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
                    e.aircraft_name.includes(keyword) ||
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
