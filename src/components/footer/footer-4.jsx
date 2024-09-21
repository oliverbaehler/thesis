import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Container from "@mui/material/Container"; 
// LOCAL CUSTOM COMPONENT

import LazyImage from "components/LazyImage";
import { Paragraph } from "components/Typography";
import FlexBetween from "components/flex-box/flex-between"; 
// STYLED COMPONENT

export default function Footer4() {
  return <Box component="footer" bgcolor="white" pt={12}>
      <Container>
        <Grid container spacing={3}>
          <Grid item lg={12} md={4} sm={6} xs={12}>
            <Box maxWidth={100}>
              <LazyImage src={require("../../../public/assets/images/brand/black.svg")} alt="logo" />
            </Box>

            <Paragraph mb={2.5} maxWidth={{
            xl: 400
          }}>
              <strong>Note</strong>: This is a demo website. The products are not for sale nor is this data production-ready. Currently only at prototype stage 
            </Paragraph>
          </Grid>
        </Grid>

        <Box component={Divider} mt={{
        md: 8,
        xs: 3
      }} />

        <FlexBetween pt={2} pb={{
        sm: 10,
        md: 2
      }}>
          <Paragraph>© 2024 By Oliver Bähler. All rights reserved.</Paragraph>
        </FlexBetween>
      </Container>
    </Box>;
}