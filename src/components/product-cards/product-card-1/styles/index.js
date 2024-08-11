import styled from "@mui/material/styles/styled"; 
import BazaarCard from "components/BazaarCard";

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

export const ImageWrapper = styled("div")(({
  theme
}) => ({
  textAlign: "center",
  position: "relative",
  display: "inline-block",
  width: "100%", // Ensure wrapper takes full width
  [theme.breakpoints.down("sm")]: {
    display: "block"
  }
}));

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