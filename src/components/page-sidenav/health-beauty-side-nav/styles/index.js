"use client";

import Card from "@mui/material/Card";
import styled from "@mui/material/styles/styled";

/**
 * A styled Material-UI Card component representing the root of the navbar.
 * It has a full height, no border radius, and uses relative positioning.
 *
 * @component
 * @returns {JSX.Element} - A styled Card component used as the root of the Navbar.
 */
export const NavbarRoot = styled(Card)(() => ({
  height: "100%",       // Full height to fill the container
  borderRadius: 0,      // No border radius for sharp corners
  position: "relative"  // Allows for positioning child elements relative to this container
}));

/**
 * A styled div that represents a list item in a dot list.
 * The list item contains a dot and text, and it changes the color of the dot on hover.
 *
 * @component
 * @param {Object} theme - The theme object provided by Material-UI for consistent theming.
 * @returns {JSX.Element} - A div styled as a list item with hover effect on the dot.
 */
export const DotListItem = styled("div")(({ theme }) => ({
  gap: 8,                         // Space between elements in the flex container
  display: "flex",                // Flexbox layout for horizontal alignment
  paddingBlock: 10,               // Vertical padding (top and bottom)
  alignItems: "center",           // Vertically center the items
  transition: "all 0.2s",         // Smooth transition for hover effects
  ":hover": {
    ".dot": {
      backgroundColor: theme.palette.primary.main // Change dot color on hover
    }
  }
}));

/**
 * A styled div that represents a small circular dot.
 * The dot is used as an indicator in a list and its color changes on hover when used within `DotListItem`.
 *
 * @component
 * @param {Object} theme - The theme object provided by Material-UI for consistent theming.
 * @returns {JSX.Element} - A div styled as a small circle.
 */
export const Circle = styled("div")(({ theme }) => ({
  width: 4,                       // Width of the dot
  height: 4,                      // Height of the dot (same as width to keep it circular)
  borderRadius: 3,                // Rounds the corners to create a circle
  marginLeft: "2rem",             // Left margin for spacing
  backgroundColor: theme.palette.grey[600]  // Default background color of the dot
}));
