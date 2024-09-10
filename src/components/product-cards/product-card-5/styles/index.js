import styled from "@mui/material/styles/styled";
import BazaarCard from "components/BazaarCard";

/**
 * Styled component for the Bazaar card. It uses a flex layout, rounded borders, and transitions 
 * for hover effects like box shadows. It includes a `.controller` class for hover-based movement.
 *
 * @component
 * @param {Object} theme - MUI theme object for custom styling.
 */
export const StyledBazaarCard = styled(BazaarCard)(({ theme }) => ({
  margin: "auto",
  height: "100%",
  display: "flex",
  overflow: "hidden",
  position: "relative",
  flexDirection: "column",
  justifyContent: "space-between",
  transition: "all 250ms ease-in-out",
  border: `1px solid ${theme.palette.grey[300]}`,
  ":hover": {
    boxShadow: theme.shadows[2],
    ".controller": {
      right: 10
    }
  }
}));

/**
 * Styled component for wrapping the image inside the Bazaar card. 
 * It handles responsiveness by changing the display style based on the screen size.
 *
 * @component
 * @param {Object} theme - MUI theme object for custom styling.
 */
export const ImageWrapper = styled("div")(({ theme }) => ({
  height: "100%",
  textAlign: "center",
  position: "relative",
  display: "inline-block",
  [theme.breakpoints.down("sm")]: {
    display: "block"
  }
}));

/**
 * Styled component for the image box inside the Bazaar card. 
 * It applies padding and includes a bottom border to separate the image from other content.
 *
 * @component
 * @param {Object} theme - MUI theme object for custom styling.
 */
export const ImageBox = styled("div")(({ theme }) => ({
  padding: "3rem",
  height: "100%",
  borderBottom: `1px solid ${theme.palette.grey[300]}`
}));

/**
 * Styled component for the hover wrapper, which contains icons or action buttons.
 * It transitions into view from the right when the card is hovered.
 *
 * @component
 * @param {Object} theme - MUI theme object for custom styling.
 */
export const HoverWrapper = styled("div")(({ theme }) => ({
  top: 0,
  bottom: 0,
  width: 35,
  right: -40,
  height: 120,
  margin: "auto",
  display: "flex",
  background: "#fff",
  overflow: "hidden",
  borderRadius: "5px",
  alignItems: "center",
  position: "absolute",
  flexDirection: "column",
  boxShadow: theme.shadows[2],
  justifyContent: "space-between",
  transition: "right 0.3s ease-in-out",
  span: {
    width: "100%",
    height: "100%",
    display: "flex",
    padding: "10px 0px",
    alignItems: "center",
    justifyContent: "center",
    ":hover": {
      cursor: "pointer",
      background: "#f3f5f9"
    }
  },
  a: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "&:hover": {
      cursor: "pointer",
      background: "#f3f5f9"
    }
  },
  svg: {
    fontSize: 18,
    color: theme.palette.grey[600]
  }
}));

/**
 * Styled component for the content wrapper inside the Bazaar card. 
 * It manages padding and handles text overflow for elements like title and categories.
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

/**
 * Styled component for a button box inside the Bazaar card. 
 * It aligns buttons horizontally, ensuring spacing between them, and styles the buttons with primary theme colors.
 *
 * @component
 * @param {Object} theme - MUI theme object for custom styling.
 */
export const ButtonBox = styled("div")(({ theme }) => ({
  gap: 10,
  display: "flex",
  marginTop: "15px",
  justifyContent: "space-between",
  "& button": {
    color: "#fff",
    background: theme.palette.primary.main,
    "&:hover": {
      background: theme.palette.primary[600]
    }
  }
}));
