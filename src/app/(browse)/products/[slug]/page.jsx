
import { notFound } from "next/navigation"; 
import { adminDb } from 'firebaseAdmin';
import { ProductDetailsPageView } from "pages-sections/product-details/page-view"; 
export const metadata = {
  title: "Product Details",
};


export async function fetchProductAndRelated(slug) {
  if (!slug) {
    notFound(); // Throw a 404 if no slug is provided
  }

  try {
    const docRef = adminDb.collection('products').doc(slug);
    const docSnapshot = await docRef.get();

    if (docSnapshot.exists && docSnapshot.data().published) {
      const productData = docSnapshot.data();
      const product = {
        id: docSnapshot.id,
        name: productData.name,
        description: productData.content,
        images: productData.imageUrls,
        thumbnail: productData.thumbnail,
        createdBy: productData.createdBy,
        creatorName: productData.createdByName,
        userLikes: productData.userLikes || []
      };

      const docCollectionRef = adminDb.collection('collections').doc(productData.collectionId);
      const docCollectionSnapshot = await docCollectionRef.get();

      if (docCollectionSnapshot.exists) {
        const collectionData = docCollectionSnapshot.data();
        const collection = {
          id: docCollectionSnapshot.id,
          name: collectionData.name,
          thumbnail: collectionData.thumbnail,
        };

        return { product, collection };
      }
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

  const { product, collection } = await fetchProductAndRelated(slug);
  console.log("Collection", collection)
  return <ProductDetailsPageView product={product} collection={collection} />;
}