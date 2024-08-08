
import { notFound } from "next/navigation"; 

import { adminDb } from 'firebaseAdmin';
import { CollectionDetailsPageView } from "pages-sections/collection-details/page-view"; 
export const metadata = {
  title: "Collection Details",
};

export async function fetchProductAndRelated(slug) {
  if (!slug) {
    notFound(); 
  }

  try {
    const docRef = adminDb.collection('collections').doc(slug);
    const docSnapshot = await docRef.get();

    if (docSnapshot.exists && docSnapshot.data().published) {
      const collectionData = docSnapshot.data();
      const collection = {
        id: docSnapshot.id,
        name: collectionData.name,
        description: collectionData.content,
        images: collectionData.imageUrls || [],
        thumbnail: collectionData.thumbnail,
        createdBy: collectionData.createdBy,
        creatorName: collectionData.createdByName,
      };

      const relatedProductsSnapshot = await adminDb.collection('products')
        .where("collectionId", "==", collection.id)
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

      return { collection, relatedProducts };
    } else {
      notFound(); // Throw a 404 if no document is found
    }
  } catch (error) {
    console.error("Error fetching collections:", error);
    notFound(); // Throw a 404 in case of an error
  }
}

// Example usage in a React server component
export default async function ProductDetails({ params }) {
  const { slug } = params;

  const { collection, relatedProducts } = await fetchProductAndRelated(slug);
  return <CollectionDetailsPageView collection={collection} relatedProducts={relatedProducts} />;
}