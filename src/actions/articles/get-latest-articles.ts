'use server';

import prisma from '@/db/db';

export const getLatestArticles = async () => {
	try {
		const articles = await prisma.article.findMany({
			orderBy: { createdAt: 'desc' },
			select: { createdAt: true, thumbnail: true, title: true, slug: true, creator: { select: { name: true } } },
			where: { visibleForUsers: true },
			take: 10,
		});

		return {
			ok: true,
			articles,
		};
	} catch (error) {
		return {
			ok: false,
			message: 'An error occurred while trying to retrieve the latest articles.',
		};
	}
};
