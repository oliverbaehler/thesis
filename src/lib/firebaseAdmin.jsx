import admin from 'firebase-admin';
import serviceAccount from './path/to/serviceAccountKey.json'; // Replace with the path to your service account key file

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://your-database-name.firebaseio.com" // Replace with your database URL if needed
  });
}

export const getFirebaseAdmin = () => admin;