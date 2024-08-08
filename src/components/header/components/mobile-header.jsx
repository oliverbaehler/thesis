import Link from "next/link";
import { Fragment } from "react";
import Box from "@mui/material/Box";
import Badge from "@mui/material/Badge";
import Drawer from "@mui/material/Drawer";
import PersonOutline from "@mui/icons-material/PersonOutline"; 
import IconButton from "@mui/material/IconButton"; 
// MUI ICON COMPONENT

import Clear from "@mui/icons-material/Clear"; 
// CUSTOM ICON COMPONENTS

import Icon from "icons"; 
// LOCAL CUSTOM COMPONENTS

import DialogDrawer from "./dialog-drawer"; 
// GLOBAL CUSTOM COMPONENTS

import { useRouter } from "next/navigation";
import { useAuth } from "contexts/SessionContext";
import Image from "components/BazaarImage";
import { Paragraph } from "components/Typography";
import { MobileMenu } from "components/navbar/mobile-menu";
import { FlexBetween, FlexBox } from "components/flex-box"; 
import LoginIcon from '@mui/icons-material/Login';

import useHeader from "../hooks/use-header";

import { CustomButton, ToggleWrapper } from "./styles";

export default function MobileHeader() {
  const router = useRouter();
  const { user } = useAuth();
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

  const handleUser = () => {
    router.push("/dashboard/account-settings");
  };  

  return <Fragment>
      <FlexBetween width="100%">

        <Box flex={1}>
          <MobileMenu />
        </Box>

        <Link href="/">
          <Image height={44} src="/assets/images/brand/black.svg" alt="logo" />
        </Link>

        <FlexBox justifyContent="end" flex={1}>
        {user ? (
        <>
          <IconButton onClick={handleNavigation}>
            <Icon.Home sx={ICON_STYLE} />
          </IconButton>
          <IconButton onClick={handleUser}>
           {user.photoURL ? (
            <Avatar alt="User Avatar" src={user.photoURL} />
           ) : (
            <PersonOutline sx={{ ...ICON_STYLE, color: "gray" }} />
           )}
          </IconButton>
        </>
        ) : (
          <CustomButton onClick={toggleDialog} startIcon={<LoginIcon sx={{
            color: "grey.900"
          }} />}>
              Login
          </CustomButton>
        )}
        </FlexBox>
      </FlexBetween>


      {
      /* LOGIN FORM DIALOG AND CART SIDE BAR  */
    }
      <DialogDrawer dialogOpen={dialogOpen} sidenavOpen={sidenavOpen} toggleDialog={toggleDialog} toggleSidenav={toggleSidenav} />
    </Fragment>;
}