"use client";

import styled from "@mui/material/styles/styled";

/**
 * Styled component for displaying the price text. The main price is bold, has a primary color, and a margin at the top.
 * A `.base-price` class is included for displaying the original price with a strikethrough, indicating a discount.
 *
 * @component
 * @param {Object} theme - MUI theme object for custom styling.
 */
export const PriceText = styled("p")(({ theme }) => ({
  fontSize: 17,
  lineHeight: 1,
  fontWeight: 700,
  marginTop: ".75rem",
  color: theme.palette.primary.main,
  ".base-price": {
    fontSize: 15,
    marginRight: 8,
    fontWeight: 600,
    textDecoration: "line-through",
    color: theme.palette.grey[600]
  }
}));
