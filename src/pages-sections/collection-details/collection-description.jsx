"use client";

import Box from "@mui/material/Box";
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { SectionCreator } from "components/section-header";
import Typography from "@mui/material/Typography";

export default function CollectionDescription({ description }) {
  return (<Box width="100%">
    <SectionCreator icon={<MenuBookIcon color="primary" />} title="Bio">
      <Box mt={2}>
        {description ? (
          <Typography variant="body1" component="div">
            <div dangerouslySetInnerHTML={{ __html: description }}></div>
          </Typography>
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