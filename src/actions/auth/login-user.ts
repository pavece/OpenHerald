'use server';

import prisma from '@/db/db';
import bcrypt from 'bcryptjs';

export const signInEmailPassword = async (password: string, email: string) => {
	if (!email || !password) return null;
	const user = await prisma.user.findUnique({ where: { email } });

	if (!user) {
		throw new Error('User not found');
	}

	if (!bcrypt.compareSync(password, user.password!)) {
		throw new Error('The password is not correct');
	}

	return user;
};
