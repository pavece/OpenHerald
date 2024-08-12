'use server';

import prisma from '@/db/db';

export const getArticlesByCategory = async (category: string) => {
	try {
		const articles = await prisma.category.findFirst({
			where: { name: category },
			select: {
				name: true,
				description: true,
				Article: {
					where: { visibleForUsers: true },
					orderBy: { createdAt: 'desc' },
					select: { title: true, slug: true, createdAt: true, thumbnail: true, creator: { select: { name: true } } },
				},
			},
		});

		return {
			ok: true,
			articles,
		};
	} catch (error) {
		console.log(error);
		return {
			ok: false,
			message: `An error ocurred while retrieving articles information for category ${category}`,
		};
	}
};
