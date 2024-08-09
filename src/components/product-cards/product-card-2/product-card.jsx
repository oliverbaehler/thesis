"use client";

import Link from "next/link";
import { useState } from "react";
import Rating from "@mui/material/Rating";
import { Box } from "@mui/material"; 
import Grid from "@mui/material/Grid";
// LOCAL CUSTOM COMPONENTS

import ProductPrice from "./components/product-price";
import FavoriteButton from "./components/favorite-button"; 
// GLOBAL CUSTOM COMPONENTS

import HoverBox from "components/HoverBox";
import { H6 } from "components/Typography";
import LazyImage from "components/LazyImage";
import { FlexBetween } from "components/flex-box"; 
// ========================================================


// ========================================================
export default function ProductCard2({
  id,
  title,
  imgUrl,
  type,
  off = 20,
  hideReview,
  hideFavoriteIcon
}) {
  const [favorite, setFavorite] = useState(false);
  return  <Grid item lg={4} md={6} sm={6} xs={12}>
           <Link href={`/${type}/${id}`}>
           <HoverBox
             sx={{
               width: 270, // Set a fixed width
               height: 270, // Set a fixed height
               overflow: "hidden",
               borderRadius: 2,
               display: "flex",
               justifyContent: "center",
               alignItems: "center",
               backgroundColor: "#f0f0f0", // Optional: background color when image is smaller
               "&:hover": {
                 // Optional: Add hover effect here
                 boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
               },
             }}
           >
            <LazyImage width={270} height={270} alt={title} src={imgUrl} />
           </HoverBox>
      </Link>

      <FlexBetween mt={2}>
        <div>
          <H6 mb={0.5} title={title} ellipsis>
            {title}
          </H6>
        </div>
      </FlexBetween>
      </Grid>;
}