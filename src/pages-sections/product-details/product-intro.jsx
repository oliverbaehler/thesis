"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useAuth } from "contexts/SessionContext";
import Box from "@mui/material/Box";

import MenuBookIcon from '@mui/icons-material/MenuBook';

import ProductDescription from "./product-description";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

import LazyImage from "components/LazyImage";
import { H1, H2, H3, H6 } from "components/Typography";
import { FlexBox, FlexRowCenter } from "components/flex-box";  

import { db } from "firebaseConfig";
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove, collection } from "firebase/firestore";

// ================================================================
export default function ProductIntro({
  product,
  collection
}) {
  const {
    id,
    name,
    description,
    images,
    collectionId,
    collectionName,
    thumbnail,
    createdBy,
    createdByName,
    userLikes = []

  } = product || {};
  const { user } = useAuth();
  const allImages = [thumbnail, ...images].filter(Boolean);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const checkIfLiked = async () => {
      if (user) {
        const likeDocRef = doc(db, "products", id, "likes", user.uid);
        const likeDoc = await getDoc(likeDocRef);
        if (likeDoc.exists()) {
          setIsLiked(true);
        }
      }
    };
  
    checkIfLiked();
  }, [user, id]);
  
  const handleLikeToggle = async () => {
    const likeDocRef = doc(db, "products", id, "likes", user.uid);
    // Remove or add Like to subcollection
    if (isLiked) {
      await deleteDoc(likeDocRef);
    } else {
      // Like timestamp for sorting
      await setDoc(likeDocRef, {
        likedAt: new Date(),
      });
    }
  
    setIsLiked(!isLiked);
  };

  const handleImageClick = ind => () => setSelectedImage(ind); 

  return <Box width="100%">
  <Grid container spacing={3} justifyContent="space-around">
    {
    /* IMAGE GALLERY AREA */ }
    <Grid item md={6} xs={12} alignItems="center">
      <FlexBox borderRadius={3} overflow="hidden" justifyContent="center" mb={6}>
        <LazyImage alt={name} width={300} height={300} loading="eager" src={allImages[selectedImage]} sx={{
        objectFit: "contain"
      }} />
      </FlexBox>

      <FlexBox overflow="auto">
        {allImages.map((url, ind) => <FlexRowCenter key={ind} width={64} height={64} minWidth={64} bgcolor="white" border="1px solid" borderRadius="10px" ml={ind === 0 ? "auto" : 0} style={{
        cursor: "pointer"
      }} onClick={handleImageClick(ind)} mr={ind === allImages.length - 1 ? "auto" : "10px"} borderColor={selectedImage === ind ? "primary.main" : "grey.400"}>
            <Avatar alt="collection" src={url} variant="square" sx={{
          height: 40
        }} />
          </FlexRowCenter>)}
      </FlexBox>
    </Grid>

    <Grid item md={6} xs={12} alignItems="center">
      <FlexBox justifyContent="space-between" alignItems="center" mb={2}>
          <FlexBox alignItems="center" sx={{ cursor: 'pointer', textDecoration: 'none' }}>
            <H1>{name}</H1>
          </FlexBox>
        <Button
          onClick={handleLikeToggle}
          variant="contained"
          startIcon={isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          sx={{ marginLeft: "auto" }}
        >
          {isLiked ? "Liked" : "Like"}
        </Button>
      </FlexBox>

      <Link href={`/creator/${createdBy}`} passHref>
        <FlexBox alignItems="center" mb={1} sx={{ cursor: 'pointer', textDecoration: 'none' }}>
          <H6>Created by {createdByName}</H6>
        </FlexBox>
      </Link>

    {/* COLLECTION PREVIEW */}
    <Box mt={4}>
       <FlexBox alignItems="center" mb={1}>
          <MenuBookIcon color="primary" sx={{ mr: 1 }} />
         <H3>Collection</H3>
      </FlexBox>
      <FlexBox flexDirection="row" alignItems="center" mt={2}>
        <Avatar
          alt={collection.name}
          src={collection.thumnail}
          variant="square"
          sx={{ width: 80, height: 80, borderRadius: 2, mr: 2 }}
        />
        <Box>
          <H6>{collection.name}</H6>
          <Link href={`/collections/${collection.id}`} passHref>
            <Button variant="outlined" color="primary" sx={{ mt: 1 }}>
              View Collection
            </Button>
          </Link>
        </Box>
      </FlexBox>
    </Box>


      <Box mt={4} mb={2}>
        <FlexBox alignItems="center" mb={1}>
          <MenuBookIcon color="primary" sx={{ mr: 1 }} />
         <H3>Story</H3>
        </FlexBox>
        <ProductDescription description={product.description} />
      </Box>
    </Grid>
  </Grid>
</Box>;
}