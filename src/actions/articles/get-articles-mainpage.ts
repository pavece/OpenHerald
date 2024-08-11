'use server';

import prisma from '@/db/db';

export interface IMainPageArticle {
	category?: {
		name: string | null;
	};
	title: string;
	slug: string;
	creator: {
		name: string | null;
	};
	createdAt: Date;
	priority: number;
	readingTime: number;
	thumbnail: string;
}

export const getArticlesMainPage = async () => {
	try {
		//Cover articles
		const seenArticles: string[] = [];
		const coverArticleList = await prisma.article.findMany({
			orderBy: { createdAt: 'desc' },
			where: { OR: [{ priority: 1 }, { priority: 2 }], AND: { visibleForUsers: true } },
			select: {
				category: {
					select: {
						name: true,
					},
				},
				title: true,
				slug: true,
				creator: {
					select: {
						name: true,
					},
				},
				createdAt: true,
				priority: true,
				readingTime: true,
				thumbnail: true,
			},
			take: 10,
		});

		const featuredCoverArticle = coverArticleList.find(a => a.priority === 1) ?? coverArticleList.shift();
		const normalCoverArticles = coverArticleList.filter(a => a.slug !== featuredCoverArticle?.slug).slice(0, 5);

		seenArticles.push(featuredCoverArticle?.slug ?? '');
		normalCoverArticles.forEach(a => seenArticles.push(a.slug));

		const coverArticles = {
			featured: featuredCoverArticle,
			normal: normalCoverArticles,
		};

		//Latest articles
		const latestArticles = await prisma.article.findMany({
			orderBy: { createdAt: 'desc' },
			where: { slug: { notIn: seenArticles }, visibleForUsers: true },
			take: 3,
			select: {
				category: {
					select: {
						name: true,
					},
				},
				title: true,
				slug: true,
				creator: {
					select: {
						name: true,
					},
				},
				createdAt: true,
				priority: true,
				readingTime: true,
				thumbnail: true,
			},
		});

		//Category articles
		const categoryArticles = await prisma.category.findMany({
			select: {
				name: true,
				Article: {
					where: { slug: { notIn: seenArticles }, visibleForUsers: true },
					select: {
						title: true,
						slug: true,
						creator: {
							select: {
								name: true,
							},
						},
						createdAt: true,
						priority: true,
						readingTime: true,
						thumbnail: true,
					},
					take: 3,
				},
			},
		});

		return {
			ok: true,
			articles: {
				coverArticles,
				latestArticles,
				categoryArticles: categoryArticles.filter(cArticle => cArticle.Article.length !== 0),
			},
		};
	} catch (error) {
		return {
			ok: false,
			message: 'Error while retrieving articles',
		};
	}
};
