import Link from "next/link";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid"; 
// LOCAL CUSTOM COMPONENTS

import AppStore from "./components/app-store";
import SocialLinks from "./components/social-links"; 
// GLOBAL CUSTOM COMPONENTS

import BazaarImage from "components/BazaarImage";
import { Paragraph } from "components/Typography"; 
// DATA

import { CUSTOMER_CARE_LINKS } from "./data"; 
// STYLED COMPONENTS

import { StyledFooter, StyledLink } from "./styles";
export default function Footer2() {
  return <StyledFooter sx={{
    padding: 5,
    color: "white",
    borderRadius: 2,
    bgcolor: "#141850",
    mb: {
      md: 2,
      xs: 10
    }
  }}>
      <Grid container spacing={6}>
        <Grid item sm={6} xs={12}>
          <Link href="/">
            <BazaarImage mb={2.5} src="/assets/images/brand/black.png" alt="logo" />
          </Link>

          <Paragraph mb={2.5} color="grey.500" maxWidth="370px">
            <strong>Note</strong>: This is a demo website. The products are not for sale nor is this data production-ready. Currently only at prototype stage 
          </Paragraph>
          <AppStore />
        </Grid>

        <Grid item sm={6} xs={12}>
          {
          /* CUSTOMER CARE LINKS */
        }
          <Box mb={2} mt={{
          md: 6,
          xs: 2
        }}>
            {CUSTOMER_CARE_LINKS.map((item, ind) => <StyledLink href="/" key={ind}>
                {item}
              </StyledLink>)}
          </Box>

          {
          /* SOCIAL LINKS WITH ICON */
        }
          <SocialLinks />
        </Grid>
      </Grid>
    </StyledFooter>;
}