'use server';

import prisma from '@/db/db';

export const getCategories = async () => {
	try {
		const categories = await prisma.category.findMany();
		return {
			ok: true,
			categories,
		};
	} catch (error) {
		return {
			ok: false,
		};
	}
};
