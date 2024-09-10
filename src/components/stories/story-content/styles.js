"use client";

import Button from "@mui/material/Button";
import styled from "@mui/material/styles/styled";

/**
 * Styled component for the root container. It is a flexible container that takes up the full width 
 * and height of its parent, with relative positioning to manage child components' positioning.
 *
 * @component
 */
export const StyledRoot = styled("div")(() => ({
  width: "100%",
  height: "100%",
  display: "flex",
  position: "relative"
}));

/**
 * Styled Button component that is positioned absolutely at the bottom of the parent container.
 * It is horizontally centered, has a high `z-index`, and features inline padding.
 *
 * @component
 */
export const StyledButton = styled(Button)(() => ({
  bottom: 30,
  left: "50%",
  zIndex: 1111,
  color: "white",
  fontWeight: 400,
  position: "absolute",
  paddingInline: "2rem",
  transform: "translateX(-50%)" // Centers the button horizontally
}));
