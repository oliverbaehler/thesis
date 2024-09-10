import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import styled from "@mui/material/styles/styled";

/**
 * Styled component for a product card. The card applies hover effects that enlarge the product image 
 * and reveal product actions like adding to cart or viewing the product.
 *
 * @component
 */
export const Card = styled("div")({
  ":hover": {
    img: {
      transform: "scale(1.1)"
    },
    ".product-actions": {
      right: 15
    },
    ".product-view-action": {
      opacity: 1
    }
  }
});

/**
 * Styled component for the media section of the product card.
 * It maintains a square aspect ratio, applies a background color, and defines hover transitions for the image.
 *
 * @component
 * @param {Object} theme - MUI theme object for custom styling.
 */
export const CardMedia = styled("div")(({ theme }) => ({
  aspectRatio: "1/1",
  borderRadius: 4,
  cursor: "pointer",
  overflow: "hidden",
  position: "relative",
  backgroundColor: theme.palette.grey[300],
  img: {
    transition: "0.3s"
  }
}));

/**
 * Styled IconButton for adding products to the cart. It is hidden off-screen initially 
 * and slides into view when the card is hovered.
 *
 * @component
 * @param {Object} theme - MUI theme object for custom styling.
 */
export const AddToCartButton = styled(IconButton)(({ theme }) => ({
  top: 15,
  right: -40,
  position: "absolute",
  backgroundColor: "white",
  transition: "right 0.3s .1s",
  color: theme.palette.text.primary,
  ".icon": {
    fontSize: 16
  }
}));

/**
 * Styled IconButton for adding products to favorites. It is hidden off-screen initially 
 * and slides into view with a delay when the card is hovered.
 *
 * @component
 * @param {Object} theme - MUI theme object for custom styling.
 */
export const FavoriteButton = styled(IconButton)(({ theme }) => ({
  top: 55,
  right: -40,
  position: "absolute",
  backgroundColor: "white",
  transition: "right 0.3s .2s",
  color: theme.palette.text.primary,
  ".icon": {
    fontSize: 16
  }
}));

/**
 * Styled Button for quick view functionality. It is initially hidden and fades into view 
 * from the bottom of the card when hovered.
 *
 * @component
 */
export const QuickViewButton = styled(Button)({
  left: 0,
  bottom: 12,
  opacity: 0,
  borderRadius: 4,
  position: "absolute",
  transition: "all 0.3s"
});
