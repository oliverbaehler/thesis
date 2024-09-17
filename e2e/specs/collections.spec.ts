import { test, expect } from '@playwright/test';
import { doc, getDoc } from 'firebase/firestore';
import { signInWithCustomToken} from 'firebase/auth';
import { db, auth } from '../../src/firebaseConfig';
import { createGoogleTestUser, deleteTestUser } from '../auth.setup';

test.describe('Collection Form Test', () => {
    let userData: { uid: string, email: string };

    test.beforeAll(async () => {
        // Create a Google test user and add them to Firestore
        userData = await createGoogleTestUser();
    
        //expect(user).not.toBeNull();
        //console.log('User logged in as:', user?.displayName);
      });

  test('should submit the form and save data to Firestore', async ({ page }) => {
    // Navigate to the form page
    await page.goto('http://localhost:5002/dashboard/collections/new');

    // Fill in the form fields
    await page.fill('input[name="name"]', 'Test Collection');
    await page.fill('textarea[name="content"]', 'This is a test collection content.');

    // Simulate file upload via DropZone component
    const filePath = 'tests/fixtures/test-image.png'; // Adjust the file path
    await page.setInputFiles('input[type="file"]', filePath);

    // Submit the form
    await page.click('button[type="submit"]');

    // Wait for the redirection to /dashboard/collections/[id]
    await page.waitForURL(/\/dashboard\/collections\/.*/);

    // Extract the collection ID from the URL
    const collectionId = page.url().split('/').pop() || ''; // Ensure collectionId is a string

    // Verify that the data is saved in Firestore
    const docRef = doc(db, 'collections', collectionId);  // Ensure the types are correct
    const docSnapshot = await getDoc(docRef);  // Correct use of getDoc

    // Validate Firestore document data
    expect(docSnapshot.exists()).toBeTruthy();
    const data = docSnapshot.data();
    expect(data?.name).toBe('Test Collection');
    expect(data?.content).toBe('This is a test collection content.');
  });



  //test.afterAll(async () => {
  //  await deleteTestUser(userData.uid); 
  //});

});
