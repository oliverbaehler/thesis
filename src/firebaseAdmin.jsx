import admin from 'firebase-admin';

process.env['FIRESTORE_EMULATOR_HOST'] = 'localhost:8080';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  });
}

const adminAuth = admin.auth();
const adminDb = admin.firestore();
const adminStorage = admin.storage();

export { admin, adminAuth, adminDb, adminStorage };