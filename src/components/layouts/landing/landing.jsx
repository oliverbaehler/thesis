"use client";

import { Fragment, useCallback, useState } from "react";
import { usePathname } from "next/navigation";
import Divider from "@mui/material/Divider"; 
// GLOBAL CUSTOM COMPONENTS

import Box from "@mui/material/Box"; 
import Sticky from "components/sticky";
import { Footer4 } from "components/footer";
import Header from "components/header";
import { MobileNavigationBar } from "components/mobile-navigation";
/**
 *  USED IN:
 *  1. GADGET-2 | FURNITURE-2 | MEDICAL | GROCERY-1
 */

export default function LandingLayout({
  children
}) {
  const pathname = usePathname();
  const [isFixed, setIsFixed] = useState(false);
  const toggleIsFixed = useCallback(fixed => setIsFixed(fixed), []);
  const STYLE = {
    marginRight: "auto",
    marginLeft: "2rem"
  };
  const HEADER_SLOT = <div style={STYLE}>
    </div>;
  return <Fragment>
    <Box
      display="flex"
      flexDirection="column"
      minHeight="100vh"
    >

      {
      /* HEADER */
      }
      <Sticky fixedOn={0} onSticky={toggleIsFixed} scrollDistance={300}>
        <Header isFixed={isFixed} midSlot={HEADER_SLOT} />
        <Divider />
      </Sticky>

      {
      /* BODY CONTENT */
      }
      <Box flex="1">
        {children}
      </Box>

      {
      /* SMALL DEVICE BOTTOM NAVIGATION */
    }
      <MobileNavigationBar />

      {
      /* FOOTER */
    }
      {pathname !== "/grocery-1" ? <Footer4 /> : null}
      </Box>
    </Fragment>;
}