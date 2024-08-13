"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation"; 
import { doc, getDoc } from "firebase/firestore";
import { db } from "firebaseConfig";
import { useAuth } from "contexts/SessionContext";

import CollectionForm from "../collection-form";
import PageWrapper from "../../page-wrapper";
export default function EditCollectionPageView() {
  const router = useRouter();
  const { slug } = useParams();
  const { user } = useAuth();
  const [collectionData, setCollectionData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      const fetchCollectionData = async () => {
        try {
          const docRef = doc(db, "collections", slug);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const collectionData = docSnap.data();

            if (collectionData.createdBy === user.uid) {
              setCollectionData(collectionData);
            } else {
              router.push("/dashboard/collections/create");
            }

            setCollectionData(docSnap.data());
          } else {
            console.error("No such collection!");
          }
        } catch (error) {
          console.error("Error fetching product:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchCollectionData();
    } else {
      router.push("/dashboard/collections/create");
    }
  }, [router, slug, user]);

  if (loading) {
    return <div>Loading...</div>; // Show a loading state while fetching data
  }



  return <PageWrapper title="Edit Collection">
      <CollectionForm initialData={collectionData} collectionId={slug} />
    </PageWrapper>;
}