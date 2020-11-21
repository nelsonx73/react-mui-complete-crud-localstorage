import {
  makeStyles,
  Table,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
} from "@material-ui/core";
import React, { useState } from "react";

const useStyles = makeStyles((theme) => ({
  table: {
    marginTop: theme.spacing(3),
    "& thead th": {
      fontWeight: "600",
      color: theme.palette.primary.main,
      backgroundColor: theme.palette.primary.light,
    },
    "& tbody td": {
      fontWeight: "300",
    },
    "& tbody tr:hover": {
      backgroundColor: "#fffbf2",
      cursor: "pointer",
    },
  },
}));

export default function useTable(records, headCells, filterFunction) {
  const classes = useStyles();
  const pages = [5, 10, 15];
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(pages[page]);
  const [order, setOrder] = useState();
  const [orderBy, setOrderBy] = useState("");

  const TblContainer = (props) => {
    return <Table className={classes.table}>{props.children}</Table>;
  };

  function handleSortRequest(cellId) {
    const isAscending = orderBy === cellId && order === "asc";
    setOrder(isAscending ? "desc" : "asc");
    setOrderBy(cellId);
  }

  const TblHeader = (props) => {
    return (
      <TableHead>
        <TableRow>
          {headCells.map((item) => (
            <TableCell
              key={item.id}
              sortDirection={orderBy === item.id ? true : false}
            >
              {item.disableSorting === true ? (
                item.label
              ) : (
                <TableSortLabel
                  active={orderBy === item.id}
                  direction={orderBy === item.id ? order : "asc"}
                  onClick={() => {
                    handleSortRequest(item.id);
                  }}
                >
                  {item.label}
                </TableSortLabel>
              )}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  };

  function handleChangePage(event, newPage) {
    setPage(newPage);
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(parseInt(event.target.value, 10));
  }

  const TblPagination = (props) => (
    <TablePagination
      component='div'
      page={page}
      count={records.length}
      onChangePage={handleChangePage}
      onChangeRowsPerPage={handleChangeRowsPerPage}
      rowsPerPage={rowsPerPage}
      rowsPerPageOptions={pages}
    />
  );

  function customSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;

      return a[1] - b[1];
    });

    return stabilizedThis.map((el) => el[0]);
  }

  function getComparator(order, orderBy) {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }

    return 0;
  }

  const recordsAfterPagingAndSorting = () => {
    return customSort(
      filterFunction.fn(records),
      getComparator(order, orderBy)
    ).slice(page * rowsPerPage, (page + 1) * rowsPerPage);
  };

  return {
    TblContainer,
    TblHeader,
    TblPagination,
    recordsAfterPagingAndSorting,
  };
}
