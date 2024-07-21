'use server';

import prisma from '@/db/db';
import bcrypt from 'bcryptjs';

export const createUser = async (username: string, email: string, password: string) => {
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

		const hashSaltPassword = bcrypt.hashSync(password);

		const user = await prisma.user.create({ data: { name: username, email, password: hashSaltPassword } });

		return { ok: true, user };
	} catch (error) {
		console.log(error);
		return { ok: false, message: 'Cannot create user' };
	}
};
