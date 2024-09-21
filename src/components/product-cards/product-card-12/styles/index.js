"use client";

import styled from "@mui/material/styles/styled";

/**
 * Styled component for displaying the main price text. It styles the price with a bold font weight
 * and the primary color of the theme. It also includes a nested `.base-price` element for showing
 * a strikethrough effect on the base price, indicating a discount.
 *
 * @component
 * @param {Object} theme - MUI theme object for custom styling.
 */
export const PriceText = styled("p")(({ theme }) => ({
  fontSize: 17,
  fontWeight: 700,
  color: theme.palette.primary.main,
  ".base-price": {
    fontSize: 15,
    marginRight: 8,
    fontWeight: 600,
    textDecoration: "line-through",
    color: theme.palette.grey[600]
  }
}));
