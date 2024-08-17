'use server';

import { auth } from '@/auth';
import prisma from '@/db/db';

export const getBanners = async () => {
	try {
		//Soft auth, no need to check the user from DB (low risk action)
		const session = await auth();

		if (!session) {
			return {
				ok: false,
				message: 'Unauthenticated.',
			};
		}

		if (!session.user.roles.includes('admin')) {
			return {
				ok: false,
				message: 'Not authorized.',
			};
		}

		const banners = await prisma.banner.findMany();

		return {
			ok: true,
			banners,
		};
	} catch (error) {
		console.log(error);
		return {
			ok: false,
			message: 'Unknown error while retrieving the banners.',
		};
	}
};
