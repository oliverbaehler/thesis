import Container from "@mui/material/Container";
import styled from "@mui/material/styles/styled"; 
import { layoutConstant } from "utils/constants";

/**
 * Styled component for the header wrapper. It manages the styling and layout of the header,
 * with a dynamic height that changes based on screen size.
 *
 * @component
 * @param {Object} theme - MUI theme object for custom styling.
 */
export const HeaderWrapper = styled("div")(({ theme }) => ({
  zIndex: 3,
  position: "relative",
  height: layoutConstant.headerHeight,
  transition: "height 250ms ease-in-out",
  background: theme.palette.background.paper,

  // The border is commented out, but you can add it if needed.
  // borderBottom: `1px solid ${theme.palette.grey[200]}`,
  
  [theme.breakpoints.down("sm")]: {
    height: layoutConstant.mobileHeaderHeight
  }
}));

/**
 * Styled component for a MUI Container that manages the layout of the header's inner content.
 * It aligns the content with flex properties and creates space between child elements.
 *
 * @component
 */
export const StyledContainer = styled(Container)({
  gap: 2,
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between"
});
