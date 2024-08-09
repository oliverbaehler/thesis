"use client";

import Link from "next/link";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating"; 
// GLOBAL CUSTOM COMPONENTS

import LazyImage from "components/LazyImage";
import { Span } from "components/Typography";
import ProductViewDialog from "components/products-view/product-view-dialog"; 
// LOCAL CUSTOM HOOK

import useProduct from "../use-product"; 
// LOCAL CUSTOM COMPONENTS

import HoverActions from "./components/hover-actions";
import ProductPrice from "../product-price";
import ProductTitle from "../product-title";
import DiscountChip from "../discount-chip";
import QuantityButtons from "./components/quantity-buttons"; 
// STYLED COMPONENTS

import { ImageWrapper, ContentWrapper, StyledBazaarCard } from "./styles"; 
// ========================================================


// ========================================================
export default function ProductCard1({
  type,
  id,
  name,
  thumbnail,
}) {

  const isFavorite = true;

  return <StyledBazaarCard>
      <ImageWrapper>
        {
        /* HOVER ACTION ICONS */
      }
        <HoverActions isFavorite={isFavorite} />

        {
        /* PRODUCT IMAGE / THUMBNAIL */
      }
        <Link href={`/${type}/${id}`}>
          <LazyImage priority src={thumbnail} width={500} height={500} alt={name} />
        </Link>
      </ImageWrapper>

      <ContentWrapper>
        <Box flex="1 1 0" minWidth="0px" mr={1}>

          <ProductTitle title={name} slug={id} />

        </Box>
      </ContentWrapper>
    </StyledBazaarCard>;
}