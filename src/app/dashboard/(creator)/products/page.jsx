import { ProductsPageView } from "pages-sections/creator-backend/products/page-view"; 
import { getDocs, collection, query, where } from "firebase/firestore";
import { useAuth } from "contexts/SessionContext";
import { db } from "firebaseConfig"; 

export const metadata = {
  title: "Products - Bazaar Next.js E-commerce Template",
  description: `Bazaar is a React Next.js E-commerce template. Build SEO friendly Online store, delivery app and Multi vendor store`,
  authors: [{
    name: "UI-LIB",
    url: "https://ui-lib.com"
  }],
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"]
};

export default async function Products() {
  let products = [];
  try {
    const { user } = useAuth();

    const productRef = collection(db, "products");
    const q = query(productRef, where("createdBy", "==", user.uid));
    const productSnapshot = await getDocs(q);
    products = productSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    const querySnapshot = await getDocs(collection(db, "products"));
    products = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    console.log("FirstProducts:", products);
    console.log("User:", user);
  } catch (error) {
    console.error("Error fetching products from Firestore:", error);
  }

  return <ProductsPageView products={products} />;
}