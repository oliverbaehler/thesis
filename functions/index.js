/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.firestore();

// const {onRequest} = require("firebase-functions/v2/https");
// const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });


// Updates the CreatorName in all collections and products
exports.updateItemsOnUserChange = functions.firestore
  .document('users/{userId}')
  .onUpdate(async (change, context) => {
    const beforeData = change.before.data();
    const afterData = change.after.data();
    const userId = context.params.userId;

    if (beforeData.creator_name === afterData.creator_name) {
      console.log('creator_name did not change');
      return null;
    }

    const newCreatorName = afterData.creator_name;

    // Update Collections
    const collectionsRef = db.collection('collections');
    const collectionSnap = await collectionsRef.where('createdBy', '==', userId).get();

    // We can exit here, because if a user does not have any collections, they can not have any products
    if (collectionSnap.empty) {
        console.log('No collections found for this user.');
        return null;
    }

    const batch = db.batch()
    
    snapshot.forEach(doc => {
      const collectionsRef = collectionsRef.doc(doc.id);
      batch.update(collectionsRef, { createdByName: newCreatorName });
    });

    // Update Products
    const productsRef = db.collection('products');
    const snapshot = await productsRef.where('createdBy', '==', userId).get();

    if (snapshot.empty) {
      console.log('No products found for this user.');
      return null;
    }

    snapshot.forEach(doc => {
      const productRef = productsRef.doc(doc.id);
      batch.update(productRef, { createdByDisplayName: newCreatorName });
    });

    await batch.commit();

    const totalSize = collectionSnap.size + snapshot.size;
    console.log(`Updated ${totalSize} items with new creator_name: ${newCreatorName}`);
    return null;
  });

