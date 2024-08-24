'use server';

import prisma from '@/db/db';
import bcrypt from 'bcryptjs';
import { markAsUsed } from './register-link-actions';

export const createUser = async (username: string, email: string, password: string, linkId: string) => {
	if (!username || !email || !password) {
		return null;
	}

	try {
		const userCount = await prisma.user.count();

		if (userCount !== 0) {
			const userTry = await prisma.user.findUnique({ where: { email } });

			if (userTry) {
				return {
					ok: false,
					message: 'Email already exists',
				};
			}

			const markAsUsedResult = await markAsUsed(linkId); //Checks the link too

			if (!markAsUsedResult.ok) {
				return {
					ok: false,
					message: 'Registration link is not valid',
				};
			}
		}

		const hashSaltPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

		const user = await prisma.user.create({
			data: {
				name: username,
				email,
				password: hashSaltPassword,
				roles: userCount === 0 ? ['super-admin', 'admin', 'editor'] : ['editor'],
			},
		});

		return { ok: true, user };
	} catch (error) {
		console.log(error);
		return { ok: false, message: 'Cannot create user' };
	}
};
