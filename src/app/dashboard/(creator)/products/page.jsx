"use client";

import { ProductsPageView } from "pages-sections/creator-backend/products/page-view"; 
import { getDocs, collection, query, where } from "firebase/firestore";
import { useAuth } from "contexts/SessionContext";
import { db } from "firebaseConfig"; 

export default async function Products() {
  const { user } = useAuth();
  let products = [];
  try {
    const productRef = collection(db, "products");
    const q = query(productRef, where("createdBy", "==", user.uid));
    const productSnapshot = await getDocs(q);
    products = productSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    const querySnapshot = await getDocs(collection(db, "products"));
    products = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    console.log("FirstProducts:", products);
    console.log("User:", user);
  } catch (error) {
    console.error("Error fetching products from Firestore:", error);
  }

  return <ProductsPageView products={products} />;
}