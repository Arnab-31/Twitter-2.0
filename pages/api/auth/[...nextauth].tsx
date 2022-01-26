import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";


interface sessionProps {
  user?: any,
}

interface callbackProps {
  session:sessionProps,
  token: any,
  
}

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // ...add more providers here
  ],
  callbacks: {
    async session({ session, token }:any) {
      session.user.tag = session.user.name
        .split(" ")
        .join("")
        .toLocaleLowerCase();

      session.user.uid= token.sub;
      return session;
    },
  }, 
})