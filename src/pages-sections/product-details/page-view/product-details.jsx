"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Container from "@mui/material/Container";
import { doc, collection, query, where, getDocs, getDoc } from "firebase/firestore";
import { db } from "firebaseConfig"; 

import ProductDescription from "../product-description";
import ProductIntro from "../product-intro";

// ==============================================================
export default function ProductDetailsPageView() {
  const [collect, setCollection] = useState("");
  const [product, setProduct] = useState("");
  const router = useRouter();
  const { slug } = useParams();

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const docRef = doc(db, "products", slug);
        const docSnapshot = await getDoc(docRef);
        if (docSnapshot.exists()) {
          const productData = docSnapshot.data();
          setProduct({
            ...productData,
            id: docSnapshot.id,
            description: productData.content || "",
            images: productData.imageUrls || [],
          })

          const docRefCollect = doc(db, "collections", productData.collectionId);
          const docSnapshotCollect = await getDoc(docRefCollect);
          const collectData = docSnapshotCollect.data();
          setCollection({
            ...collectData,
            id: docSnapshotCollect.id,
            name: collectData.name,
            thumbnail: collectData.thumbnail,
          })

        } else {
          router.push("/");
        }
      } catch (error) {
        router.push("/");
      }
    };

    if (slug) {
      fetchProductData();
    }
  }, [slug, router]);
  if (!product) return <div>Loading...</div>;

  console.log("Product 1", product)

  return <Container className="mt-2 mb-2">
      <ProductIntro product={product} collection={collect}/>
      <ProductDescription description={product.description}/>
    </Container>;
}