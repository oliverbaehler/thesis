import Clear from "@mui/icons-material/Clear";
import Box from "@mui/material/Box";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import IconButton from "@mui/material/IconButton";
import { alpha, styled } from "@mui/material/styles";

/**
 * A styled table cell component with custom font size, padding, and border color.
 * Used for creating consistent table cell styling across the application.
 * 
 * @component
 */
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontSize: 14,
  paddingTop: 10,
  fontWeight: 600,
  paddingBottom: 10,
  color: theme.palette.grey[900],
  borderBottom: `1px solid ${theme.palette.grey[300]}`
}));

/**
 * A styled box component that represents a category label with custom padding, border radius, and background color.
 * Used for displaying category tags or labels in a consistent style.
 * 
 * @component
 */
const CategoryWrapper = styled(Box)(({ theme }) => ({
  fontSize: 13,
  padding: "3px 12px",
  borderRadius: "16px",
  display: "inline-block",
  color: theme.palette.grey[900],
  backgroundColor: theme.palette.grey[200]
}));

/**
 * A styled table row with custom behavior for the last child and selected state.
 * The row does not show a border for the last cell and handles hover and selection transparently.
 * 
 * @component
 */
const StyledTableRow = styled(TableRow)({
  ":last-child .MuiTableCell-root": {
    border: 0
  },
  "&.Mui-selected": {
    backgroundColor: "transparent",
    ":hover": {
      backgroundColor: "transparent"
    }
  }
});

/**
 * A styled IconButton with custom colors and hover effects for the icons inside.
 * The button color changes on hover to the theme's `info` color.
 * 
 * @component
 */
const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.grey[600],
  "& .MuiSvgIcon-root": {
    fontSize: 19
  },
  ":hover": {
    color: theme.palette.info.main
  }
}));

/**
 * A styled box component to display the status of an item with dynamic colors based on the `status` prop.
 * Different statuses (e.g., "Accepted", "Rejected", "Processing") have distinct color combinations.
 * 
 * @component
 * @param {string} status - The status of the item (e.g., "Accepted", "Rejected", "Processing").
 */
const StatusWrapper = styled(Box, {
  shouldForwardProp: (prop) => prop !== "status"
})(({ theme, status }) => {
  let color = theme.palette.secondary.main;
  let backgroundColor = theme.palette.secondary[100];

  if (status === "Accepted" || status === "Delivered" || status === "Normal") {
    color = theme.palette.success.main;
    backgroundColor = theme.palette.success[100];
  }

  if (status === "Rejected" || status === "Urgent" || status === "Cancelled") {
    color = theme.palette.error.main;
    backgroundColor = theme.palette.error[100];
  }

  if (status === "Processing") {
    color = theme.palette.warning.main;
    backgroundColor = theme.palette.warning[100];
  }

  if (status === "Pending") {
    color = theme.palette.info.main;
    backgroundColor = theme.palette.info[100];
  }

  return {
    color,
    fontSize: 12,
    fontWeight: 600,
    backgroundColor,
    borderRadius: "8px",
    padding: "3px 12px",
    display: "inline-flex"
  };
});

/**
 * A styled box component for displaying an image upload area with a custom background and size.
 * The box has rounded corners and is centered both horizontally and vertically.
 * 
 * @component
 */
const UploadImageBox = styled(Box)(({ theme }) => ({
  width: 150,
  height: 150,
  display: "flex",
  overflow: "hidden",
  borderRadius: "8px",
  position: "relative",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: alpha(theme.palette.info.light, 0.1)
}));

/**
 * A styled `Clear` icon positioned absolutely within its container.
 * It has a small size, clickable cursor, and is used to represent a clear or close action.
 * 
 * @component
 */
const StyledClear = styled(Clear)({
  top: 5,
  right: 5,
  fontSize: 14,
  cursor: "pointer",
  position: "absolute"
});

export { 
  CategoryWrapper, 
  StyledIconButton, 
  StyledTableRow, 
  StyledTableCell, 
  StatusWrapper, 
  UploadImageBox, 
  StyledClear 
};
