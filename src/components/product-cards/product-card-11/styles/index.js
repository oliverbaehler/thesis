"use client";

import Card from "@mui/material/Card";
import styled from "@mui/material/styles/styled";

/**
 * Styled component for the root of a card. It defines the card's border, border radius, 
 * and positioning. The card has a subtle border and a rounded appearance.
 *
 * @component
 * @param {Object} theme - MUI theme object for custom styling.
 */
export const CardRoot = styled(Card)(({ theme }) => ({
  borderRadius: 16,
  position: "relative",
  border: `1px solid ${theme.palette.grey[300]}`
}));

/**
 * Styled component for displaying the price text. The text is styled with a 
 * strikethrough effect, indicating a discounted or previous price.
 *
 * @component
 * @param {Object} theme - MUI theme object for custom styling.
 */
export const PriceText = styled("p")(({ theme }) => ({
  fontWeight: 600,
  color: theme.palette.grey[600],
  textDecoration: "line-through"
}));
