'use server';
import prisma from '@/db/db';

export const checkUser = async (id: string) => {
	try {
		const user = await prisma.user.findUnique({
			where: { id },
			select: {
				roles: true,
				name: true,
				banned: true,
			},
		});

		return {
			ok: true,
			user,
		};
	} catch (error) {
		return {
			ok: false,
			message: `Error checking user with id ${id}`,
		};
	}
};
