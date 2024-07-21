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
	//@ts-ignore
	adapter: PrismaAdapter(prisma),
	providers: [
		credentials({
			credentials: {
				email: {},
				password: {},
			},
			//@ts-ignore
			authorize: async credentials => {
				const user = await signInEmailPassword(String(credentials.password), String(credentials.email));

				if (user) {
					const { password: _, banned: __, updatedAt: ___, ...rest } = user;
					return rest;
				}

				throw new Error('Error while login');
			},
		}),
		google,
	],
	callbacks: {
		jwt({ token, user }) {
			if (user) {
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
	},
});
