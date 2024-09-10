"use client";

import styled from "@mui/material/styles/styled";

/**
 * Styled component for displaying the price text. The main price is bold, centered, and has a primary color.
 * A `.base-price` class is included for displaying an original price with a strikethrough, indicating a discount.
 * 
 * @component
 * @param {Object} theme - MUI theme object for custom styling.
 */
export const PriceText = styled("p")(({ theme }) => ({
  gap: 8,
  fontSize: 17,
  fontWeight: 700,
  marginBottom: 8,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.primary.main,
  ".base-price": {
    fontSize: 15,
    fontWeight: 600,
    textDecoration: "line-through",
    color: theme.palette.grey[600]
  }
}));

/**
 * Styled component for wrapping content in a card or section. This includes a button group 
 * with a primary background color, along with individual button styles. It aligns content 
 * in the center and manages overflow for the button group.
 * 
 * @component
 * @param {Object} theme - MUI theme object for custom styling.
 */
export const Content = styled("div")(({ theme }) => ({
  textAlign: "center",
  ".button-group": {
    color: "white",
    display: "flex",
    overflow: "hidden",
    borderRadius: "6px",
    alignItems: "center",
    backgroundColor: theme.palette.primary.main,
    ".base-button": {
      padding: "8px 16px",
      backgroundColor: theme.palette.primary[800]
    }
  },
  ".button-small": {
    maxWidth: 170,
    margin: "auto"
  },
  ".MuiButton-containedPrimary": {
    color: "white"
  }
}));
