'use server';

import prisma from '@/db/db';

export const getArticleBySlug = async (slug: string) => {
	try {
		const article = await prisma.article.findFirst({
			where: { slug },
			include: { creator: { select: { name: true } }, category: true },
		});

		if (!article) {
			return {
				ok: false,
				message: 'Article not found',
			};
		}

		return {
			ok: true,
			article,
		};
	} catch (error) {
		return {
			ok: false,
			message: 'An error occurred while trying to retrieve the article from the database',
		};
	}
};
