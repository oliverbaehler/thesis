"use client";

import Card from "@mui/material/Card";
import styled from "@mui/material/styles/styled";

/**
 * A styled Material-UI Card component with custom dimensions, padding, and border radius.
 * This component is used to display content in a card layout with consistent styling.
 *
 * @component
 * @returns {JSX.Element} - A styled card component.
 */
export const StyledCard = styled(Card)({
  height: "100%",          // Sets the height of the card to fill its container
  borderRadius: 8,         // Rounded corners with a radius of 8px
  position: "relative",     // Allows for positioning of elements within the card
  padding: "20px 20px 14px 24px"  // Custom padding for top, right, bottom, and left sides
});
