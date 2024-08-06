"use client";

import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container"; 

import Heading from "../shared/heading"; 

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "firebaseConfig";

import ProductCard from "components/product-card/"; 

export default function Section11() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Fetch all products from Firestore
        const querySnapshot = await getDocs(collection(db, "products"));
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
            };
        });

        console.log('All Products:', allProducts);
        // Filter products to include only those with imageUrls set and published is true
        const filteredProducts = allProducts.filter(
          product => product.images && product.images.length > 0 && product.published === true
        );
        console.log('Filtered Products:', filteredProducts);
        const selectedProducts = filteredProducts.slice(0, 6);
        console.log('Selected Products:', selectedProducts);

        setProducts(selectedProducts);
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