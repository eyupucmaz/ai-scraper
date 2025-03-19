import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { db } from '@/lib/db';

// NextAuth yapılandırması
const handler = NextAuth({
  adapter: DrizzleAdapter(db),
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID || 'dummy-id',
      clientSecret: process.env.GITHUB_SECRET || 'dummy-secret',
    }),
    Google({
      clientId: process.env.GOOGLE_ID || 'dummy-id',
      clientSecret: process.env.GOOGLE_SECRET || 'dummy-secret',
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error',
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
});

export { handler as GET, handler as POST };