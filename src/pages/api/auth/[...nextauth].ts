import { MongoDBAdapter } from "@auth/mongodb-adapter";
import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import Email from "next-auth/providers/email";
import clientPromise from "src/lib/mongoClient";

export const authOptions: AuthOptions = {
  providers: [
    Email({
      server: {
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
      },
      from: process.env.SMTP_FROM,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  callbacks: {
    async session({ session, user }) {
      // match session and database values and avoir serialization errors from undefined
      if (session.user) {
        session.user.email = user.email;
        session.user.name = user.name ?? null;
        session.user.image = user.image ?? null;
      }

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    newUser: "/new-user",
    signIn: "/login",
    verifyRequest: "/verify",
  },
};

export default NextAuth(authOptions);
