import styled from "@mui/material/styles/styled"; 
import BazaarCard from "components/BazaarCard";

/**
 * Styled component for BazaarCard. It defines the layout, transitions, and hover effects for the card.
 * When hovered, elements inside the `.hover-box` will become visible.
 *
 * @component
 */
export const StyledBazaarCard = styled(BazaarCard)({
  margin: "auto",
  display: "flex",
  overflow: "hidden",
  borderRadius: "8px",
  position: "relative",
  flexDirection: "column",
  justifyContent: "space-between",
  transition: "all 250ms ease-in-out",
  ":hover": {
    "& .hover-box": {
      opacity: 1
    }
  }
});

/**
 * Styled component for wrapping images inside the BazaarCard. It centers the image and ensures it
 * takes up full width of the wrapper. On smaller screens, it adjusts to display as a block element.
 *
 * @component
 * @param {Object} theme - MUI theme object for custom styling.
 */
export const ImageWrapper = styled("div")(({ theme }) => ({
  textAlign: "center",
  position: "relative",
  display: "inline-block",
  width: "100%", // Ensure wrapper takes full width
  [theme.breakpoints.down("sm")]: {
    display: "block"
  }
}));

/**
 * Styled component for the hover icon container. It appears when the card is hovered, 
 * positioned in the top right corner with a smooth transition.
 *
 * @component
 */
export const HoverIconWrapper = styled("div")({
  zIndex: 2,
  top: "7px",
  opacity: 0,
  right: "15px",
  display: "flex",
  cursor: "pointer",
  position: "absolute",
  flexDirection: "column",
  transition: "all 0.3s ease-in-out"
});

/**
 * Styled component for the content section of the BazaarCard. It defines padding, layout,
 * and ensures text elements like title and categories handle overflow gracefully by truncating.
 *
 * @component
 */
export const ContentWrapper = styled("div")({
  gap: 8,
  display: "flex",
  padding: "1rem",
  flexDirection: "column", // Stack the text content vertically
  "& .title, & .categories": {
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis"
  }
});
