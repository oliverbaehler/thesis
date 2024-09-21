const { initializeTestEnvironment, assertFails, assertSucceeds } = require('@firebase/rules-unit-testing');
const { getFirestore, setDoc, doc, getDoc, getDocs, updateDoc, deleteDoc, collection } = require('firebase/firestore');
const { readFileSync } = require('fs');
const { stubFalse } = require('lodash');

const projectId = "pariah-prod";
const rulesFile = "firestore.rules"; // This is where your rules are stored

let testEnv;

beforeAll(async () => {
  try {
    // Initialize the testing environment with your security rules
    testEnv = await initializeTestEnvironment({
      projectId: projectId,
      firestore: {
        rules: readFileSync(rulesFile, "utf8"),
        host: '127.0.0.1',
        port: 8080,
      },
    });
  } catch (error) {
    console.error("Error during test environment initialization:", error);
  }
});

//afterAll(async () => {
//  if (testEnv) {
//    try {
//      await testEnv.cleanup();
//    } catch (error) {
//      console.error("Error during test environment cleanup:", error);
//    }
//  }
//});

beforeEach(async () => {
  // Clear the database between tests to ensure a clean slate
  await testEnv.clearFirestore();

  // List of users to be created, each with the role 'creator'
  const users = [
    { uid: 'user1', role: 'creator' },
    { uid: 'user2', role: 'creator' },
    { uid: 'user3', role: 'creator' },
    { uid: 'userunprivileged', role: 'user' },
  ];

  // Create each user in Firestore, authenticated as that user
  await Promise.all(users.map(async (user) => {
    const userDb = testEnv.authenticatedContext(user.uid).firestore();
    await setDoc(doc(userDb, 'users', user.uid), {
      uid: user.uid,
      role: user.role,
      email: `${user.uid}@example.com`,
      displayName: `User ${user.uid}`,
    });
  }));
});

describe('[Firebase]: Account Settings', () => {
  test('[Account]: User can edit their own account settings', async () => {
    const db = testEnv.authenticatedContext('user1').firestore();
    const userRef = doc(db, 'users', 'user1');
  
    // User1 attempts to update their own account settings
    await assertSucceeds(updateDoc(userRef, {
      displayName: 'New Display Name',
      content: 'Updated content'
    }));
  
    // Verify that the update was successful
    const userDoc = await getDoc(userRef);
    expect(userDoc.data()).toMatchObject({
      displayName: 'New Display Name',
      content: 'Updated content'
    });
  });

  test('[Account]: User cannot edit another user\'s account settings', async () => {
    const db = testEnv.authenticatedContext('user2').firestore();
    const userRef = doc(db, 'users', 'user1'); // User2 tries to edit User1's data
  
    // User2 attempts to update User1's account settings
    await assertFails(updateDoc(userRef, {
      displayName: 'Hacked Name',
      content: 'Hacked content'
    }));
  });

  test('[Account]: All users can read any user\'s account data', async () => {
    const db = testEnv.authenticatedContext('user1').firestore();
    const userRef = doc(db, 'users', 'user1');
  
    await assertSucceeds(updateDoc(userRef, {
      displayName: 'New Display Name',
      content: 'Updated content'
    }));

    const db2 = testEnv.authenticatedContext('user2').firestore();
    const userRef2 = doc(db2, 'users', 'user1');
  
    // User2 attempts to read User1's account data
    await assertSucceeds(getDoc(userRef2));
    
    // Verify the data was read correctly
    const userDoc = await getDoc(userRef2);
    expect(userDoc.exists()).toBe(true);
    expect(userDoc.data()).toHaveProperty('displayName');
    expect(userDoc.data()).toHaveProperty('content');
  });
  
})


