"use client";

import Box from "@mui/material/Box";
import { Render } from "components/editor";
import Typography from "@mui/material/Typography";

export default function CollectionDescription({ description }) {
  return (<Box width="100%">
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