"use client";

import HoverBox from "components/HoverBox";
import Link from "next/link";
import { useState } from "react";
import { Box, Grid } from "@mui/material"; 
import { FlexBox } from "components/flex-box";
// LOCAL CUSTOM COMPONENTS

import { H4, H6 } from "components/Typography";
import LazyImage from "components/LazyImage";
import { FlexBetween } from "components/flex-box"; 

export default function ProductCard2({
  id,
  title,
  imgUrl,
  type,
  creatorName,
  creatorId,
  off = 20,
  hideReview,
  hideFavoriteIcon
}) {
  const [favorite, setFavorite] = useState(false);

  return (
    <Grid item lg={4} md={6} sm={6} xs={12}>
      <Link href={`/${type}/${id}`}>
        <HoverBox
          sx={{
            width: "100%", // Ensures the box takes up full width
            maxWidth: "270px", // Controls the max width
            height: "270px", // Fixed height
            overflow: "hidden", // Ensures content doesn't overflow
            margin: "0 auto" // Centers the box
          }}
        >
          <LazyImage
            src={imgUrl}
            alt={title}
            width={100}
            height={100}
          />
        </HoverBox>
      </Link>

      <FlexBetween mt={2}>
        <Box>
          <H4 mb={0.5} title={title} ellipsis>
            {title}
          </H4>

          <Link href={`/creators/${creatorId}`} passHref>
            <FlexBox alignItems="center" sx={{ cursor: 'pointer', textDecoration: 'none' }}>
              <H6>{creatorName}</H6>
            </FlexBox>
          </Link>
        </Box>
      </FlexBetween>
    </Grid>
  );
}
