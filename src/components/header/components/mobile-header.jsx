import Link from "next/link";
import { Fragment } from "react";
import Box from "@mui/material/Box";
import Badge from "@mui/material/Badge";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton"; 
// MUI ICON COMPONENT

import Clear from "@mui/icons-material/Clear"; 
// CUSTOM ICON COMPONENTS

import Icon from "icons"; 
// LOCAL CUSTOM COMPONENTS

import DialogDrawer from "./dialog-drawer"; 
// GLOBAL CUSTOM COMPONENTS

import Image from "components/BazaarImage";
import { Paragraph } from "components/Typography";
import { MobileMenu } from "components/navbar/mobile-menu";
import { FlexBetween, FlexBox } from "components/flex-box"; 
import { useRouter } from 'next/navigation';

// GLOBAL CUSTOM HOOK

import useHeader from "../hooks/use-header";
export default function MobileHeader() {
  const router = useRouter();

  const {
    dialogOpen,
    sidenavOpen,
    searchBarOpen,
    toggleDialog,
    toggleSearchBar,
    toggleSidenav
  } = useHeader();
  const ICON_STYLE = {
    color: "grey.600",
    fontSize: 20
  };

  const handleNavigation = () => {
    router.push('/dashboard');
  };

  return <Fragment>
      <FlexBetween width="100%">

        <Box flex={1}>
          <MobileMenu />
        </Box>

        <Link href="/">
          <Image height={44} src="/assets/images/bazaar-black-sm.svg" alt="logo" />
        </Link>

        <FlexBox justifyContent="end" flex={1}>
          <IconButton onClick={handleNavigation}>
            <Icon.Home sx={ICON_STYLE} />
          </IconButton>

          <IconButton onClick={toggleDialog}>
            <Icon.User sx={ICON_STYLE} />
          </IconButton>
        </FlexBox>
      </FlexBetween>


      {
      /* LOGIN FORM DIALOG AND CART SIDE BAR  */
    }
      <DialogDrawer dialogOpen={dialogOpen} sidenavOpen={sidenavOpen} toggleDialog={toggleDialog} toggleSidenav={toggleSidenav} />
    </Fragment>;
}