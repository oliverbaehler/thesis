import { adminAuth } from '../src/firebaseAdmin';
import { doc, setDoc } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { db, auth } from '../src/firebaseConfig';
import { signInWithCustomToken} from 'firebase/auth';


// Function to create a Google test user and replicate onboarding process
export const createGoogleTestUser = async () => {
  try {
    // Generate a random UID for the user
    const uid = uuidv4();
    const email = `${uid}@example.com`;
    const displayName = `Google Test User`;
    const photoURL = 'https://example.com/avatar.png';

    // Step 1: Create a new user in Firebase with Google provider
    await adminAuth.createUser({
      uid,
      email,
      displayName,
      photoURL,
      providerData: [{
        providerId: 'google.com',
        uid: `${uid}`,  // Simulate Google UID
        email,
        displayName,
        photoURL,
      }],
    });

    console.log('Google test user created:', email);

    const customToken = await adminAuth.createCustomToken(uid);

    console.log('Custom token generated for Google test user:', customToken);

    // Step 3: Sign in the user using Firebase Client SDK with custom token
    await signInWithCustomToken(auth, customToken);
    const user = auth.currentUser;
    if (!user) throw new Error('User sign-in failed');
    console.log(user)

    // Step 2: Add user to Firestore (replicating your onboarding flow)
    const userRef = doc(db, "users", uid);
    await setDoc(userRef, {
      uid,
      email,
      displayName,
      photoURL,
      role: 'creator',  // As per your onboarding logic
    });

    console.log('Google test user added to Firestore:', uid);

    return { uid, email, displayName, photoURL };
  } catch (error) {
    console.error('Error creating Google test user:', error);
    throw error;
  }
};


// Function to create a test user 
export const createTestUser = async () => {
  try {
    // Generate random UID, display name, and password
    const uid = uuidv4();
    const displayName = `User-${uid.slice(0, 5)}`;
    const password = `pass-${uuidv4().slice(0, 8)}`;
    const email = `${uid}@example.com`

    // Create a new user in Firebase
    const user = await adminAuth.createUser({
      uid,
      email: email,
      password,
      displayName,
      role : 'creator',
      photoURL: 'https://example.com/avatar.png',
    });

    console.log('Random user created:', user.email);

    // Generate a custom token for the created user
    const customToken = await adminAuth.createCustomToken(user.uid);

    // Return the user details and the custom token
    return {
      uid,
      email,
      displayName,
      password,
    };
  } catch (error) {
    console.error('Error creating random user:', error);
    throw error;
  }
};

// Clean up users after tests
export const deleteTestUser = async (uid = 'test-user-123') => {
  try {
    await adminAuth.deleteUser(uid);
    console.log('Test user deleted');
  } catch (error) {
    console.error('Error deleting test user:', error);
  }
};