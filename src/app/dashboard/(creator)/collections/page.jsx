import {CollectionsPageView} from "pages-sections/creator-backend/collections/page-view";
import { useAuth } from "contexts/SessionContext";

export const metadata = {
  title: "Brands - Bazaar Next.js E-commerce Template",
  description: `Bazaar is a React Next.js E-commerce template. Build SEO friendly Online store, delivery app and Multi vendor store`,
  authors: [{
    name: "UI-LIB",
    url: "https://ui-lib.com"
  }],
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"]
};
export default async function Collections() {
  let collections = [];
  try {
    const { user } = useAuth();

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