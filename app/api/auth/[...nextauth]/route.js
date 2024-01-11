// The naming of this file and folder is important for NextAuth to work correctly
// Seehttps://next-auth.js.org/configuration/initialization#route-handlers-app

import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";

console.log(process.env.SPOTIFY_CLIENT_SECRET);
export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    SpotifyProvider({
      // These will be taken from .env.local at the root of your project
      // See the ".env.sample" file for an example
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      authorization: {
        // Make sure to go to your Spotify app settings https://developer.spotify.com/dashboard
        // and add "http://localhost:3000/api/auth/callback/spotify" as a Redirect URI.
        // See https://next-auth.js.org/configuration/providers/oauth#how-to
        url: "https://accounts.spotify.com/authorize",
        // A scope is the permissions you're asking the user to give your application
        // You can ask for multiple scopes
        // See https://developer.spotify.com/documentation/web-api/concepts/scopes
        params: { scope: "user-read-email" },
      },
    }),
  ],
  // These callbacks are functions that run when we sign in, try to get jwt info, and try to get session info.
  // See https://next-auth.js.org/configuration/options#callbacks
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return { user, account, profile, email, credentials }
    },
    async session({ session, token, user }) {
      return { ...token, ...session, ...user }
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      return {...token, ...user, ...account, ...profile, ...isNewUser}
    }
  }

};

const handler = NextAuth(authOptions);

// All requests to /api/auth/* (signIn, callback, signOut, etc.) will automatically be handled by NextAuth.js.
export { handler as GET, handler as POST };
