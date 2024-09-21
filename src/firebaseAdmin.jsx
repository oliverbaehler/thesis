import admin from 'firebase-admin';

// Uncomment the line below if you are using a Firestore emulator locally.
// process.env['FIRESTORE_EMULATOR_HOST'] = 'localhost:8080';

/**
 * Initializes the Firebase Admin SDK with application default credentials and environment variables
 * for the project ID and storage bucket. This ensures the Admin SDK is initialized only once in a
 * server environment.
 *
 * The Firebase Admin SDK provides access to Firebase services like Authentication, Firestore, and Storage.
 */
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  });
}

/**
 * Admin Auth instance for handling authentication operations via Firebase Admin SDK.
 * 
 * @constant
 */
const adminAuth = admin.auth();

/**
 * Admin Firestore instance for interacting with the Firestore database via Firebase Admin SDK.
 * 
 * @constant
 */
const adminDb = admin.firestore();

/**
 * Admin Storage instance for interacting with Firebase Storage via Firebase Admin SDK.
 * 
 * @constant
 */
const adminStorage = admin.storage();

export { admin, adminAuth, adminDb, adminStorage };
