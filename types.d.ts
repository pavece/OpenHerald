// nextauth.d.ts
import { DefaultSession, DefaultUser } from 'next-auth';
import { JWT } from 'next-auth/jwt';

interface IUser extends DefaultUser {
	roles?: string[];
	id: string;
	name?: string;
	image?: string;
	createdAt: string;
}

declare module 'next-auth' {
	interface User extends IUser {}

	interface Session {
		user?: User;
	}
}

declare module 'next-auth/jwt' {
	interface JWT extends IUser {}
}
