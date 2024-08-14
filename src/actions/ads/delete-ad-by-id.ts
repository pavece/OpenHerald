'use server';

import { auth } from '@/auth';
import { checkUser } from '../auth/check-user';
import prisma from '@/db/db';

export const deleteAdById = async (id: string) => {
	try {
		const session = await auth();

		if (!session?.user) {
			return {
				ok: false,
				message: 'Unauthenticated',
			};
		}

		const userFromDb = await checkUser(session.user.id);

		if (userFromDb.user?.banned || !userFromDb.user?.roles.includes('admin')) {
			return {
				ok: false,
				message: 'Not authorized',
			};
		}

		await prisma.advertisement.delete({ where: { id } });

		return {
			ok: true,
			message: 'AD deleted',
		};
	} catch (error) {
		console.log(error);
		return {
			ok: false,
			message: `Unknown error while trying to delete article with id ${id}`,
		};
	}
};
