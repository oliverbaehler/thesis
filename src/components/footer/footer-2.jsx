import Link from "next/link";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid"; 

import BazaarImage from "components/BazaarImage";
import { Paragraph } from "components/Typography"; 

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
        <Grid item sm={12} xs={12}>
          <Link href="/">
            <BazaarImage mb={2.5} src="/assets/images/brand/black.png" alt="logo" />
          </Link>

          <Paragraph mb={2.5} color="grey.500" maxWidth="370px">
            <strong>Note</strong>: This is a demo website. The products are not for sale nor is this data production-ready. Currently only at prototype stage 
          </Paragraph>
        </Grid>
      </Grid>
    </StyledFooter>;
}