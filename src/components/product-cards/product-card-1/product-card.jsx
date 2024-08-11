"use client";

import Link from "next/link";
import Box from "@mui/material/Box";
import Image from 'next/image';
import Rating from "@mui/material/Rating"; 
// GLOBAL CUSTOM COMPONENTS

import LazyImage from "components/LazyImage";
import { Span } from "components/Typography";
import ProductViewDialog from "components/products-view/product-view-dialog"; 
import { FlexBox } from "components/flex-box";
import { H5, H3 } from "components/Typography";

import HoverActions from "./components/hover-actions";

import { ImageWrapper, ContentWrapper, StyledBazaarCard } from "./styles"; 
// ========================================================


// ========================================================
export default function ProductCard1({
  type,
  id,
  name,
  thumbnail,
  creatorName,
  creatorId
}) {

  const isFavorite = true;

  return <StyledBazaarCard>
      <ImageWrapper>

        <Link href={`/${type}/${id}`}>
        <LazyImage priority src={thumbnail} width={500} height={500} alt={name} />
        </Link>
      </ImageWrapper>

      <ContentWrapper>
        <Box flex="1 1 0" minWidth="0px" mr={1}>
          <H3>{name}</H3>
          <Box mt={1}>
            <Link href={`/creator/${creatorId}`} passHref>
              <FlexBox alignItems="center" sx={{ cursor: 'pointer', textDecoration: 'none' }}>
                <H5>{creatorName}</H5>
              </FlexBox>
            </Link>
          </Box>
        </Box>
      </ContentWrapper>
    </StyledBazaarCard>;
}