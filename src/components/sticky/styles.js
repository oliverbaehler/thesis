import { keyframes, styled } from "@mui/material/styles";

// ==============================================================

/**
 * Keyframe animation that moves the element from above the viewport (-200% Y-axis)
 * to its normal position (0 Y-axis), creating a sliding down effect.
 */
const slideDown = keyframes`
    from {transform: translateY(-200%)}
    to {transform: translateY(0)}
`;

/**
 * Styled component for a box that can be fixed at a certain position or be in its normal flow.
 * It includes animation for sliding down when fixed and has customizable properties for height and fixed positioning.
 *
 * @component
 * @param {Object} theme - MUI theme object for custom styling.
 * @param {number} componentHeight - The height to use when the component is fixed.
 * @param {number} fixedOn - The offset from the top when the component becomes fixed.
 * @param {boolean} fixed - Whether the component is in a fixed position.
 */
export const StyledBox = styled("div", {
  shouldForwardProp: prop => prop !== "componentHeight" && prop !== "fixed" && prop !== "fixedOn"
})(({ theme, componentHeight, fixedOn, fixed }) => ({
  paddingTop: fixed ? componentHeight : 0, // Apply padding when the component is fixed
  "& .hold": {
    zIndex: 5,
    boxShadow: "none",
    position: "relative"
  },
  "& .fixed": {
    left: 0,
    right: 0,
    zIndex: 1500,
    position: "fixed",
    top: `${fixedOn}px`, // Position the component at the specified offset from the top
    boxShadow: theme.shadows[2],
    transition: "all 350ms ease-in-out", // Smooth transition for the fixed position
    animation: `${slideDown} 400ms ${theme.transitions.easing.easeInOut}` // Slide down animation when fixed
  }
}));
