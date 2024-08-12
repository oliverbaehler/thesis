"use client";

import Box from "@mui/material/Box";
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { SectionCreator } from "components/section-header";
import { Render } from "components/editor";
import Typography from "@mui/material/Typography";

export default function CollectionDescription({ description }) {
  return (<Box width="100%">
    <SectionCreator icon={<MenuBookIcon color="primary" />} title="Bio">
      <Box mt={2}>
        {description ? (
            <Render description={description}></Render>
        ) : (
          <Typography variant="body1" color="textSecondary">
            This collection has no story
          </Typography>
        )}
      </Box>
      </SectionCreator>
    </Box>
  );
}