'use server';

import { auth } from '@/auth';
import prisma from '@/db/db';

export const getAccounts = async () => {
	try {
		const session = await auth();

		if (!session?.user.roles.includes('admin')) {
			return {
				ok: false,
				message: 'Not allowed',
			};
		}

		const accounts = await prisma.user.findMany({
			select: {
				id: true,
				banned: true,
				name: true,
				email: true,
				image: true,
				createdAt: true,
				roles: true,
			},
			where: {
				NOT: {
					roles: {
						has: session.user.roles[0] === 'super-admin' ? '' : session.user.roles[0],
					},
				},
			},
		});

		return {
			ok: true,
			accounts,
		};
	} catch (error) {
		return {
			ok: false,
			message: 'An error occurred while trying to retrieve users information',
		};
	}
};
