import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import styled from "@mui/material/styles/styled";
import InputBase from "@mui/material/InputBase";
import FlexRowCenter from "components/flex-box/flex-row-center";

/**
 * Styled component for the AppBar in the dashboard navigation bar.
 * Provides custom styles for padding, background color, and shadow.
 *
 * @component
 * @param {Object} theme - MUI theme object for custom styling.
 */
export const DashboardNavbarRoot = styled(AppBar)(({ theme }) => ({
  zIndex: 11,
  paddingTop: "1rem",
  paddingBottom: "1rem",
  backgroundColor: "#ffffff",
  boxShadow: theme.shadows[2],
  color: theme.palette.text.primary
}));

/**
 * Styled component for the Toolbar within the dashboard navigation bar.
 * Removes default padding and adjusts the height of the toolbar.
 *
 * @component
 */
export const StyledToolBar = styled(Toolbar)({
  "@media (min-width: 0px)": {
    paddingLeft: 0,
    paddingRight: 0,
    minHeight: "auto"
  }
});

/**
 * Styled component for a flex row that centers its content, used as a toggle button wrapper.
 * This component only becomes visible on screen sizes smaller than 'lg'.
 *
 * @component
 * @param {Object} theme - MUI theme object for custom styling.
 */
export const ToggleWrapper = styled(FlexRowCenter)(({ theme }) => ({
  width: 40,
  height: 40,
  flexShrink: 0,
  display: "none",
  cursor: "pointer",
  borderRadius: "8px",
  backgroundColor: theme.palette.grey[100],
  [theme.breakpoints.down("lg")]: {
    display: "flex"
  }
}));

/**
 * Styled button component with custom height, padding, and margin.
 * The button becomes hidden on extra small screens ('xs').
 *
 * @component
 * @param {Object} theme - MUI theme object for custom styling.
 */
export const CustomButton = styled(Button)(({ theme }) => ({
  minHeight: 40,
  flexShrink: 0,
  marginLeft: 16,
  padding: "0 20px",
  borderRadius: "8px",
  backgroundColor: theme.palette.grey[100],
  [theme.breakpoints.down("xs")]: {
    display: "none"
  }
}));

/**
 * Styled input field with custom padding and background color.
 * The input becomes hidden on medium screens ('md') and smaller.
 *
 * @component
 * @param {Object} theme - MUI theme object for custom styling.
 */
export const StyledInputBase = styled(InputBase)(({ theme }) => ({
  width: 200,
  padding: "5px 10px",
  borderRadius: "8px",
  color: theme.palette.grey[500],
  backgroundColor: theme.palette.grey[100],
  [theme.breakpoints.down("md")]: {
    display: "none"
  }
}));
