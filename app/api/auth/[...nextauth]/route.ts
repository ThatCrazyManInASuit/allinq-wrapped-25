import {Session, User} from "next-auth";
import NextAuth from "next-auth";
import DiscordProvider from "next-auth/providers/discord";

export const authOptions = {
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, user }: {token: any, user: User}) {
        if (user) {
            token.id = user.id;
        }
        return token;
    },
    async session({ session, token }: {session: Session, token: any}) {
        if (token?.id) {
        (session.user as any).id = token.id;
        }
        return session;
    },
}}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }; // <-- this is required for Next 13 route handlers
