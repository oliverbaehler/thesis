"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation"; 
import { doc, getDoc } from "firebase/firestore";
import { db } from "firebaseConfig";
import { useAuth } from "contexts/SessionContext";
import ProductForm from "../product-form";
import PageWrapper from "../../page-wrapper";

export default function EditProductPageView() {
  const router = useRouter();
  const { slug } = useParams();
  const { user } = useAuth();
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      const fetchProductData = async () => {
        try {
          const docRef = doc(db, "products", slug);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const productData = docSnap.data();

            if (productData.createdBy === user.uid) {
              setProductData(productData);
            } else {
              router.push("/dashboard/products/create");
            }

            setProductData(docSnap.data());
          } else {
            console.error("No such product!");
          }
        } catch (error) {
          console.error("Error fetching product:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchProductData();
    } else {
      router.push("/dashboard/products/create");
    }
  }, [slug]);

  if (loading) {
    return <div>Loading...</div>; // Show a loading state while fetching data
  }

  return (
    <PageWrapper title="Edit Product">
      <ProductForm initialData={productData} productId={slug} />
    </PageWrapper>
  );
}
