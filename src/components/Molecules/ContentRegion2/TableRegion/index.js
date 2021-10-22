import React, { useEffect, useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import ReactExport from '@ibrahimrahmani/react-export-excel';
import {
  alpha,
  Button,
  Checkbox,
  FormControl,
  Grid,
  InputBase,
  makeStyles,
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
} from '@material-ui/core';
import { Search } from '@material-ui/icons';
import { useDispatch } from 'react-redux';
import Change from '../../../../assets/icons/change.svg';
import Down from '../../../../assets/icons/down.svg';
import Download from '../../../../assets/icons/download.svg';
import AddFile from '../../../../assets/icons/file-plus.svg';
import Printer from '../../../../assets/icons/printer.svg';
import Up from '../../../../assets/icons/up.svg';
import IconRegion from '../IconRegion';
import TableStyle from './Table-style';
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;
const labelCheckbox = { inputProps: { 'aria-label': 'Checkbox demo' } };

function createData(checkBox, region_code, region_name, status, actions) {
  return {
    checkBox,
    region_code,
    region_name,
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
  { id: 'region_code', label: 'Region Code', minWidth: 220 },
  { id: 'region_name', label: 'Region Name', minWidth: 220 },
  { id: 'status', label: 'Status', minWidth: 170 },
  { id: 'actions', label: 'Actions', minWidth: 170 },
];

function TableRegion({
  titleButton,
  linkButton,
  dataTable,
  removeFunction,
  activeButton,
  setActiveButton,
}) {
  const [rows, setRows] = useState([]);
  const [rowsExport, setRowsExport] = useState([]);
  const exportPDF = () => {
    const unit = 'pt';
    const size = 'A4'; // Use A1, A2, A3 or A4
    const orientation = 'portrait'; // portrait or landscape

    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(15);

    const title = 'Region Report';
    const headers = [['Region Code', 'Region Name', 'Status']];

    const data = rowsExport.map((elt) => [
      elt.regioncode,
      elt.regionname,
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
  useEffect(() => {
    let rows1 = [];
    let rows2 = [];
    let dataItems = dataTable.items || [];
    dataItems.map((e) =>
      rows1.push(
        createData(
          e.checkBox,
          e.region_code,
          e.region_name,
          e.status === 1 ? 'Active' : 'Inactive',
          <IconRegion
            id={e.id}
            urlDetail="/region/detail-region"
            urlEdit="/region/edit-region"
            removeFunction={remove}
          />,
        ),
      ),
    );
    dataItems.map((e) =>
      rows2.push({
        regioncode: e.region_code,
        regionname: e.region_name,
        status: +e.status === 1 ? 'Active' : 'Inactive',
      }),
    );
    setRows(rows1);
    setRowsExport(rows2);
  }, [dataTable]);

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
              <strong>Advanced options</strong>
              <img src={activeModal ? Down : Up} />
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
              filename="Region"
            >
              <ExcelSheet data={rowsExport} name="Goods">
                <ExcelColumn label="Region Code" value="regioncode" />
                <ExcelColumn label="Region Name" value="regionname" />
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
            <strong style={{ marginLeft: '25px', fontSize: '14px' }}>
              Status
            </strong>
            <div onClick={reloadPage} className={classes.buttonRounded}>
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
          <Button className={classes.buttonRemove}>Remove Region</Button>
        </div>
      )}

      <Paper className={classes.paperTable}>
        <TableContainer className={classes.TableContainer}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => {
                  return (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      className={classes.tableTitle}
                      style={{
                        width: column.minWidth,
                        backgroundColor: '#5e5e5e',
                        color: 'white',
                        borderTopLeftRadius: `${
                          column.id === 'regionCode' ? '8px' : 'none'
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
                    e.region_name.includes(keyword) ||
                    e.region_code.includes(keyword),
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

export default TableRegion;
