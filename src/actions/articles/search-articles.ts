'use server';

import prisma from '@/db/db';

export const searchArticles = async (query: string) => {
	try {
		const articles = await prisma.article.findMany({
			where: {
				title: {
					search: query,
				},
			},
			select: {
				title: true,
				slug: true,
			},
		});

        return {
            ok: true,
            articles
        }

	} catch (error) {
		return {
			ok: false,
		};
	}
};
