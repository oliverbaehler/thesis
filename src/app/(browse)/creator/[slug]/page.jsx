
import { notFound } from "next/navigation"; 

import { adminDb } from 'firebaseAdmin';
import { CreatorDetailsPageView } from "pages-sections/creator-details/page-view"; 
export const metadata = {
  title: "Creator Details",
};

export async function fetchProductAndRelated(slug) {
  if (!slug) {
    notFound(); 
  }

  try {
    const userDocRef = adminDb.collection('users').doc(slug);
    const userSnapshot = await userDocRef.get();

    if (!userSnapshot.exists) {
      notFound();
    }
    const user = userSnapshot.data();

    console.log(user)

    const querySnapshot = await adminDb.collection('collections')
      .where("createdBy", "==", user.uid)
      .where("published", "==", true)
      .get();

    const collections = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return { user, collections };
  } catch (error) {
    console.error("Error fetching collections:", error);
    notFound();
  }
}

export default async function CreatorDetails({ params }) {
  const { slug } = params;

  const { user, collections } = await fetchProductAndRelated(slug);
  return <CreatorDetailsPageView user={user} collections={collections} />;
}