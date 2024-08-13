"use client";

import Badge from "@mui/material/Badge";
import useMediaQuery from "@mui/material/useMediaQuery"; 
// CUSTOM ICON COMPONENTS

import Home from "icons/Home";
import User2 from "icons/User2";
import CategoryOutlined from "icons/CategoryOutline";
import ShoppingBagOutlined from "icons/ShoppingBagOutlined"; 
// GLOBAL CUSTOM HOOK


import { iconStyle, StyledNavLink, Wrapper } from "./styles";
export default function MobileNavigationBar() {
  const DOWN_900 = useMediaQuery(theme => theme.breakpoints.down(900));

  if (DOWN_900) {
    return <Wrapper>
        {list.map(({
        Icon,
        href,
        title
      }) => <StyledNavLink href={href} key={title}>
          </StyledNavLink>)}
      </Wrapper>;
  }

  return null;
}
const list = [{
  title: "Home",
  Icon: Home,
  href: "/"
}, {
  title: "Category",
  Icon: CategoryOutlined,
  href: "/mobile-category-nav"
}, {
  title: "Account",
  Icon: User2,
  href: "/profile"
}];