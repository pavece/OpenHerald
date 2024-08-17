'use server';

import { auth } from '@/auth';
import { checkUser } from '../auth/check-user';
import prisma from '@/db/db';

export const setBannerAsInactive = async (id: string) => {
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

		//Set this banner to active
		await prisma.banner.update({ where: { id }, data: { isActive: false } });

		return {
			ok: true,
			message: 'Banner updated.',
		};
	} catch (error) {
		console.log(error);
		return {
			ok: true,
			message: `Unknown error while setting banner with id ${id} as inactive.`,
		};
	}
};
