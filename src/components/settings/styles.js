import Avatar from "@mui/material/Avatar";
import styled from "@mui/material/styles/styled";
import IconButton from "@mui/material/IconButton";

/**
 * Styled component for the main container that holds the fixed position layout. 
 * It is positioned at the top-right of the screen and is hidden on medium and smaller screens.
 *
 * @component
 * @param {Object} theme - MUI theme object for custom styling.
 */
export const MainContainer = styled("div")(({ theme }) => ({
  top: 50,
  right: 50,
  zIndex: 1501,
  position: "fixed",
  [theme.breakpoints.down("md")]: {
    display: "none"
  }
}));

/**
 * Styled component for a floating IconButton. Positioned at the bottom-right of the screen with 
 * a fixed position and a circular appearance. The button has a shadow and hover effects.
 *
 * @component
 * @param {Object} theme - MUI theme object for custom styling.
 */
export const StyledIconButton = styled(IconButton)(({ theme }) => ({
  right: 50,
  zIndex: 99,
  bottom: 50,
  padding: 12,
  color: "#fff",
  position: "fixed",
  borderRadius: "50%",
  boxShadow: theme.shadows[12],
  backgroundColor: theme.palette.primary.main,
  ":hover": {
    backgroundColor: theme.palette.primary.main
  }
}));

/**
 * Styled component for a wrapper that shows or hides content based on the `showBody` prop.
 * It manages the width, padding, opacity, and animation, making it slide in and out smoothly.
 *
 * @component
 * @param {Object} theme - MUI theme object for custom styling.
 * @param {boolean} showBody - Prop to control visibility and animation of the body.
 */
export const BodyWrapper = styled("div", {
  shouldForwardProp: (prop) => prop !== "showBody"
})(({ theme, showBody }) => ({
  borderRadius: "4px",
  backgroundColor: "white",
  opacity: showBody ? 1 : 0,
  width: showBody ? 300 : 0,
  padding: showBody ? 24 : 0,
  boxShadow: theme.shadows[3],
  transition: "transform 0.4s",
  transform: `translateY(${showBody ? 0 : "10px"})`
}));

/**
 * Styled component for an Avatar with hover effects. The avatar has a dynamic width, flex behavior, 
 * and a hover effect that darkens the image with a semi-transparent overlay.
 *
 * @component
 */
export const StyledAvatar = styled(Avatar)({
  flexGrow: 1,
  height: 100,
  width: "45%",
  cursor: "pointer",
  borderRadius: "10px",
  position: "relative", // For the hover effect
  ":last-of-type": {
    flexGrow: 0
  },
  ":hover": {
    "&::after": {
      opacity: 0.5
    }
  },
  "::after": {
    opacity: 0,
    content: '""',
    width: "100%",
    height: "100%",
    background: "black",
    position: "absolute",
    transition: "all 0.3s"
  }
});
