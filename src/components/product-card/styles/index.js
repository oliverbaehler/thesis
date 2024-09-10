import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import styled from "@mui/material/styles/styled";

/**
 * Styled component for a product card. When the card is hovered, the image zooms in,
 * and the product action buttons slide into view.
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
 * Styled component for the media section of the product card, which maintains an aspect ratio,
 * has a background color, and hides any overflow. On hover, the image will animate.
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
 * Styled IconButton for adding products to the cart. The button slides into view when the card is hovered.
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
 * Styled IconButton for adding products to favorites. The button slides into view when the card is hovered.
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
 * Styled button for quick view functionality. The button appears when the card is hovered.
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
