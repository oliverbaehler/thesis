import styled from "@mui/material/styles/styled"; 
// GLOBAL CUSTOM COMPONENT
import { FlexBetween } from "components/flex-box";

/**
 * Styled component for the main Bazaar card container. It is a flexible, column-based layout 
 * with overflow handling, designed to position elements between the top and bottom of the card.
 *
 * @component
 */
export const StyledBazaarCard = styled("div")({
  height: "100%",
  margin: "auto",
  display: "flex",
  overflow: "hidden",
  position: "relative",
  flexDirection: "column",
  justifyContent: "space-between"
});

/**
 * Styled component for wrapping the image inside the Bazaar card. It handles responsiveness 
 * and displays hover effects, such as blurring the image and showing action buttons.
 *
 * @component
 * @param {Object} theme - MUI theme object for custom styling.
 */
export const ImageWrapper = styled("div")(({ theme }) => ({
  height: "100%",
  borderRadius: 8,
  overflow: "hidden",
  textAlign: "center",
  position: "relative",
  display: "inline-block",
  [theme.breakpoints.down("sm")]: {
    display: "block"
  },
  "&:hover": {
    "& .hoverButtonBox": {
      opacity: 1
    },
    "& .hoverImgBox": {
      filter: "blur(5px)"
    }
  }
}));

/**
 * Styled component for the box that contains hover action buttons. 
 * It is initially hidden and becomes visible on hover, centered within the image wrapper.
 *
 * @component
 */
export const HoverButtonBox = styled("div")({
  opacity: 0,
  top: "50%",
  left: "50%",
  width: "100%",
  height: "100%",
  position: "absolute",
  transition: ".5s ease",
  transform: "translate(-50%, -50%)",
  "& .buttonBox": {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    position: "relative",
    flexDirection: "column",
    justifyContent: "center",
    "& .addCartButton": {
      bottom: 20,
      margin: "auto",
      padding: "4px 14px",
      position: "absolute",
      "& svg": {
        fontSize: 16
      }
    }
  }
});

/**
 * Styled component for the image container inside the Bazaar card. 
 * It centers the image and applies padding and background styling, with a hover effect that applies a blur.
 *
 * @component
 */
export const ImageBox = styled("div")({
  opacity: 1,
  height: "100%",
  display: "grid",
  placeItems: "center",
  padding: "44px 40px",
  background: "#F5F5F5",
  transition: "all .3s ease"
});

/**
 * Styled component for the item controller in the Bazaar card. It provides a flex layout with hover 
 * effects and includes an interactive span and icons. It also applies background and shadow effects.
 *
 * @component
 * @param {Object} theme - MUI theme object for custom styling.
 */
export const ItemController = styled(FlexBetween)(({ theme }) => ({
  background: "#fff",
  overflow: "hidden",
  borderRadius: "5px",
  boxShadow: theme.shadows[2],
  "& span": {
    width: "100%",
    height: "100%",
    display: "flex",
    padding: "6px 12px",
    alignItems: "center",
    "&:hover": {
      cursor: "pointer",
      background: "#f3f5f9"
    }
  },
  "& svg": {
    fontSize: 22,
    color: theme.palette.grey[600]
  }
}));

/**
 * Styled component for the content wrapper inside the Bazaar card. 
 * It adds padding and ensures text elements like title and categories handle overflow gracefully by truncating.
 *
 * @component
 */
export const ContentWrapper = styled("div")({
  padding: "1rem",
  "& .title, & .categories": {
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis"
  }
});
