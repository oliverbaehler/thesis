const {getFirestore} = require("firebase-admin/firestore");
const {storage} = require("firebase-functions");

const MAX_STORAGE_LIMIT = 5 * 1024 * 1024 * 1024; // 3 GB in bytes

exports.onUserItemCreated = storage
    .object()
    .onFinalize(async (object) => {
      const paths = object.name?.split("/");
      if (!paths || paths.length < 2) {
        console.log("Invalid storage path or file outside of user directories");
        return;
      }

      const userId = paths[0];
      const size = parseInt(object.size, 10);

      if (isNaN(size)) {
        console.log("Invalid size value:", object.size);
        return;
      }

      try {
        const firestore = getFirestore();
        const userRef = firestore.doc(`users/${userId}`);

        const currentStorageSpaceUsed = await getCurrentSpaceUsed(userRef);
        const storageSpaceUsed = currentStorageSpaceUsed + size;

        // Check if the user exceeds the storage limit
        if (storageSpaceUsed > MAX_STORAGE_LIMIT) {
          console.log(`User ${userId} exceeds the storage limit.`);
          // Delete the file since the limit is exceeded
          const file = storage.bucket(object.bucket).file(object.name);
          await file.delete();
          console.log(`File ${object.name} deleted 
            due to storage limit exceedance.`);
          return;
        }

        await userRef.update({
          storageSpaceUsed,
        });

        console.log(`User ${userId} storage successfully 
            updated with ${size} bytes.`);
      } catch (e) {
        console.error("Error updating storage space:", e);
      }
    });

/**
 * Retrieves the current storage space
 * used by the user from Firestore.
 *
 * @param {DocumentReference} userRef - A reference to
 * the user's Firestore document.
 * @return {Promise<number>} - A promise that resolves
 * to the storage space used by the user in bytes.
 */
function getCurrentSpaceUsed(userRef) {
  return userRef
      .get()
      .then((ref) => ref.data())
      .then((user) => user?.storageSpaceUsed ?? 0);
}
