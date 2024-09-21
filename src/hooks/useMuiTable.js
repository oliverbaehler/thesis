import { useState } from "react";

// ================================================================

/**
 * Compares two objects based on a specific property, returning a result for descending order.
 * 
 * @param {Object} a - First object to compare.
 * @param {Object} b - Second object to compare.
 * @param {string} orderBy - The property name to compare the objects by.
 * @returns {number} - Returns -1, 0, or 1 based on the comparison.
 */
export function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;
  return 0;
}

/**
 * Returns a comparator function based on the sort order ("asc" or "desc").
 * 
 * @param {string} order - Sort order, either "asc" or "desc".
 * @param {string} orderBy - The property to sort by.
 * @returns {Function} - Comparator function to use for sorting.
 */
export function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

/**
 * Sorts an array stably using a comparator function, maintaining the original order for equal elements.
 * 
 * @param {Array} array - The array to sort.
 * @param {Function} comparator - Comparator function for sorting.
 * @returns {Array} - The sorted array.
 */
export function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

// ================================================================

/**
 * Custom hook for managing table data, sorting, pagination, and selection in a MUI (Material-UI) table.
 * 
 * @param {Object} props - Properties for the table data and default sorting options.
 * @param {Array} props.listData - The data to display in the table.
 * @param {string} props.defaultSort - The default column to sort by (default is "name").
 * @param {string} props.defaultOrder - The default sorting order ("asc" or "desc").
 * 
 * @returns {Object} - Returns state and functions for handling table behavior (sorting, pagination, selection).
 */
export default function useMuiTable(props) {
  const {
    listData = [],
    defaultSort = "name",
    defaultOrder = "asc"
  } = props;

  const [rowsPerPage] = useState(20); // Number of rows displayed per page
  const [page, setPage] = useState(0); // Current page number
  const [orderBy, setOrderBy] = useState(defaultSort); // The column to sort by
  const [selected, setSelected] = useState([]); // Selected rows
  const [order, setOrder] = useState(defaultOrder); // Sorting order (asc/desc)

  /**
   * Handles sorting when a column header is clicked.
   * @param {string} property - The column being sorted.
   */
  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  /**
   * Handles selecting or deselecting all rows.
   * @param {boolean} checked - Whether all rows should be selected or deselected.
   * @param {string} defaultSelect - The property used to uniquely identify each row.
   */
  const handleSelectAllClick = (checked, defaultSelect) => {
    if (checked) {
      const newSelected = listData.map((item) => item[defaultSelect]);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  /**
   * Handles selecting or deselecting a specific row.
   * @param {string} name - The name (or identifier) of the row to select or deselect.
   */
  const handleRowClick = (name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  /**
   * Handles changing the page of the table.
   * @param {number} newPage - The new page number.
   */
  const handleChangePage = (_, newPage) => setPage(newPage - 1);

  // Filter the data based on current page, sorting, and rows per page
  const filteredList = stableSort(listData, getComparator(order, orderBy)).slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return {
    page,
    order,
    orderBy,
    selected,
    rowsPerPage,
    filteredList,
    handleRowClick,
    handleChangePage,
    handleRequestSort,
    handleSelectAllClick
  };
}
