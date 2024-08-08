import Avatar from "@mui/material/Avatar"; 
// GLOBAL CUSTOM COMPONENT

import FlexBetween from "components/flex-box/flex-between"; 
// LOCAL CUSTOM HOOK

import { useLayout } from "../dashboard-layout-context"; 
// STYLED COMPONENT

import { ChevronLeftIcon } from "./styles";
export default function LogoArea() {
  const {
    TOP_HEADER_AREA,
    COMPACT,
    sidebarCompact,
    handleSidebarCompactToggle
  } = useLayout();
  return <FlexBetween p={2} maxHeight={TOP_HEADER_AREA} justifyContent={COMPACT ? "center" : "space-between"}>
      <Avatar alt="Bazaar Logo" src={COMPACT ? "/assets/images/brand/white.svg" : "/assets/images/brand/original.svg"} sx={{
      borderRadius: 0,
      width: "auto",
      marginLeft: COMPACT ? 0 : 1
    }} />

      <ChevronLeftIcon color="disabled" compact={COMPACT} onClick={handleSidebarCompactToggle} sidebar_compact={sidebarCompact ? 1 : 0} />
    </FlexBetween>;
}