"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Render } from "components/editor";

export default function ProductDescription({ description }) {
  return (
    <Box width="100%">
        {description ? (
          <Render description={description}></Render>
        ) : (
          <Typography variant="body1" color="textSecondary">
            This collection has no story
          </Typography>
        )}
    </Box>
  );
}