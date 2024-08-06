"use client";

import Link from "next/link";
import { useState } from "react";
import Box from "@mui/material/Box";

import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button"; 
// MUI ICON COMPONENTS

import Add from "@mui/icons-material/Add";
import Remove from "@mui/icons-material/Remove"; 
// GLOBAL CUSTOM HOOK


import LazyImage from "components/LazyImage";
import { H1, H2, H3, H6 } from "components/Typography";
import { FlexBox, FlexRowCenter } from "components/flex-box";  

// ================================================================
export default function ProductIntro({
  product
}) {
  const {
    id,
    name,
    description,
    images,
    collectionId,
    collectionName,
    thumbnail
  } = product || {};
  const allImages = [thumbnail, ...images];
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectVariants, setSelectVariants] = useState({
    option: "option 1",
    type: "type 1"
  }); 

//  const handleChangeVariant = (variantName, value) => () => {
//    setSelectVariants(state => ({ ...state,
//      [variantName.toLowerCase()]: value
//    }));
//  }; 

  const handleImageClick = ind => () => setSelectedImage(ind); 

  return <Box width="100%">
      <Grid container spacing={3} justifyContent="space-around">
        {
        /* IMAGE GALLERY AREA */ }
        <Grid item md={6} xs={12} alignItems="center">
          <FlexBox borderRadius={3} overflow="hidden" justifyContent="center" mb={6}>
            <LazyImage alt={name} width={300} height={300} loading="eager" src={product.images[selectedImage]} sx={{
            objectFit: "contain"
          }} />
          </FlexBox>

          <FlexBox overflow="auto">
            {allImages.map((url, ind) => <FlexRowCenter key={ind} width={64} height={64} minWidth={64} bgcolor="white" border="1px solid" borderRadius="10px" ml={ind === 0 ? "auto" : 0} style={{
            cursor: "pointer"
          }} onClick={handleImageClick(ind)} mr={ind === allImages.length - 1 ? "auto" : "10px"} borderColor={selectedImage === ind ? "primary.main" : "grey.400"}>
                <Avatar alt="product" src={url} variant="square" sx={{
              height: 40
            }} />
              </FlexRowCenter>)}
          </FlexBox>
        </Grid>
        {
        /* PRODUCT INFO AREA */
      }
        <Grid item md={6} xs={12} alignItems="center">
          {
          /* PRODUCT NAME */
        }
          <H1 mb={1}>{name}</H1>

          {
          /* PRODUCT BRAND */
        }
          <FlexBox alignItems="center" mb={1}>
            <div>Brand: </div>
            <H6>Xiaomi</H6>
          </FlexBox>

          {
          /* PRODUCT RATING */
        }
          <FlexBox alignItems="center" gap={1} mb={2}>
            <Box lineHeight="1">Rated:</Box>
            <Rating color="warn" value={4} readOnly />
            <H6 lineHeight="1">(50)</H6>
          </FlexBox>

          {
          /* PRODUCT VARIANTS 
          {productVariants.map(variant => <Box key={variant.id} mb={2}>
              <H6 mb={1}>{variant.title}</H6>

              {variant.values.map(({
            id,
            value
          }) => <Chip key={id} label={value} onClick={handleChangeVariant(variant.title, value)} sx={{
            borderRadius: "4px",
            mr: 1,
            cursor: "pointer"
          }} color={selectVariants[variant.title.toLowerCase()] === value ? "primary" : "default"} />)}
            </Box>)}
*/
}
          {
          /* PRICE & STOCK */
        }
          <Box pt={1} mb={3}>
            <H2 color="primary.main" mb={0.5} lineHeight="1">
              Meow
            </H2>
            <Box color="inherit">Stock Available</Box>
          </Box>
          {
          /* SHOP NAME */
        }
          <FlexBox alignItems="center" gap={1} mb={2}>
            <div>Sold By:</div>
            <Link href="/shops/scarlett-beauty">
              <H6>Mobile Store</H6>
            </Link>
          </FlexBox>
        </Grid>
      </Grid>
    </Box>;
}