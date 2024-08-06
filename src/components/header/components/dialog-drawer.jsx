import { Fragment } from "react";
import Dialog from "@mui/material/Dialog";
import Drawer from "@mui/material/Drawer";
import useMediaQuery from "@mui/material/useMediaQuery"; 
// LOGIN FORM

import { LoginPageView } from "pages-sections/sessions/page-view"; 
// GLOBAL CUSTOM COMPONENTS

// LOGIN PAGE SECTIONS

import { Wrapper } from "pages-sections/sessions/styles";
import LogoWithTitle from "pages-sections/sessions/components/logo-title";
// ==============================================================


// ==============================================================
export default function DialogDrawer(props) {
  const {
    dialogOpen,
    sidenavOpen,
    toggleDialog,
    toggleSidenav
  } = props;
  const isMobile = useMediaQuery(theme => theme.breakpoints.down("xs"));
  return <Fragment>
      <Dialog scroll="body" open={dialogOpen} fullWidth={isMobile} onClose={toggleDialog} sx={{
      zIndex: 9999
    }}>
        <Wrapper>
          <LogoWithTitle />
          <LoginPageView closeDialog={toggleDialog} />
        </Wrapper>
      </Dialog>

      <Drawer open={sidenavOpen} anchor="right" onClose={toggleSidenav} sx={{
      zIndex: 9999
    }}>
      </Drawer>
    </Fragment>;
}