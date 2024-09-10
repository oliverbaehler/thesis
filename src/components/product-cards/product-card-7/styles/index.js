import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import styled from "@mui/material/styles/styled"; 
// GLOBAL CUSTOM COMPONENTS
import { Span } from "components/Typography";

/**
 * Styled component for a card layout. It manages the card's height, positioning, and hover effects.
 * The card has an outline, and a box shadow appears when hovered.
 *
 * @component
 * @param {Object} theme - MUI theme object for custom styling.
 */
export const StyledCard = styled(Box)(({ theme }) => ({
  height: "100%",
  margin: "auto",
  borderRadius: 0,
  overflow: "hidden",
  position: "relative",
  transition: "all 250ms ease-in-out",
  outline: `2px solid ${theme.palette.grey[50]}`,
  ":hover": {
    boxShadow: theme.shadows[2]
  }
}));

/**
 * Styled component for the image box inside the card. It sets the height and padding for the image section
 * and adds a background color. The `.img-wrapper` class ensures the image is centered.
 *
 * @component
 * @param {Object} theme - MUI theme object for custom styling.
 */
export const ImgBox = styled("div")(({ theme }) => ({
  height: 230,
  marginBottom: "5rem",
  padding: "60px 40px 20px 40px",
  background: theme.palette.grey[100],
  ".img-wrapper": {
    maxWidth: 300,
    margin: "auto"
  }
}));

/**
 * Styled component for wrapping the card content. It sets the layout and spacing for the content inside the card.
 *
 * @component
 */
export const ContentWrapper = styled("div")({
  gap: 8,
  display: "flex",
  padding: "1rem",
  ".content": {
    flex: "1 1 0"
  }
});

/**
 * Styled component for a status chip box that is positioned at the top-right of the card.
 * It displays the status as a label with triangular borders.
 *
 * @component
 * @param {Object} theme - MUI theme object for custom styling.
 */
export const StatusChipBox = styled("div")(({ theme }) => ({
  width: 40,
  height: 42,
  zIndex: 11,
  top: "0px",
  right: "30px",
  fontSize: "12px",
  position: "absolute",
  background: theme.palette.primary.main,
  ".triangle": {
    width: "100%",
    display: "flex"
  },
  ".triangle-left": {
    width: 0,
    height: 0,
    borderTop: "0px solid transparent",
    borderBottom: "10px solid transparent",
    borderLeft: `20px solid ${theme.palette.primary.main}`
  },
  ".triangle-right": {
    width: 0,
    height: 0,
    borderTop: "0px solid transparent",
    borderBottom: "10px solid transparent",
    borderRight: `20px solid ${theme.palette.primary.main}`
  }
}));

/**
 * Styled component for the status chip label inside the `StatusChipBox`. 
 * It ensures that the status text is centered and aligned properly inside the chip.
 *
 * @component
 */
export const StatusChip = styled(Span)({
  color: "#fff",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
});

/**
 * Styled component for displaying color options inside the card. 
 * It aligns the color circles and adds a hover effect to each.
 *
 * @component
 * @param {Object} theme - MUI theme object for custom styling.
 */
export const ColorBox = styled("div")(({ theme }) => ({
  gap: 8,
  display: "flex",
  padding: "10px 5px",
  "& span": {
    width: 12,
    height: 12,
    borderRadius: 8,
    "&:hover": {
      cursor: "pointer",
      outline: `2px solid ${theme.palette.grey[200]}`
    }
  }
}));

/**
 * Styled button component used inside the card. It has a hover effect where the button's 
 * background and border change to the primary color.
 *
 * @component
 * @param {Object} theme - MUI theme object for custom styling.
 */
export const StyledButton = styled(Button)(({ theme }) => ({
  padding: "4px",
  borderRadius: 0,
  transition: "all 0.3s",
  color: theme.palette.primary.main,
  ":hover": {
    color: "#fff",
    background: theme.palette.primary.main,
    border: `1px solid ${theme.palette.primary.main}`
  }
}));
