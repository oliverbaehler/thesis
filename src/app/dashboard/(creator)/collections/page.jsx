"use client";

import {CollectionsPageView} from "pages-sections/creator-backend/collections/page-view";
import { useAuth } from "contexts/SessionContext";

export default async function Collections() {
  const { user } = useAuth();
  let collections = [];

  try {
    const productRef = collection(db, "collections");
    const q = query(productRef, where("createdBy", "==", user.uid));
    const productSnapshot = await getDocs(q);
    products = productSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    const querySnapshot = await getDocs(collection(db, "collections"));
    products = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error fetching collections from Firestore:", error);
  }


  return <CollectionsPageView collections={collections} />;
}