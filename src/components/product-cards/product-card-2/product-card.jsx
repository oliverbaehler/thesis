"use client";

import Link from "next/link";
import { useState } from "react";
import Rating from "@mui/material/Rating";
import { Box } from "@mui/material"; 
import Grid from "@mui/material/Grid";
import { FlexBox } from "components/flex-box";
// LOCAL CUSTOM COMPONENTS

import ProductPrice from "./components/product-price";
import FavoriteButton from "./components/favorite-button"; 
// GLOBAL CUSTOM COMPONENTS

import HoverBox from "components/HoverBox";
import { H6, H1, H4 } from "components/Typography";
import LazyImage from "components/LazyImage";
import { FlexBetween } from "components/flex-box"; 
// ========================================================


// ========================================================
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
  return  <Grid item lg={4} md={6} sm={6} xs={12}>
           <Link href={`/${type}/${id}`}>
           <HoverBox
           >
            <LazyImage width={270} height={270} alt={title} src={imgUrl} />
           </HoverBox>
      </Link>

      <FlexBetween mt={2}>
        <div>
          <H4 mb={0.5} title={title} ellipsis>
            {title}
          </H4>

          <Link href={`/creators/${creatorId}`} passHref>
              <FlexBox alignItems="center" sx={{ cursor: 'pointer', textDecoration: 'none' }}>
                <H6>{creatorName}</H6>
              </FlexBox>
          </Link>
        </div>
      </FlexBetween>
      </Grid>;
}