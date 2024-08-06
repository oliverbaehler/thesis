"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation"; 
import { doc, getDoc } from "firebase/firestore";
import { db } from "firebaseConfig"; // Adjust path as needed
import ProductForm from "../product-form";
import PageWrapper from "../../page-wrapper";

export default function EditProductPageView() {
  const router = useRouter();
  const { slug } = useParams();
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("productId", slug);
    if (slug) {
      const fetchProductData = async () => {
        try {
          const docRef = doc(db, "products", slug);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
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
