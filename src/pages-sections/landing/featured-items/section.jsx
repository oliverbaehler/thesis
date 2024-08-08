"use client";

import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container"; 

import Heading from "../shared/heading"; 

import { useEffect, useState } from "react";
import { collection, getDocs, query, where, orderBy, limit  } from "firebase/firestore";
import { db } from "firebaseConfig";
import { useAuth } from "contexts/SessionContext";

import ProductCard from "components/product-card/"; 

export default function Section11() {
  const [products, setProducts] = useState([]);
  const { user } = useAuth(); 

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Fetch all products from Firestore
        const productsRef = collection(db, "products");
        const q = query(
          productsRef,
          where("published", "==", true),
          limit(6)
        );
        const querySnapshot = await getDocs(q);

        const allProducts = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
              id: doc.id,
              collectionId: data.collectionId,
              collectionName: data.collectionName,
              description: data.content,
              name: data.name,
              images: data.imageUrls,
              published: data.published,
              thumbnail: data.thumbnail
            };
        });

        setProducts(allProducts);
      } catch (error) {
        console.error("Error fetching products from Firestore:", error);
      }
    };

    fetchProducts();
  }, []);


  return <Container className="mt-4">
      <Heading title="Featured Items" />

      <Grid container spacing={3}>
        {products.map(product => <Grid item md={3} sm={6} xs={12} key={product.id}>
            <ProductCard product={product} />
          </Grid>)}
      </Grid>
    </Container>;
}