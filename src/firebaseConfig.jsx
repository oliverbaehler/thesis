// Import the functions you need from the Firebase SDKs
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, connectAuthEmulator } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { getStorage } from "firebase/storage";

/**
 * Firebase configuration object for initializing Firebase in a web app.
 * For Firebase JS SDK v7.20.0 and later, the `measurementId` is optional.
 * Values are pulled from environment variables for security and flexibility.
 *
 * @constant
 * @type {Object}
 * @property {string} apiKey - Firebase API key (from the environment variable NEXT_PUBLIC_FIREBASE_API_KEY)
 * @property {string} authDomain - Firebase Auth domain (from the environment variable NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN)
 * @property {string} projectId - Firebase Project ID (from the environment variable NEXT_PUBLIC_FIREBASE_PROJECT_ID)
 * @property {string} storageBucket - Firebase storage bucket (from the environment variable NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET)
 * @property {string} messagingSenderId - Firebase messaging sender ID (from the environment variable NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID)
 * @property {string} appId - Firebase app ID (from the environment variable NEXT_PUBLIC_FIREBASE_APP_ID)
 */
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

/**
 * Initialize Firebase app only if there are no existing Firebase app instances.
 * 
 * @constant
 * @type {FirebaseApp}
 */
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

/**
 * Firebase Authentication instance for managing authentication-related operations.
 * 
 * @constant
 * @type {Auth}
 */
const auth = getAuth(app);

/**
 * Firestore database instance for interacting with the Firestore database.
 * 
 * @constant
 * @type {Firestore}
 */
const db = getFirestore(app);

/**
 * Firebase Storage instance for managing file storage operations.
 * 
 * @constant
 * @type {Storage}
 */
const storage = getStorage(app);

/**
 * If the Firebase Auth Emulator is enabled (via environment variable), connect to the emulator.
 */
if (process.env.NEXT_PUBLIC_FIREBASE_AUTH_EMULATOR_HOST) {
  const emulatorHost = process.env.NEXT_PUBLIC_FIREBASE_AUTH_EMULATOR_HOST;
  connectAuthEmulator(auth, `http://${emulatorHost}`);
}

// Export Firebase utilities and methods
export { app, db, auth, storage, signInWithPopup, doc, setDoc };
