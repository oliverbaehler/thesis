import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import InstagramProvider from "next-auth/providers/instagram";
import { FirestoreAdapter } from "@auth/firebase-adapter"
import { cert } from "firebase-admin/app"

const handler = NextAuth({
    session: {
      // Choose how you want to save the user session.
      // The default is `"jwt"`, an encrypted JWT (JWE) stored in the session cookie.
      // If you use an `adapter` however, we default it to `"database"` instead.
      // You can still force a JWT session by explicitly defining `"jwt"`.
      // When using `"database"`, the session cookie will only contain a `sessionToken` value,
      // which is used to look up the session in the database.
      strategy: "jwt",
    },
    callbacks: {
      async jwt(token, user, account, profile, isNewUser) {
        if (account?.accessToken) {
          token.accessToken = account.accessToken;
          // Create custom JWT token here
          const firebaseAdmin = getFirebaseAdmin();
          const customToken = await firebaseAdmin.auth().createCustomToken(user.id);
          token.firebaseToken = customToken;
        }
        return token;
      },
      async session(session, token) {
        session.user.firebaseToken = token.firebaseToken;
        return session;
      },
    },
    pages: {
      signIn: '/auth/login',
      signOut: '/auth/signout',
      error: '/auth/error',
    },
    theme: {
      colorScheme: "auto", // "auto" | "dark" | "light"
      brandColor: "", // Hex color code
      logo: "", // Absolute URL to image
      buttonText: "" // Hex color code
    },
    // Configure one or more authentication providers
    providers: [
      InstagramProvider({
        clientId: process.env.INSTAGRAM_CLIENT_ID,
        clientSecret: process.env.INSTAGRAM_CLIENT_SECRET
      }),
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET
      })
    ],
    adapter: FirestoreAdapter({
      credential: cert({
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        clientEmail: process.env.AUTH_FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.AUTH_FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n")
      }),
    }),
})

export default handler