describe('[Firebase]: Collection Tests', () => {
  
  test('[Collections]: Only allow creation by users with role creator', async () => {
   const db1 = testEnv.authenticatedContext('user1').firestore();
   await assertSucceeds(setDoc(doc(db1, 'collections', 'testCollection'), {
     content: "Original Content",
     published: true,
     createdBy: 'user1',
   }));
 
   const docRef = doc(db1, 'collections', 'testCollection');
   const docSnapshot = await getDoc(docRef);
   expect(docSnapshot.exists()).toBe(true);
   expect(docSnapshot.data().createdBy).toBe('user1');
 
   const db2 = testEnv.authenticatedContext('userunprivileged').firestore();
   await assertFails(setDoc(doc(db2, 'collections', 'testCollection2'), {
     content: "Some Content",
     published: true,
     createdBy: 'userunprivileged',
   }));
  });


  test('[Collections]: Allow read if the document is published or the user is the creator', async () => {
    const db = testEnv.authenticatedContext('user1').firestore();

    const docRef = doc(db, 'collections', 'testCollection');
    
    await setDoc(docRef, {
      content: "Original Content",
      published: true,
      createdBy: 'user1',
    });

    await assertSucceeds(getDoc(docRef));

    await assertSucceeds(testEnv.authenticatedContext('user2').firestore().doc('collections/testCollection').get());
    await assertSucceeds(testEnv.authenticatedContext('user1').firestore().doc('collections/testCollection').get());
  });

  test('[Collections]: Deny Reads for unpublished collections by other users than the creator', async () => {
    const db = testEnv.authenticatedContext('user1').firestore();

    const docRef = doc(db, 'collections', 'testCollection');
    
    await setDoc(docRef, {
      content: "Original Content",
      published: false,
      createdBy: 'user1',
    });

    await assertSucceeds(getDoc(docRef));
    await assertSucceeds(testEnv.authenticatedContext('user1').firestore().doc('collections/testCollection').get());
    await assertFails(testEnv.authenticatedContext('user2').firestore().doc('collections/testCollection').get());
  });

  test('[Collections]: Allow users to add and remove likes to collections (public), prevent creator from updates', async () => {
    // Initialize Firestore for user1 (the creator)
    const db1 = testEnv.authenticatedContext('user1').firestore();
    const collectionRef = doc(db1, 'collections', 'testCollection');
  
    // Create the collection document as user1 (creator)
    await assertSucceeds(setDoc(collectionRef, {
      createdBy: 'user1',
      published: true
    }));
  
    // Create Like for User2
    const db2 = testEnv.authenticatedContext('user2').firestore();
    const user2LikeRef = doc(db2, 'collections/testCollection/likes', 'user2');
    await assertSucceeds(setDoc(user2LikeRef, { likedAt: new Date() }));
  
    // Create Like for User3
    const db3 = testEnv.authenticatedContext('user3').firestore();
    const user3LikeRef = doc(db3, 'collections/testCollection/likes', 'user3');
    await assertSucceeds(setDoc(user3LikeRef, { likedAt: new Date() }));
  
    // User3 should not be able to delete user2's like
    const userCrossLikeRef = doc(db3, 'collections/testCollection/likes', 'user2');
    await assertFails(deleteDoc(userCrossLikeRef));

    // User3 should be able to unlike (delete their own like)
    await assertSucceeds(deleteDoc(user3LikeRef));

    // Unpublish document
    await assertSucceeds(setDoc(collectionRef, {
      createdBy: 'user1',
      published: false
    }));

    // User2 should no longer be able to read the likes
    await assertFails(getDoc(user2LikeRef));
  
    //// User3 should no longer be able to read the likes
    await assertFails(getDoc(user3LikeRef));
  //
    //// User1 should still be able to read the likes
    const collectionRefLikes = collection(db1, 'collections/testCollection/likes');
    const likesSnapshot = await assertSucceeds(getDocs(collectionRefLikes));
    // Check that user1 can read both user2's and user3's likes
    expect(likesSnapshot.docs.map(doc => doc.id)).toContain('user2');

  });

  test('[Collections]: Allow delete only if the user is the creator', async () => {
    const db = testEnv.authenticatedContext('user1').firestore();
    
    const docRef = doc(db, 'collections', 'testCollection');
    
    await setDoc(docRef, {
      createdBy: 'user1',
      published: true
    });

    await assertFails(testEnv.authenticatedContext('user2').firestore().doc('collections/testCollection').delete());

    await assertSucceeds(testEnv.authenticatedContext('user1').firestore().doc('collections/testCollection').delete());
  });

});


