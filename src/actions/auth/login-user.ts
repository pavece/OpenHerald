'use server';

import prisma from '@/db/db';
import bcrypt from 'bcryptjs';

export const signInEmailPassword = async (password: string, email: string) => {
	try {
		if (!email || !password) return null;
		const user = await prisma.user.findUnique({ where: { email } });

		if (!user) {
			return { ok: false, message: 'User not found' };
		}

		if (!bcrypt.compareSync(password, user.password!)) {
			return { ok: false, message: 'Password is not correct' };
		}

		return { ok: true, user };
	} catch (error) {
		console.log(error);
		return { ok: false, message: 'Unknown error' };
	}
};
