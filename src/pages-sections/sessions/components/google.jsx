import Image from "next/image"; 
import Button from "@mui/material/Button";

import { useRouter, useSearchParams } from "next/navigation";
import { db } from "firebaseConfig";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

import googleLogo from "../../../../public/assets/images/icons/google-1.svg";

const GoogleSignIn = () => {
    const router = useRouter()
    const searchParams = useSearchParams();
    const redirectTo = searchParams.get('redirectTo'); 

    const handleGoogleSignIn = async (redirectTo) => {;
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
    
        // Store user information in Firestore
        const userRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userRef);
  
        if (!userDoc.exists()) {
          await setDoc(userRef, {
            uid: user.uid,
            email: user.email,
            photoURL: user.photoURL,
            displayName: user.displayName,
            role: 'creator',
          });
        } else {
          // If the user already exists, merge the basic info without overwriting creator_name
          await setDoc(userRef, {
            uid: user.uid,
            email: user.email,
            photoURL: user.photoURL,
          }, { merge: true });
        }
    
        console.log('Successfully signed in with Google:', user);
        
        // Redirect to the specified page
        router.push(redirectTo || '/dashboard');
    
      } catch (error) {
        console.error('Error signing in with Google:', error);
      }
    };

    return (
      <Button 
        onClick={() => handleGoogleSignIn(redirectTo)}
        fullWidth 
        size="large"
        className="googleButton" 
        sx={{fontSize: 12}}
        startIcon={<Image alt="google" src={googleLogo} />}
      >
        Continue with Google
      </Button>
    );
}

export default GoogleSignIn;