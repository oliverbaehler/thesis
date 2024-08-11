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

      if (beforeData.displayName === afterData.displayName) {
        return null;
      }

      const newCreatorName = afterData.displayName;

      // Update Collections
      const collectionsRef = db.collection("collections");
      const collectionSnap = await collectionsRef
          .where("createdBy", "==", userId).get();

      // We can exit here, because if a user does not have any collections
      // they can not have any products
      if (collectionSnap.empty) {
        return null;
      }

      const batch = db.batch();
      snapshot.forEach((doc) => {
        const collectionsRef = collectionsRef.doc(doc.id);
        batch.update(collectionsRef, {createdByName: newCreatorName});
      });

      // Update Products
      const productsRef = db.collection("products");
      const snapshot = await productsRef.where("createdBy", "==", userId).get();

      if (snapshot.empty) {
        return null;
      }

      snapshot.forEach((doc) => {
        const productRef = productsRef.doc(doc.id);
        batch.update(productRef, {createdByName: newCreatorName});
      });

      await batch.commit();
      return null;
    });

