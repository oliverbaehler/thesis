"use client";

import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container"; 

import Navigation from "./navigation";

export default function CreatorDashboardLayout({
  children
}) {
  return <Container className="mt-2 mb-2">
      <Grid container spacing={3}>
        <Grid item lg={3} xs={12} sx={{
        display: {
          xs: "none",
          sm: "none",
          md: "block"
        }
      }}>
          <Navigation />
        </Grid>

        <Grid item lg={9} xs={12}>
          {children}
        </Grid>
      </Grid>
    </Container>;
}