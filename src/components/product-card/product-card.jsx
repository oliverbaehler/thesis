"use client";

import Link from "next/link";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating"; 

import Favorite from "@mui/icons-material/Favorite";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";

import useProduct from "./use-product"; 

import LazyImage from "components/LazyImage";
import { FlexRowCenter } from "components/flex-box";
import { H4, Paragraph, Small } from "components/Typography";
import ProductViewDialog from "components/products-view/product-view-dialog"; 

import { Card, CardMedia, FavoriteButton, QuickViewButton } from "./styles"; 

// ==============================================================
export default function ProductCard({
  product
}) {
  const {
    id,
    collectionId,
    collectionName,
    description,
    name,
    images,
  } = product || {};
  const {
    isFavorite,
    openModal,
    toggleDialog,
    toggleFavorite
  } = useProduct(id);

  const thumbnail = images && images.length > 0 ? images[0] : "/placeholder.png";

  return <Card>
      <CardMedia>
        <Link href={`/products/${id}`}>
          <LazyImage width={300} height={300} alt="category" className="product-img" src={thumbnail} />
        </Link>

        {
        /* PRODUCT FAVORITE BUTTON */
      }
        <FavoriteButton className="product-actions" onClick={toggleFavorite}>
          {isFavorite ? <Favorite className="icon" fontSize="small" color="primary" /> : <FavoriteBorder className="icon" fontSize="small" />}
        </FavoriteButton>

        {
        /* PRODUCT QUICK VIEW BUTTON */
      }
        <Box mx={1} position="relative">
          <QuickViewButton fullWidth size="large" color="dark" variant="contained" className="product-view-action" onClick={toggleDialog}>
            Quick View
          </QuickViewButton>
        </Box>
      </CardMedia>

      {
      /* PRODUCT VIEW DIALOG BOX */
    }
      <ProductViewDialog openDialog={openModal} handleCloseDialog={toggleDialog} product={{
      id,
      name,
      images
    }} />

      <Box p={1} textAlign="center">
        {
        /* PRODUCT TITLE / NAME */
      }
        <Paragraph fontWeight="bold">{name}</Paragraph>
      </Box>
    </Card>;
}