import Card from "@mui/material/Card";
import styled from "@mui/material/styles/styled";
import NavLink from "components/nav-link/nav-link";

/**
 * Styled component for the main container using MUI Card.
 * This container adjusts its styling based on screen size, removing shadows and enabling
 * scroll on smaller screens.
 *
 * @component
 * @param {Object} theme - MUI theme object for custom styling.
 */
export const MainContainer = styled(Card)(({ theme }) => ({
  paddingBottom: "1.5rem",
  [theme.breakpoints.down("md")]: {
    boxShadow: "none",
    overflowY: "auto",
    height: "calc(100vh - 64px)"
  }
}));

/**
 * Styled component for the navigation link. It highlights the current path by changing
 * the border color and icon color based on whether it matches the current path.
 * 
 * @component
 * @param {Object} theme - MUI theme object for custom styling.
 * @param {boolean} isCurrentPath - A prop that determines if the current link is the active path.
 */
export const StyledNavLink = styled(NavLink, {
  shouldForwardProp: prop => prop !== "isCurrentPath"
})(({ theme, isCurrentPath }) => ({
  display: "flex",
  alignItems: "center",
  borderLeft: "4px solid",
  paddingLeft: "1.5rem",
  paddingRight: "1.5rem",
  marginBottom: "1.25rem",
  justifyContent: "space-between",
  borderColor: isCurrentPath ? theme.palette.primary.main : "transparent",
  
  "& .nav-icon": {
    color: isCurrentPath ? theme.palette.primary.main : theme.palette.grey[600]
  },
  
  "&:hover": {
    borderColor: theme.palette.primary.main,
    "& .nav-icon": {
      color: theme.palette.primary.main
    }
  }
}));
