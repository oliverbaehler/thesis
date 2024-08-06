import Link from "next/link";
import { Fragment } from "react";
import useTheme from "@mui/material/styles/useTheme";
import useMediaQuery from "@mui/material/useMediaQuery";
import clsx from "clsx";

import LazyImage from "components/LazyImage";
import FlexBox from "components/flex-box/flex-box"; 

import useHeader from "./hooks/use-header"; 

import MobileHeader from "./components/mobile-header";
import DialogDrawer from "./components/dialog-drawer";
import LoginButton from "./components/login-button"; 

import { HeaderWrapper, StyledContainer } from "./styles"; 
// ==============================================================


// ==============================================================
export default function Header({
  isFixed,
  className,
  midSlot
}) {
  const theme = useTheme();
  const downMd = useMediaQuery(theme.breakpoints.down(1150));
  const {
    dialogOpen,
    sidenavOpen,
    toggleDialog,
    toggleSidenav
  } = useHeader();
  const CONTENT_FOR_LARGE_DEVICE = <Fragment>
      {
      /* LEFT CONTENT - LOGO AND CATEGORY */
    }
      <FlexBox minWidth={100} alignItems="center">
        <Link href="/">
          <LazyImage src={require("../../../public/assets/images/logo2.svg")} alt="logo" />
        </Link>
      </FlexBox>

      {midSlot}
      <LoginButton toggleDialog={toggleDialog} toggleSidenav={toggleSidenav} />

      <DialogDrawer dialogOpen={dialogOpen} sidenavOpen={sidenavOpen} toggleDialog={toggleDialog} toggleSidenav={toggleSidenav} />
    </Fragment>;
  return <HeaderWrapper className={clsx(className)}>
      <StyledContainer>{downMd ? <MobileHeader /> : CONTENT_FOR_LARGE_DEVICE}</StyledContainer>
    </HeaderWrapper>;
}