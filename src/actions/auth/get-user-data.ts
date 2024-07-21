'use server';

import prisma from '@/db/db';

//Get user data from DB, used to get the latest attributes from a user ex: profile picture
export const getUserData = async (id: string) => {
	try {
		const user = await prisma.user.findUnique({ where: { id } });

		return {
			ok: true,
			data: {
				image: user?.image,
				roles: user?.roles,
				email: user?.email,
				name: user?.name,
			},
		};
	} catch (error) {
		return {
			ok: false,
			message: 'An error occurred while retrieving user data from DB',
		};
	}
};
