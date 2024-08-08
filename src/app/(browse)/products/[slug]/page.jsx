
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
    const docRef = adminDb.collection('collections').doc(slug);
    const docSnapshot = await docRef.get();

    if (docSnapshot.exists && docSnapshot.data().published) {
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
  return <ProductDetailsPageView product={product} relatedProducts={relatedProducts} />;
}