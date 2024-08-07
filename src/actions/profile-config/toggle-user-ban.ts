'use server';

import { auth } from '@/auth';
import prisma from '@/db/db';

export const toggleUserBan = async (id: string) => {
	try {
		const user = await prisma.user.findUnique({ where: { id } });

		if (!user) {
			return {
				ok: false,
				message: 'Not found',
			};
		}

		if (user?.roles.includes('super-admin')) {
			return {
				ok: false,
				message: 'Not allowed',
			};
		}

		const session = await auth();

		if (!session?.user.roles.includes('super-admin') && user?.roles.includes('admin')) {
			return {
				ok: false,
				message: 'Not allowed',
			};
		}

		await prisma.user.update({ where: { id }, data: { banned: !user.banned } });

		return {
			ok: true,
			banned: !user.banned,
		};
	} catch (error) {
		return {
			ok: false,
			message: 'Unknown error',
		};
	}
};
