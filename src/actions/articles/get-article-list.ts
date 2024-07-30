'use server';

import { auth } from '@/auth';
import prisma from '@/db/db';

export const getArticleList = async (all: boolean = false) => {
	try {
		const session = await auth();

		if (!session?.user) {
			return { ok: false, message: 'Not authenticated' };
		}

		if (all && !session.user.roles.includes('admin')) {
			return { ok: false, message: 'Cannot get all articles, not an admin' };
		}

		let articles = [];

		if (all) {
			articles = await prisma.article.findMany({
				select: {
					category: true,
					createdAt: true,
					creatorId: true,
					id: true,
					priority: true,
					visibleForUsers: true,
					title: true,
					creator: {
						select: {
							name: true,
						},
					},
				},
			});
		} else {
			articles = await prisma.article.findMany({
				where: {
					creatorId: session.user.id,
				},
				select: {
					category: true,
					createdAt: true,
					creatorId: true,
					id: true,
					priority: true,
					visibleForUsers: true,
					title: true,
					creator: {
						select: {
							name: true,
						},
					},
				},
			});
		}

		return {
			ok: true,
			articles: articles.map(({ creator, ...article }) => ({ creatorName: creator.name!, ...article })),
		};
	} catch (error) {
		return {
			ok: false,
			message: 'Something went wrong while retrieving the articles from the database',
		};
	}
};
