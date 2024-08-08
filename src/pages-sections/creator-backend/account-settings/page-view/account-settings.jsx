"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "contexts/SessionContext";

import { db } from "firebaseConfig";
import {  doc, getDoc } from "firebase/firestore";

import AccountForm from "./account-form";
import PageWrapper from "../../page-wrapper";

export default function AccountSettingsPageView() {
  const [userData, setuserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
      const fetchUserData = async () => {
        try {
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setuserData(docSnap.data());
          } else {
            router.push("/dashboard");
          }
        } catch (error) {
          console.error("Error fetching user:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchUserData();
  }, [user, router]);

  if (loading) {
    return <div>Loading...</div>; // Show a loading state while fetching data
  }

  return (
    <PageWrapper title="Edit Account">
      <AccountForm initialData={userData} user={user} />
    </PageWrapper>
  );
}