"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useAuth } from "contexts/SessionContext";
import Box from "@mui/material/Box";

import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button"; 
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';


import ProductDescription from "./product-description";
import LazyImage from "components/LazyImage";
import { H1, H2, H3, H6 } from "components/Typography";
import { FlexBox, FlexRowCenter } from "components/flex-box";  

import { db } from "firebaseConfig";
import { doc, getDoc, setDoc, deleteDoc } from "firebase/firestore";

// ================================================================
export default function collectionIntro({
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

  // Fetch if the user has liked the collection
  useEffect(() => {
    const fetchLikeStatus = async () => {
      const likeDocRef = doc(db, "likes", `${user.uid}_${id}`);
      const likeDoc = await getDoc(likeDocRef);
      setIsLiked(likeDoc.exists());
    };

    if (user && id) {
      fetchLikeStatus();
    }
  }, [user, id]);

  const handleLikeToggle = async () => {
    const likeDocRef = doc(db, "likes", `${user.uid}_${id}`);

    if (isLiked) {
      // Remove the like
      await deleteDoc(likeDocRef);
    } else {
      // Add the like
      await setDoc(likeDocRef, { userId: user.uid, collectionId: id });
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
        {
        /* collection INFO AREA */
      }
        <Grid item md={6} xs={12} alignItems="center">
          {
          /* collection NAME */
        }
          <H1 mb={1}>{name}</H1>

          {
          /* collection BRAND */
        }
          <Link href={`/profile/${createdBy}`} passHref>
            <FlexBox alignItems="center" mb={1} sx={{ cursor: 'pointer', textDecoration: 'none' }}>
              <Avatar
                alt={creatorName}
                src={`/storage/${createdBy}/profile.png`}
                sx={{ width: 32, height: 32, mr: 1 }}
              />
              <H6>{creatorName}</H6>
            </FlexBox>
          </Link>

          <FlexBox alignItems="center" gap={1} mb={2}>
            <Button
              onClick={handleLikeToggle}
            >
              {isLiked ? <FavoriteIcon text="Like"/> : <FavoriteBorderIcon />}
            </Button>

          </FlexBox>

          <FlexBox alignItems="center" gap={1} mb={2}>
            <ProductDescription description={collection.description}/>
          </FlexBox>
        </Grid>
      </Grid>
    </Box>;
}