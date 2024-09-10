"use client";

import styled from "@mui/material/styles/styled"; 

/**
 * Styled component for a flexible layout container. It handles layout with gaps between elements, 
 * border styling, and responsive behavior for different screen sizes.
 * 
 * @component
 * @param {Object} theme - MUI theme object for custom styling.
 */
export const StyledRoot = styled("div")(({ theme }) => ({
  gap: 16,
  flexGrow: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRight: `1px solid ${theme.palette.grey[400]}`,
  
  // Remove border for the last child
  ":last-child": {
    borderRight: 0
  },
  
  // Remove right border for even children on medium screens
  [theme.breakpoints.down("md")]: {
    ":nth-of-type(even)": {
      borderRight: 0
    }
  },

  // Remove right border and justify content to the start on small screens
  [theme.breakpoints.down("sm")]: {
    borderRight: 0,
    justifyContent: "flex-start"
  }
}));
