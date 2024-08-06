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

export default async function ProductDetails({
  params
}) {
  let product = "";
  let relatedProducts = [];
  const { slug } = params;


  try {

    console.log("HELLO");

    const { slug } = params;
    if (slug) {
      const docRef = adminDb.collection('products').doc(slug);
      const docSnapshot = await docRef.get();
      const allProducts = productsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  
      // Log all products (optional)
      console.log("All Products:", allProducts);


      console.log("docSnap", docRef);
      if (docSnap.exists()) {
        const productData = docSnap.data();
        product = {
          id: docSnap.id,
          name: productData.name,
          description: productData.content,
          images: productData.imageUrls,
          collectionId: productData.collectionId,
          collectionName: productData.collectionName,
        };
        
        const collectionId = product.collectionId;

        const productsCollectionRef = collection(db, "products");
        const relatedProductsQuery = query(productsCollectionRef, where("collectionId", "==", collectionId));
        const relatedProductsSnapshot = await getDocs(relatedProductsQuery);

        relatedProducts = relatedProductsSnapshot.docs.map(doc => ({
          id: doc.id,
          name: doc.data().name,
          description: doc.data().content,
          images: doc.data().imageUrls,
          collectionId: doc.data().collectionId,
          collectionName: doc.data().collectionName,
        }));
      } else {
        console.log("NO SLUG", slug);
        throw new Error("No slug provided");
      }
    } else {
      console.log("NO SLUG", slug);
      throw new Error("No slug provided");
    }

    return <ProductDetailsPageView product={product} relatedProducts={relatedProducts} />;
  } catch (error) {
    notFound();
  }
}