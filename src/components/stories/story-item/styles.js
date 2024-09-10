"use client";

import styled from "@mui/material/styles/styled";

/**
 * Styled component for a root container that is interactive (clickable) and has a flexible layout.
 * It includes styling for rounded corners, hidden overflow, and removes the default outline for better UX.
 *
 * @component
 */
export const StyledRoot = styled("div")({
  outline: 0,            // Removes the default focus outline
  display: "flex",        // Uses flexbox for layout
  borderRadius: 4,        // Rounds the corners
  cursor: "pointer",      // Indicates the element is clickable
  overflow: "hidden"      // Hides content that overflows the container
});
