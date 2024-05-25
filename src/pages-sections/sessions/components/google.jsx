import Image from "next/image"; 

import Button from "@mui/material/Button";

import { app } from "../../../firebase";
import { getAuth } from "firebase/auth";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

import googleLogo from "../../../../public/assets/images/icons/google-1.svg";

const handleGoogleSignIn = async () => {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
  
      //// Store user information in Firestore
      //const userRef = doc(db, 'users', user.uid);
      //await setDoc(userRef, {
      //  uid: user.uid,
      //  email: user.email,
      //  displayName: user.displayName,
      //  photoURL: user.photoURL,
      //}, { merge: true });

      console.log('Successfully signed in with Google:', user);
  
      //router.push('/discover');
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

const GoogleSignIn = () => {
    return (
      <Button 
        onClick={handleGoogleSignIn}
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