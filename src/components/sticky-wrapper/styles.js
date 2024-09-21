"use client";

import styled from "@mui/material/styles/styled";
import { layoutConstant } from "utils/constants";

/**
 * Styled component for the main content wrapper, which manages the layout of the sidebar and content area.
 * The layout is responsive, hiding the sidebar on smaller screens and adjusting padding accordingly.
 *
 * @component
 * @param {Object} theme - MUI theme object for custom styling.
 */
export const ContentWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  position: "relative",

  // Sidebar styling
  ".sidebar": {
    width: "100%",
    height: "100%",
    position: "sticky",
    top: layoutConstant.headerHeight + 15,
    maxWidth: layoutConstant.grocerySidenavWidth,
    [theme.breakpoints.down("md")]: {
      display: "none" // Hide sidebar on medium and smaller screens
    }
  },

  // Content area styling
  ".content": {
    width: "100%",
    paddingLeft: "2rem",
    maxWidth: `calc(100% - ${layoutConstant.grocerySidenavWidth}px)`, // Content area adjusts for sidebar width
    [theme.breakpoints.down("md")]: {
      maxWidth: "100%", // Take full width on medium and smaller screens
      paddingLeft: 0 // Remove left padding on smaller screens
    }
  }
}));
