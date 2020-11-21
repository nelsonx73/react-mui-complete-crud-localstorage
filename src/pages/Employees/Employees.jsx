import React, { useState } from "react";
import EmployeeForm from "./EmployeeForm";
import PageHeader from "../../components/PageHeader";
import PeopleAltTwoToneIcon from "@material-ui/icons/PeopleAltTwoTone";
import {
  Paper,
  makeStyles,
  TableBody,
  TableRow,
  TableCell,
  Toolbar,
  InputAdornment,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { Close, EditOutlined, Search } from "@material-ui/icons";

import Controls from "../../components/controls/Controls";
import * as employeeService from "../../services/employeeService";
import useTable from "../../components/useTable";
import Popup from "../../components/Popup";
import Notification from "../../components/Notification";
import ConfirmDialog from "../../components/ConfirmDialog";

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
  searchInput: {
    width: "75%",
  },
  newButton: {
    position: "absolute",
    right: "10px",
  },
}));

const headCells = [
  { id: "fullname", label: "Employee name" },
  { id: "email", label: "Email Address (Personal)" },
  { id: "mobile", label: "Mobile" },
  { id: "department", label: "Department", disableSorting: true },
  { id: "actions", label: "Actions", disableSorting: true },
];

function Employees() {
  const classes = useStyles();
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [records, setRecords] = useState(employeeService.getEmployees());
  const [filterFunction, setFilterFunction] = useState({
    fn: (items) => {
      return items;
    },
  });
  const {
    TblContainer,
    TblHeader,
    TblPagination,
    recordsAfterPagingAndSorting,
  } = useTable(records, headCells, filterFunction);

  const [openPopup, setOpenPopup] = useState(false);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });

  function handleSeach(event) {
    let target = event.target;
    setFilterFunction({
      fn: (items) => {
        if (target.value === "") {
          return items;
        } else {
          return items.filter((x) =>
            x.fullname.toLowerCase().includes(target.value)
          );
        }
      },
    });
  }

  function addOrEdit(employee, resetForm) {
    if (employee.id === 0) {
      employeeService.insertEmployee(employee);
    } else {
      employeeService.updateEmployee(employee);
    }
    resetForm();
    setRecordForEdit(null);
    setOpenPopup(false);
    setRecords(employeeService.getEmployees());
    setNotify({
      isOpen: true,
      message: "Submitted Succesfully",
      type: "success",
    });
  }

  function onDelete(id) {
    employeeService.deleteEmployee(id);
    setRecords(employeeService.getEmployees());
    setNotify({
      isOpen: true,
      message: "Delete Succesfully",
      type: "error",
    });
  }

  function openInPopup(item) {
    setRecordForEdit(item);
    setOpenPopup(true);
  }

  return (
    <>
      <PageHeader
        title='New Employee'
        subtitle='Form design with validation'
        icon={<PeopleAltTwoToneIcon fontSize='large' />}
      />
      <Paper className={classes.pageContent}>
        <Toolbar>
          <Controls.Input
            onChange={handleSeach}
            className={classes.searchInput}
            label='Search employees'
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <Search />
                </InputAdornment>
              ),
            }}
          />
          <Controls.Button
            className={classes.newButton}
            text='Add New'
            variant='outlined'
            startIcon={<AddIcon />}
            onClick={() => {
              setRecordForEdit(null);
              setOpenPopup(true);
            }}
          />
        </Toolbar>
        <TblContainer>
          <TblHeader />
          <TableBody>
            {recordsAfterPagingAndSorting().map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.fullname}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.mobile}</TableCell>
                <TableCell>{item.department}</TableCell>
                <TableCell>
                  <Controls.ActionButton
                    color='primary'
                    onClick={() => {
                      openInPopup(item);
                    }}
                  >
                    <EditOutlined fontSize='small' />
                  </Controls.ActionButton>
                  <Controls.ActionButton
                    color='secondary'
                    onClick={() => {
                      setConfirmDialog({
                        isOpen: true,
                        title: "Are you sure to delete this record?",
                        subTitle: "You can't undo this operation",
                        onConfirm: () => onDelete(item.id),
                      });
                    }}
                  >
                    <Close fontSize='small' />
                  </Controls.ActionButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TblContainer>
        <TblPagination />
      </Paper>
      <Popup
        title='Employee Form'
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <EmployeeForm addOrEdit={addOrEdit} recordForEdit={recordForEdit} />
      </Popup>
      <Notification notify={notify} setNotify={setNotify}></Notification>
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      ></ConfirmDialog>
    </>
  );
}

export default Employees;
