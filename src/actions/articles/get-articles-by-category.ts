'use server';

import prisma from '@/db/db';

export const getArticlesByCategory = async (category: string, page: number = 1) => {
	try {
		const limit = 10;
		const articleCount = await prisma.article.count({ where: { category: { name: category }, visibleForUsers: true } });
		const articles = await prisma.category.findFirst({
			where: { name: category },
			select: {
				name: true,
				description: true,
				Article: {
					where: { visibleForUsers: true },
					orderBy: { createdAt: 'desc' },
					select: { title: true, slug: true, createdAt: true, thumbnail: true, creator: { select: { name: true } } },
					skip: limit * (page - 1),
					take: limit,
				},
			},
		});

		const maxPage = Math.ceil(articleCount / limit);

		return {
			ok: true,
			pagination: {
				currentPage: page,
				previousPage: page == 1 ? null : page - 1,
				nextPage: page === maxPage ? null : page + 1,
				maxPages: maxPage,
			},
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
