import NextAuth from 'next-auth';
import credentials from 'next-auth/providers/credentials';
import { signInEmailPassword } from './auth/actions/credentials-actions';

export const { handlers, signIn, signOut, auth } = NextAuth({
	providers: [
		credentials({
			credentials: {
				email: {},
				password: {},
			},
			authorize: async credentials => {
				const user = await signInEmailPassword(String(credentials.password), String(credentials.email));
				return user;
			},
		}),
	],
});
