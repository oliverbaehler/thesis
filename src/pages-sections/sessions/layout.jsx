"use client";

import LogoWithTitle from "./components/logo-title";
import { FlexRowCenter } from "components/flex-box"; 

import { Wrapper } from "./styles";
export default function AuthLayout({
  children
}) {
  return <FlexRowCenter flexDirection="column" minHeight="100vh" px={2}>
      <Wrapper elevation={3}>
        {
      }
        <LogoWithTitle />

        {
      }
        {children}

        {
      }

        {
      }
      </Wrapper>
    </FlexRowCenter>;
}