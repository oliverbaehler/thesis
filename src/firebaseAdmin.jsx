import admin from 'firebase-admin';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      clientEmail: "firebase-adminsdk-obb6h@pariahs-e621e.iam.gserviceaccount.com",
      privateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCl8pdhcacwy6R1\nQb1716SCXcU+cOVKIw9ApO9WdTTVrDLb+Jn7sxp45AptQAQ302Q5GkT5q48CZGhL\n2kZuui9UDMPfdd1+LZ0mSJpLqWVYpzWktQ58KHlSHXI3C0E9HeBsJurd6Iw9n/KB\nb4RK1UEd/q+8cif0fWIuFHOsNJGu/IU9P0LDninWFwk3IcX3E6akqCAt6oczky5M\nxaAlkBrb75DRHLnIfveZ9j+S8CPlnWouXz6ih7JXWOYkFd8o7pfU5dqgV3Wj8Bmz\nTxRZmIR0afLXZmcXjLqEyjOEO5CYdyIOjgagDvK1EVk/pj2PJgpsRrroHXvVv4By\nWoVsGHcPAgMBAAECggEAKMqMbn3+8G4mU1JhDuePfyIooXQj0Ij0r1m7oT93SMym\nxc6Cn03DxJKdg4RYZRaXzLeJ2+tRYG+o+XhCluY6SwlGPpAc7W6t8eKn1tBhYpzb\ngUymLlvOkqI9WI1yMGE/MKaSVhDbJCzEcg+k77Yi5wobTZGsA5usfhI16s8TPnVb\nuYmry/upvli04G7Dg8E9pfP+Hv8XtEqvehKonuXJO5QJS81CAJND6tBobl5NVMgu\nenTytG6HI0/MgKKJW/h6ZtPUom6dCZaeik2qZia3EVNv/kVU/EHVng7n4azBQ6pN\nJHqu/aCtez+WBpwgwN5LZA3R09TMu19K2uT8nZ66zQKBgQDS/VkT42p1ekmcYqCN\nZUCGSi113KLxxdeOEheyQjDbFT/NxQp2uug+T8QggVkLXIWB20rAcJ5O2lyPlPau\ntDlI+nFk9n4FmLiiH5qzDXkaa/WF1zXs0d3ronjdoSt8014sVKu0W258GSZY0s9h\nKejyYl3gczc+c8/BnUjG1wenZQKBgQDJWWPu4yJxaqVJyaYY8h0X/dbDB094c+qW\nlEGWbghYhVyAcQsfNolHqIFRxfXH2K0xlLpa8TDdyCb8N+j59O3oHpnQBl0/gj1W\nPQXFlPt07wtrWEDjoz7TFL+Kz7ykJq04ZLOqRttawsVf8b5Hgq0prCXcmXyoR71J\ngRg0P0+fYwKBgGTwEUKDhLXJGBg50udyLilQqWj+cfHKnXH5U97S7b6R7uFJR9U/\nW8YbsQ9/8hKOY8yZFaz087dznd6O/GjeDZ3NOpx7lBSnWIUvK3pHks1CIsayC7lN\nOab2Jm6ZIU3pbN82bqKtLzEtcvwBdnbcbvYuewza8e3tx9GvplaCHsZFAoGBAJT3\nbMcmBqqQs19HMHsOTdYdOJIsS3Cbmjjz0R6ho80SReDFQexC5gg9NAgzBOdpeKHR\nHpsADR5Y4fcCynx76LQuR7AvtTeyfPzbwvRuiCf4X6N4tPF2KpnypM/nZ/KupsOt\nRXu6Vrnsliio6xVvKfxF3/E5IZBDG1lRiH3HRXpvAoGBALbca/cFzZo5VfX5i3JQ\n2qP8+cgyp9DjyaROKSfvZO0kKiNk5qUnMmaNtUoQZ0STy0h/qa2RLN0llz/RnkJu\ncYSPL52AhSZ7r5HNclsJXqvUn1kJPlg9hCVQOLaivc4/Qzvy3+sltXPgWHYakpxM\nGJ80g+MPDCRuMlofVgsOutHv\n-----END PRIVATE KEY-----\n",
      //privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    }),
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  });
}

const adminAuth = admin.auth();
const adminDb = admin.firestore();
const adminStorage = admin.storage();

export { admin, adminAuth, adminDb, adminStorage };