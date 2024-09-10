import Drawer from "@mui/material/Drawer";
import styled from "@mui/material/styles/styled";
import { NavLink } from "components/nav-link";
import { layoutConstant } from "utils/constants"; 

// STYLED COMPONENTS

/**
 * Wrapper for the mobile navigation bar. It becomes visible and takes up the full width of the viewport
 * on screen sizes smaller than 900px. Positioned at the bottom of the screen.
 *
 * @component
 * @param {Object} theme - MUI theme object for custom styling.
 */
const Wrapper = styled("div")(({ theme }) => ({
  left: 0,
  right: 0,
  bottom: 0,
  display: "none",
  position: "fixed",
  justifyContent: "space-around",
  zIndex: theme.zIndex.drawer + 1,
  height: layoutConstant.mobileNavHeight,
  backgroundColor: theme.palette.background.paper,
  boxShadow: "0px 1px 4px 3px rgba(0, 0, 0, 0.1)",
  "@media only screen and (max-width: 900px)": {
    display: "flex",
    width: "100vw"
  }
}));

/**
 * Styled component for navigation links used in the mobile navigation bar.
 * It arranges the link content vertically and centers it.
 *
 * @component
 */
const StyledNavLink = styled(NavLink)({
  flex: "1 1 0",
  display: "flex",
  fontSize: "13px",
  alignItems: "center",
  flexDirection: "column",
  justifyContent: "center"
});

/**
 * Styled box component for clickable elements in the mobile navigation bar.
 * It includes hover effects and centers its content vertically and horizontally.
 *
 * @component
 * @param {Object} theme - MUI theme object for custom styling.
 */
const StyledBox = styled("div")(({ theme }) => ({
  flex: "1 1 0",
  display: "flex",
  fontSize: "13px",
  cursor: "pointer",
  alignItems: "center",
  flexDirection: "column",
  justifyContent: "center",
  transition: "color 150ms ease-in-out",
  "&:hover": {
    color: `${theme.palette.primary.main} !important`
  }
}));

/**
 * Styled component for the MUI Drawer used in the sidebar.
 * It defines the size and shadow styling for the drawer and its paper component.
 *
 * @component
 * @param {Object} theme - MUI theme object for custom styling.
 */
const StyledDrawer = styled(Drawer)(({ theme }) => ({
  width: 250,
  zIndex: 1501,
  flexShrink: 0,
  "& .MuiDrawer-paper": {
    width: 250,
    boxSizing: "border-box",
    boxShadow: theme.shadows[2]
  }
}));

/**
 * Common icon style for elements in the navigation bar, ensuring that icons
 * are centered and positioned consistently.
 *
 * @constant
 * @type {Object}
 */
const iconStyle = {
  display: "flex",
  marginBottom: "4px",
  alignItems: "center",
  justifyContent: "center"
};

export { Wrapper, StyledBox, StyledNavLink, StyledDrawer, iconStyle };
