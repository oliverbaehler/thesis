const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
const db = admin.firestore();

// Updates the CreatorName in all collections and products
exports.updateItemsOnUserChange = functions.firestore
    .document(`users/{userId}`)
    .onUpdate(async (change, context) => {
      const beforeData = change.before.data();
      const afterData = change.after.data();
      const userId = context.params.userId;

      if (beforeData.displayName == afterData.displayName) {
        return null;
      }

      const newCreatorName = afterData.displayName;

      // Update Collections
      const collectionsRef = db.collection("collections");
      console.log("Querying collections where createdBy is", userId);
      const collectionSnap = await collectionsRef
          .where("createdBy", "==", userId).get();

      // We can exit here, because if a user does not have any collections
      // they can not have any products
      if (collectionSnap.empty) {
        console.log("No collections found for user:", userId);
        return null;
      }

      const batch = db.batch();
      collectionSnap.forEach((doc) => {
        const docRef = collectionsRef.doc(doc.id);
        console.log("Updating collection:", doc.id, "with new creator name:", newCreatorName);
        batch.update(docRef, { createdByName: newCreatorName });
      });

      // Update Products
      const productsRef = db.collection("products");
      const snapshot = await productsRef.where("createdBy", "==", userId).get();

      if (snapshot.empty) {
        await batch.commit();
      }

      snapshot.forEach((doc) => {
        const docRef = productsRef.doc(doc.id);
        batch.update(docRef, {createdByName: newCreatorName});
      });

      await batch.commit();
      return null;
    });


// Update Collection Name in all products

exports.updateProductsOnCollectionNameChange = functions.firestore
  .document('collections/{collectionId}')
  .onUpdate(async (change, context) => {
    const newValue = change.after.data();
    const previousValue = change.before.data();

    // Check if the name has changed
    if (newValue.name !== previousValue.name) {
      const newCollectionName = newValue.name;
      const collectionId = context.params.collectionId;

      const productsRef = admin.firestore().collection('products');
      const querySnapshot = await productsRef.where('collectionId', '==', collectionId).get();

      // Create a batch to update all matching products
      const batch = admin.firestore().batch();
      querySnapshot.forEach((doc) => {
        batch.update(doc.ref, { collectionName: newCollectionName });
      });

      await batch.commit();
    }
  });

