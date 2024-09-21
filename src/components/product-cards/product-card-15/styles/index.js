"use client";

import styled from "@mui/material/styles/styled";

/**
 * Styled component for the root container of a card or element. 
 * It has a border and a rounded appearance, with a hover effect that adds a shadow.
 *
 * @component
 * @param {Object} theme - MUI theme object for custom styling.
 */
export const StyledRoot = styled("div")(({ theme }) => ({
  borderRadius: 8,
  border: `1px solid ${theme.palette.divider}`,
  transition: "all 300ms ease-in-out",
  ":hover": {
    boxShadow: theme.shadows[2]
  }
}));

/**
 * Styled component for the price text. The main price is displayed in a bold, primary color.
 * The `.base-price` class provides styling for a strikethrough original price, indicating a discount.
 *
 * @component
 * @param {Object} theme - MUI theme object for custom styling.
 */
export const PriceText = styled("p")(({ theme }) => ({
  gap: 8,
  fontSize: 17,
  lineHeight: 1,
  fontWeight: 700,
  display: "flex",
  alignItems: "center",
  color: theme.palette.primary.main,
  ".base-price": {
    fontSize: 15,
    fontWeight: 500,
    textDecoration: "line-through",
    color: theme.palette.grey[600]
  }
}));

/**
 * Styled component for wrapping content within a card or section. 
 * It applies padding and aligns items at the end of the container with space between them. 
 * The `.button-group` class styles a group of buttons, and individual buttons have specific padding and background colors.
 *
 * @component
 * @param {Object} theme - MUI theme object for custom styling.
 */
export const Content = styled("div")(({ theme }) => ({
  padding: 18,
  display: "flex",
  alignItems: "end",
  justifyContent: "space-between",
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
