'use server';

import prisma from '@/db/db';

export const getLatestBanner = async () => {
	try {
		const banner = await prisma.banner.findFirst({ where: { isActive: true } });

		return {
			ok: true,
			banner,
		};
	} catch (error) {
		console.log(error);
		return {
			ok: false,
			message: 'Unknown error while retrieving the latest banner.',
		};
	}
};
