"use client";

import Card from "@mui/material/Card";
import styled from "@mui/material/styles/styled";

/**
 * Styled component for the root of a card. It provides rounded corners, a border, 
 * and relative positioning. Additionally, it applies padding and center alignment
 * to a nested `.content` class within the card.
 *
 * @component
 * @param {Object} theme - MUI theme object for custom styling.
 */
export const CardRoot = styled(Card)(({ theme }) => ({
  borderRadius: 16,
  position: "relative",
  border: `1px solid ${theme.palette.grey[300]}`,
  ".content": {
    padding: "1rem",
    textAlign: "center"
  }
}));

/**
 * Styled component for displaying the price text. The price is displayed in bold, 
 * with the primary theme color. A nested `<span>` is used to display the original price 
 * (before discount), styled with a strikethrough and a smaller font size.
 *
 * @component
 * @param {Object} theme - MUI theme object for custom styling.
 */
export const PriceText = styled("p")(({ theme }) => ({
  fontSize: 16,
  fontWeight: 700,
  color: theme.palette.primary.main,
  span: {
    fontSize: 14,
    marginLeft: 6,
    fontWeight: 600,
    textDecoration: "line-through",
    color: theme.palette.grey[600]
  }
}));
