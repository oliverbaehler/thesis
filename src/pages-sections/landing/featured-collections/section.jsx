"use client";

import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container"; 
// STYLED COMPONENTS

import { useEffect, useState } from "react";
import { collection, getDocs, query, where, orderBy, limit  } from "firebase/firestore";
import { db } from "firebaseConfig";
import { useAuth } from "contexts/SessionContext";


import Heading from "../shared/heading"; 

import Card1 from "./components/card-1";
import Card2 from "./components/card-2";
import Card3 from "./components/card-3";
import Card4 from "./components/card-4";
import Card5 from "./components/card-5";
import Card6 from "./components/card-6";


export default function Section1() {
  const [collections, setCollections] = useState([]);
  useEffect(() => {
    const fetchcollections = async () => {
      try {
        const collectionsRef = collection(db, "collections");
        const q = query(
          collectionsRef,
          where("published", "==", true),
          limit(6)
        );
        const querySnapshot = await getDocs(q);

        const allcollections = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
              id: doc.id,
              name: data.name,
              images: data.imageUrls,
              published: data.published,
              thumbnail: data.thumbnail,
              createdBy: data.createdBy,
              createdByName: data.createdByName,
            };
        });

        setCollections(allcollections);
      } catch (error) {
        console.error("Error fetching collections from Firestore:", error);
      }
    };

    fetchcollections();
  }, []);

  return <Container>
      <Heading title="Trending Collections" />
      <Grid container spacing={3}>
        {collections[0] && (
          <Grid item md={6} xs={12}>
            <Card1 color="#FFA954" product={collections[0]} />
           </Grid>
        )}
        {collections[1] && (
          <Grid item md={6} xs={12}>
            <Card1 color="#FFA954" product={collections[1]} />
           </Grid>
        )}
        {collections[2] && (
          <Grid item md={6} xs={12}>
            <Card1 color="#FFA954" product={collections[2]} />
           </Grid>
        )}
        {collections[3] && (
          <Grid item md={6} xs={12}>
            <Card1 color="#FFA954" product={collections[3]} />
           </Grid>
        )}
      </Grid>
    </Container>;
}