"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Container from "@mui/material/Container";
import { doc, collection, query, where, getDocs, getDoc } from "firebase/firestore";
import { db } from "firebaseConfig";
import { notFound } from "next/navigation"; 

import ProductIntro from "../creator-intro";
import CollectionsCarousel from "../collections";
import CreatorDescription from "../creator-description";

// ==============================================================
export default function CreatorDetailsPageView(props) {
  const [creator, setCreator] = useState(null);
  const [collections, setCollections] = useState([]);
  const router = useRouter();
  const { slug } = useParams();

  useEffect(() => {
    const fetchCollectionData = async () => {
      try {
        const docRef = doc(db, "users", slug);
        const docSnapshot = await getDoc(docRef);

        if (docSnapshot.exists()) {
          setCreator(docSnapshot.data());
          const creatorData = docSnapshot.data();
          setCreator({
            ...creatorData,
            id: docSnapshot.id,
            description: creatorData.content || "",
          })


          const relatedProductsRef = collection(db, "collections");
          const relatedProductsQuery = query(
            relatedProductsRef,
            where("createdBy", "==", docSnapshot.id),
            where("published", "==", true)
          );
          const relatedProductsSnapshot = await getDocs(relatedProductsQuery);
          const relatedProductsData = relatedProductsSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setCollections(relatedProductsData);
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

  if (!creator) return <div>Loading...</div>;

  return <Container className="mt-2 mb-2">
      <ProductIntro user={creator} />
      <CreatorDescription description={creator.description} />
      <CollectionsCarousel collections={collections} />
    </Container>;
}