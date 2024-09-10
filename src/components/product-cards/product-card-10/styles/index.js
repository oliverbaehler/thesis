import IconButton from "@mui/material/IconButton";
import styled from "@mui/material/styles/styled";

/**
 * Styled component for a product card. It defines the layout, background color, border, and hover effects.
 * On hover, the product actions slide into view, and the image is slightly zoomed.
 *
 * @component
 * @param {Object} theme - MUI theme object for custom styling.
 */
export const Card = styled("div")(({ theme }) => ({
  height: "100%",
  borderRadius: "3px",
  transition: "all 0.3s",
  backgroundColor: theme.palette.common.white,
  border: `1px solid ${theme.palette.grey[100]}`,
  ":hover": {
    "& .product-actions": {
      right: 5
    },
    "& img": {
      transform: "scale(1.1)"
    },
    border: `1px solid ${theme.palette.dark.main}`
  }
}));

/**
 * Styled component for the media (image) section of the product card.
 * It ensures the image container takes full width and maintains a maximum height. 
 * On hover, the image animates with a zoom effect.
 *
 * @component
 */
export const CardMedia = styled("div")({
  width: "100%",
  maxHeight: 300,
  cursor: "pointer",
  overflow: "hidden",
  position: "relative",
  "& img": {
    transition: "0.3s"
  }
});

/**
 * Styled IconButton component for product action buttons (e.g., add to cart).
 * The button slides into view from the right when the card is hovered.
 *
 * @component
 */
export const StyledIconButton = styled(IconButton)({
  top: 10,
  right: -40,
  position: "absolute",
  transition: "right 0.3s .1s"
});

/**
 * Styled IconButton component for adding products to favorites.
 * The button slides into view from the right with a delay when the card is hovered.
 *
 * @component
 */
export const FavoriteButton = styled(IconButton)({
  top: 45,
  right: -40,
  position: "absolute",
  transition: "right 0.3s .2s"
});
