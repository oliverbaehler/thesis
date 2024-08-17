"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useAuth } from "contexts/SessionContext";
import Box from "@mui/material/Box";

import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button"; 
import MenuBookIcon from '@mui/icons-material/MenuBook';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CollectionDescription from "./collection-description";

import LazyImage from "components/LazyImage";
import { H1, H2, H3, H6 } from "components/Typography";
import { FlexBox, FlexRowCenter } from "components/flex-box";  

import { db } from "firebaseConfig";
import { doc, getDoc, setDoc, deleteDoc } from "firebase/firestore";


// ================================================================
export default function CollectionIntro({
  collection
}) {
  const {
    id,
    name,
    description,
    images,
    thumbnail,
    createdBy,
    creatorName,
  } = collection || {};

  const { user } = useAuth();
  const allImages = [thumbnail, ...images].filter(Boolean);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const checkIfLiked = async () => {
      if (user) {
        const likeDocRef = doc(db, "collections", id, "likes", user.uid);
        const likeDoc = await getDoc(likeDocRef);
        if (likeDoc.exists()) {
          setIsLiked(true);
        }
      }
    };
  
    checkIfLiked();
  }, [user, id]);
  
  const handleLikeToggle = async () => {
    const likeDocRef = doc(db, "collections", id, "likes", user.uid);

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
              <H6>Created by {creatorName}</H6>
            </FlexBox>
          </Link>

          <Box mt={4} mb={2}>
            <FlexBox alignItems="center" mb={1}>
              <MenuBookIcon color="primary" sx={{ mr: 1 }} />
              <H3>Story</H3>
            </FlexBox>
            <CollectionDescription description={collection.description} />
          </Box>
        </Grid>
      </Grid>
    </Box>;
}