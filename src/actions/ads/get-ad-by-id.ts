'use server';

import prisma from '@/db/db';

export const getAdById = async (id: string) => {
	try {
		const ad = await prisma.advertisement.findUnique({ where: { id } });

		return {
			ok: true,
			ad,
		};
	} catch (error) {
		console.log(error);
		return {
			ok: false,
			message: `Unknown error while getting ad with id ${id}`,
		};
	}
};
