"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Container from "@mui/material/Container";
import { doc, collection, query, where, getDocs, getDoc } from "firebase/firestore";
import { db } from "firebaseConfig";
import CollectionIntro from "../collection-intro";
import ProductCarousel from "../related-products";

// ==============================================================
export default function CollectionDetailsPageView(props) {
  const [collect, setCollection] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const router = useRouter();
  const { slug } = useParams();

  useEffect(() => {
    const fetchCollectionData = async () => {
      try {
        const docRef = doc(db, "collections", slug);
        const docSnapshot = await getDoc(docRef);

        if (docSnapshot.exists()) {
          const collectionData = docSnapshot.data();
          setCollection({
            id: docSnapshot.id,
            name: collectionData.name,
            description: collectionData.content || "",
            images: collectionData.imageUrls || [],
            thumbnail: collectionData.thumbnail,
            createdBy: collectionData.createdBy,
            creatorName: collectionData.createdByName,
            userLikes: collectionData.userLikes || []
          });

          const relatedProductsRef = collection(db, "products");
          const relatedProductsQuery = query(
            relatedProductsRef,
            where("collectionId", "==", docSnapshot.id),
            where("published", "==", true)
          );
          const relatedProductsSnapshot = await getDocs(relatedProductsQuery);
          const relatedProductsData = relatedProductsSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setRelatedProducts(relatedProductsData);
        } else {
          router.push("/");
        }
      } catch (error) {
        router.push("/");
      }
    };

    if (slug) {
      fetchCollectionData();
    }
  }, [slug, router]);

  if (!collect) return <div>Loading...</div>;

  return <Container className="mt-2 mb-2">
      <CollectionIntro collection={collect} />
      <ProductCarousel products={relatedProducts} />
    </Container>;
}