"use client";

import styled from "@mui/material/styles/styled";

/**
 * Styled component for a modal wrapper. This modal is centered on the screen both horizontally and vertically, 
 * with a fixed aspect ratio, rounded corners, and a white background. The `translate` function is used to 
 * perfectly center the modal.
 *
 * @component
 */
export const ModalWrapper = styled("div")(() => ({
  top: "50%",                           // Center vertically
  left: "50%",                          // Center horizontally
  outline: 0,                           // Remove default outline
  borderRadius: 4,                      // Round corners
  overflow: "hidden",                   // Hide any overflowing content
  aspectRatio: "9/16",                  // Maintain a 9:16 aspect ratio
  position: "absolute",                 // Position absolutely within its container
  backgroundColor: "white",             // Set background to white
  transform: "translate(-50%, -50%)"    // Translate to center on both axes
}));
