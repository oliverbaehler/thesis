"use client";

import { Fragment, useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Favorite from "@mui/icons-material/Favorite"; 
import { motion } from "framer-motion";
import Typography from "@mui/material/Typography";

import { useAuth } from "contexts/SessionContext";
import { collection, query, where, getDoc, getDocs, doc } from "firebase/firestore";
import { db } from "firebaseConfig";


import ProductCard1 from "components/product-cards/product-card-1"; 

export default function WishListPageView(props) {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchLikedItems = async () => {
      try {
        const likedCollections = [];
        const likedProducts = [];
    
        // Fetch all collections
        const collectionsQuery = query(
          collection(db, "collections"),
          where("published", "==", true)
        );
        const collectionsSnapshot = await getDocs(collectionsQuery);
    
        for (const docSnapshot of collectionsSnapshot.docs) {
          const likeDocRef = doc(db, `collections/${docSnapshot.id}/likes`, user.uid);
          const likeDocSnapshot = await getDoc(likeDocRef);
          if (likeDocSnapshot.exists()) {
            likedCollections.push({
              id: docSnapshot.id,
              type: "collections",
              ...docSnapshot.data(),
            });
          }
        }
    
        // Fetch all products
        const productsQuery = query(
          collection(db, "products"),
          where("published", "==", true)
        );
        const productsSnapshot = await getDocs(productsQuery);
    
        for (const docSnapshot of productsSnapshot.docs) {
          const likeDocRef = doc(db, `products/${docSnapshot.id}/likes`, user.uid);
          const likeDocSnapshot = await getDoc(likeDocRef);
          if (likeDocSnapshot.exists()) {
            likedProducts.push({
              id: docSnapshot.id,
              type: "products",
              ...docSnapshot.data(),
            });
          }
        }
    
        const combinedItems = [...likedCollections, ...likedProducts];
        setProducts(combinedItems);
      } catch (error) {
        console.error("Error fetching liked items:", error);
      }
    };

    fetchLikedItems();
  }, [user]);

  return (
    <Fragment>
      {/* Animated Greeting */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h4" style={{ marginTop: "50px" }}>
          Hello, {user.displayName}! You have liked recently:
        </Typography>
      </motion.div>

      {/* Products Grid */}
      {products.length === 0 ? (
        <Typography variant="h6" color="textSecondary" style={{ marginTop: "20px" }}>You have not liked anything yet</Typography> ) : (
        <Grid container spacing={3} style={{ marginTop: "20px" }}>
          {products.map(item => (
            <Grid item lg={4} sm={6} xs={12} key={item.id}>
              <ProductCard1 
                type={item.type} 
                id={item.id} 
                name={item.name} 
                thumbnail={item.thumbnail}
                creatorName={item.createdByName}
                creatorId={item.createdBy}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Fragment>
  );
}