describe('[Firebase]: Product Tests', () => {
  
  test('[Products]: Only allow creation by users with role creator', async () => {
   const db1 = testEnv.authenticatedContext('user1').firestore();
   await assertSucceeds(setDoc(doc(db1, 'products', 'testProduct'), {
     content: "Original Content",
     published: true,
     createdBy: 'user1',
   }));
 
   const docRef = doc(db1, 'products', 'testProduct');
   const docSnapshot = await getDoc(docRef);
   expect(docSnapshot.exists()).toBe(true);
   expect(docSnapshot.data().createdBy).toBe('user1');
 
   const db2 = testEnv.authenticatedContext('userunprivileged').firestore();
   await assertFails(setDoc(doc(db2, 'products', 'testProduct'), {
     content: "Some Content",
     published: true,
     createdBy: 'userunprivileged',
   }));
  });


  test('[Products]: Allow read if the document is published or the user is the creator', async () => {
    const db = testEnv.authenticatedContext('user1').firestore();

    const docRef = doc(db, 'products', 'testProduct');
    
    await setDoc(docRef, {
      content: "Original Content",
      published: true,
      createdBy: 'user1',
    });

    await assertSucceeds(getDoc(docRef));

    await assertSucceeds(testEnv.authenticatedContext('user2').firestore().doc('products/testProduct').get());
    await assertSucceeds(testEnv.authenticatedContext('user1').firestore().doc('products/testProduct').get());
  });

  test('[Products]: Deny Reads for unpublished products by other users than the creator', async () => {
    const db = testEnv.authenticatedContext('user1').firestore();

    const docRef = doc(db, 'products', 'testProduct');
    
    await setDoc(docRef, {
      content: "Original Content",
      published: false,
      createdBy: 'user1',
    });

    await assertSucceeds(getDoc(docRef));
    await assertSucceeds(testEnv.authenticatedContext('user1').firestore().doc('products/testProduct').get());
    await assertFails(testEnv.authenticatedContext('user2').firestore().doc('products/testProduct').get());
  });

  test('[Products]: Allow users to add and remove likes to products (public), prevent creator from updates', async () => {
    // Initialize Firestore for user1 (the creator)
    const db1 = testEnv.authenticatedContext('user1').firestore();
    const collectionRef = doc(db1, 'products', 'testProduct');
  
    // Create the collection document as user1 (creator)
    await assertSucceeds(setDoc(collectionRef, {
      createdBy: 'user1',
      published: true
    }));
  
    // Create Like for User2
    const db2 = testEnv.authenticatedContext('user2').firestore();
    const user2LikeRef = doc(db2, 'products/testProduct/likes', 'user2');
    await assertSucceeds(setDoc(user2LikeRef, { likedAt: new Date() }));
  
    // Create Like for User3
    const db3 = testEnv.authenticatedContext('user3').firestore();
    const user3LikeRef = doc(db3, 'products/testProduct/likes', 'user3');
    await assertSucceeds(setDoc(user3LikeRef, { likedAt: new Date() }));
  
    // User3 should not be able to delete user2's like
    const userCrossLikeRef = doc(db3, 'products/testProduct/likes', 'user2');
    await assertFails(deleteDoc(userCrossLikeRef));

    // User3 should be able to unlike (delete their own like)
    await assertSucceeds(deleteDoc(user3LikeRef));

    // Unpublish document
    await assertSucceeds(setDoc(collectionRef, {
      createdBy: 'user1',
      published: false
    }));

    // User2 should no longer be able to read the likes
    await assertFails(getDoc(user2LikeRef));
  
    //// User3 should no longer be able to read the likes
    await assertFails(getDoc(user3LikeRef));
  //
    //// User1 should still be able to read the likes
    const collectionRefLikes = collection(db1, 'products/testProduct/likes');
    const likesSnapshot = await assertSucceeds(getDocs(collectionRefLikes));
    // Check that user1 can read both user2's and user3's likes
    expect(likesSnapshot.docs.map(doc => doc.id)).toContain('user2');

  });

  test('[Products]: Allow delete only if the user is the creator', async () => {
    const db = testEnv.authenticatedContext('user1').firestore();
    
    const docRef = doc(db, 'products', 'testProduct');
    
    await setDoc(docRef, {
      createdBy: 'user1',
      published: true
    });

    await assertFails(testEnv.authenticatedContext('user2').firestore().doc('products/testProduct').delete());

    await assertSucceeds(testEnv.authenticatedContext('user1').firestore().doc('products/testProduct').delete());
  });

});


