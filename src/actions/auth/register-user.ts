'use server';

import prisma from '@/db/db';
import bcrypt from 'bcryptjs';
import { markAsUsed } from './register-link-actions';

export const createUser = async (username: string, email: string, password: string, linkId: string) => {
	if (!username || !email || !password) {
		return null;
	}

	try {
		const userTry = await prisma.user.findUnique({ where: { email } });

		if (userTry) {
			return {
				ok: false,
				message: 'Email already exists',
			};
		}

		const markAsUsedResult = await markAsUsed(linkId);

		if (!markAsUsedResult.ok) {
			return {
				ok: false,
				message: 'Registration link is not valid',
			};
		}

		const hashSaltPassword = bcrypt.hashSync(password);

		const user = await prisma.user.create({ data: { name: username, email, password: hashSaltPassword } });

		return { ok: true, user };
	} catch (error) {
		console.log(error);
		return { ok: false, message: 'Cannot create user' };
	}
};
