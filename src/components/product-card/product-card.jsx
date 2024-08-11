"use client";

import Link from "next/link";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating"; 

import Favorite from "@mui/icons-material/Favorite";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";


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
    thumbnail,
    creatorId,
    creatorName,
  } = product || {};

  return <Card>
      <CardMedia>
        <Link href={`/products/${id}`}>
          <LazyImage width={300} height={300} alt="category" className="product-img" src={thumbnail} />
        </Link>
      </CardMedia>

      <Box p={1} textAlign="center">
        <Paragraph fontWeight="bold">{name}</Paragraph>
        <Link href={`/creator/${creatorId}`}>
          <Paragraph>{creatorName}</Paragraph>
      </Link>
      </Box>
    </Card>;
}