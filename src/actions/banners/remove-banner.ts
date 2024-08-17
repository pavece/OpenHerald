'use server';

import { auth } from '@/auth';
import { checkUser } from '../auth/check-user';
import prisma from '@/db/db';

export const deleteBanner = async (id: string) => {
	try {
		const session = await auth();

		if (!session?.user) {
			return {
				ok: false,
				message: 'Unauthenticated.',
			};
		}

		const userCheckFromDb = await checkUser(session.user.id);

		if (!userCheckFromDb.user?.roles.includes('admin') || userCheckFromDb.user?.banned) {
			return {
				ok: false,
				message: 'Not authorized.',
			};
		}

		//Set every banner as not active
		await prisma.banner.delete({ where: { id } });

		return {
			ok: true,
			message: 'Banner deleted.',
		};
	} catch (error) {
		console.log(error);
		return {
			ok: true,
			message: `Unknown error while deleting banner with id ${id}.`,
		};
	}
};
