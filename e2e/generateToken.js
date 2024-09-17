// generateToken.js
const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(), // Ensure you have the proper credentials
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID, // Set project ID
  });
}

// Function to create a custom token
async function createCustomToken(uid) {
  try {
    const customToken = await admin.auth().createCustomToken(uid);
    console.log(`Custom token for user ${uid}: ${customToken}`);
    return customToken;
  } catch (error) {
    console.error('Error creating custom token:', error);
    throw error;
  }
}

// Generate a custom token for a test user
createCustomToken('test-user-123');