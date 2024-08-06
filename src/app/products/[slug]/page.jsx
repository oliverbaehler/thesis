import { useParams, notFound } from "next/navigation"; 
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";
import { db } from "firebaseConfig";
import { adminDb } from 'firebaseAdmin';

import { ProductDetailsPageView } from "pages-sections/product-details/page-view"; 

export const metadata = {
  title: "Product Details - Bazaar Next.js E-commerce Template",
  description: `Bazaar is a React Next.js E-commerce template. Build SEO friendly Online store, delivery app and Multi vendor store`,
  authors: [{
    name: "UI-LIB",
    url: "https://ui-lib.com"
  }],
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"]
};


export async function fetchProductAndRelated(slug) {
  if (!slug) {
    notFound(); // Throw a 404 if no slug is provided
  }

  try {
    const docRef = adminDb.collection('products').doc(slug);
    const docSnapshot = await docRef.get();

    if (docSnapshot.exists) {
      const productData = docSnapshot.data();
      const product = {
        id: docSnapshot.id,
        name: productData.name,
        description: productData.content,
        images: productData.imageUrls,
        collectionId: productData.collectionId,
        collectionName: productData.collectionName,
        thumbnail: productData.thumbnail
      };

      // Fetch related products
      const relatedProductsSnapshot = await adminDb.collection('products')
        .where("collectionId", "==", product.collectionId)
        .get();

      const relatedProducts = relatedProductsSnapshot.docs.map(doc => ({
        id: doc.id,
        name: doc.data().name,
        description: doc.data().content,
        images: doc.data().imageUrls,
        collectionId: doc.data().collectionId,
        collectionName: doc.data().collectionName,
        thumbnail: doc.data().thumbnail
      }));

      return { product, relatedProducts };
    } else {
      notFound(); // Throw a 404 if no document is found
    }
  } catch (error) {
    console.error("Error fetching products:", error);
    notFound(); // Throw a 404 in case of an error
  }
}

// Example usage in a React server component
export default async function ProductDetails({ params }) {
  const { slug } = params;

  const { product, relatedProducts } = await fetchProductAndRelated(slug);

  console.log('Product:', product);

  return <ProductDetailsPageView product={product} relatedProducts={relatedProducts} />;
}