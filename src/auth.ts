import NextAuth from 'next-auth';
import credentials from 'next-auth/providers/credentials';
import { signInEmailPassword } from './actions/auth/login-user';
import google from 'next-auth/providers/google';
import { PrismaAdapter } from '@auth/prisma-adapter';
import prisma from './db/db';

export const { handlers, signIn, signOut, auth } = NextAuth({
	session: {
		strategy: 'jwt',
	},
	adapter: PrismaAdapter(prisma),
	providers: [
		credentials({
			credentials: {
				email: {},
				password: {},
			},
			async authorize(credentials) {
				const result = await signInEmailPassword(String(credentials.password), String(credentials.email));

				if (result?.ok) {
					const { password: _, banned: __, updatedAt: ___, ...rest } = result?.user!;
					return rest;
				}
				return null;
			},
		}),
		google,
	],
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				const userId = user.id;
				const userFromDB = await prisma.user.findUnique({ where: { id: userId } });

				if (userFromDB?.banned) {
					throw new Error('banned');
				}

				token.data = user;
			}
			return token;
		},
		session({ session, token }) {
			session.user = token.data as any;
			return session;
		},
	},
	pages: {
		signIn: '/auth/signIn',
		newUser: '/auth/register',
		error: '/auth/error',
	},
});
