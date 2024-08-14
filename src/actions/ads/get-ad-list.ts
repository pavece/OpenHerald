'use server';

import { auth } from '@/auth';
import { checkUser } from '../auth/check-user';
import prisma from '@/db/db';

export const getAdList = async () => {
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

		const ads = await prisma.advertisement.findMany();

		return {
			ok: true,
			ads,
		};
	} catch (error) {
		console.log(error);
		return {
			ok: false,
			message: 'Unknown error while retrieving the AD list.',
		};
	}
};
