"use client";

import styled from "@mui/material/styles/styled";
const CommonDiv = styled("div")({
  gap: "2rem",
  display: "flex",
  alignItems: "center",
  position: "relative"
});
const CommonWrapper = styled(CommonDiv)({
  flex: 1,
  ".banner-img": {
    width: "100%",
    objectFit: "cover"
  },
  ".content": {
    color: "white",
    position: "absolute"
  }
}); 
// ==============================================================

// CARD 1 STYLED COMPONENT
export const Card1Wrapper = styled(CommonDiv)(({ theme }) => ({
  backgroundColor: "#FFA954",
  borderRadius: "12px", // Rounded corners
  overflow: "hidden", // Ensure content stays within rounded corners
  transition: "transform 0.3s ease, box-shadow 0.3s ease", // Smooth transitions
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
  height: "400px", // Increase the height of the card
  display: "flex",
  flexDirection: "column",
  justifyContent: "center", // Center content vertically
  position: "relative", // Ensure the background gradient is positioned correctly

  "&:hover": {
    transform: "translateY(-5px)", // Lift effect on hover
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)", // Stronger shadow on hover
  },

  img: {
    position: "relative",
    zIndex: 1,
    width: "100%", // Ensure the image takes full width
    height: "auto", // Maintain aspect ratio
  },

  ".content": {
    color: "white",
    position: "relative",
    padding: "20px", // Increase padding for better content spacing
    textAlign: "left", // Ensure text is aligned to the left
    zIndex: 2, // Ensure the content is above the gradient

    "::before": {
      top: 35,
      width: 180,
      height: 75,
      left: "-70%",
      content: "''",
      position: "absolute",
      zIndex: 0, // Make sure the gradient is behind the content
      [theme.breakpoints.down("lg")]: {
        left: "-82%",
        top: 30,
        height: 70,
      },
      [theme.breakpoints.up("xl")]: {
        left: "-60%",
        height: 90,
      },
      [theme.breakpoints.down(575)]: {
        display: "none",
      },
    },
  },

  [theme.breakpoints.down(575)]: {
    padding: "2rem",
    img: {
      display: "none",
    },
  },
}));
// CARD 2 STYLED COMPONENT

export const Card2Wrapper = styled(CommonWrapper)(({
  theme
}) => ({
  width: "100%",
  ".content": {
    left: 30,
    ...(theme.direction === "rtl" && {
      right: 30,
      left: "auto"
    })
  },
  [theme.breakpoints.down(575)]: {
    ".banner-img": {
      objectPosition: "top"
    }
  }
})); 
// CARD 3 STYLED COMPONENT

export const Card3Wrapper = styled(CommonWrapper)(({
  theme
}) => ({
  ".content": {
    top: 20,
    left: 30,
    ...(theme.direction === "rtl" && {
      right: 30,
      left: "auto"
    })
  }
})); 
// CARD 4 STYLED COMPONENT

export const Card4Wrapper = styled(CommonWrapper)(({
  theme
}) => ({
  width: "100%",
  ".content": {
    top: 30,
    right: 30,
    ...(theme.direction === "rtl" && {
      left: 30,
      right: "auto"
    })
  }
})); 
// CARD 5 STYLED COMPONENT

export const Card5Wrapper = styled(CommonWrapper)(({
  theme
}) => ({
  height: "100%",
  color: "white",
  textAlign: "center",
  paddingBlock: "2rem",
  justifyContent: "center",
  backgroundColor: theme.palette.paste[400],
  ".content": {
    right: 30,
    top: 30
  }
})); 
// CARD 6 STYLED COMPONENT

export const Card6Wrapper = styled("div")(({
  theme
}) => ({
  display: "flex",
  position: "relative",
  ".banner-img": {
    width: "100%",
    objectFit: "cover"
  },
  ".content": {
    left: 30,
    top: "50%",
    color: "white",
    position: "absolute",
    transform: "translateY(-50%)",
    ...(theme.direction === "rtl" && {
      right: 30,
      left: "auto",
      textAlign: "right"
    })
  }
}));