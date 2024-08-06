'use server';

import { auth } from '@/auth';
import prisma from '@/db/db';

export const getUserById = async (id: string) => {
	try {
		const session = await auth();

		if (!session?.user.roles.includes('admin') && session?.user.id !== id) {
			return {
				ok: false,
				message: 'Unauthorized',
			};
		}

		const user = await prisma.user.findFirst({
			where: { id },
			select: { accounts: true, email: true, image: true, name: true, description: true },
		});

		if (!user) {
			return { ok: false, message: 'User not found' };
		}

		const { accounts, ...rest } = user;

		return {
			ok: true,
			user: {
				...rest,
				isGoogle: accounts.length > 0,
			},
		};
	} catch (error) {
		console.log(error);
		return {
			ok: false,
			message: 'An error occurred while retrieving the user data',
		};
	}
};
