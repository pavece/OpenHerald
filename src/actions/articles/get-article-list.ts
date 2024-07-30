'use server';

import { auth } from '@/auth';
import prisma from '@/db/db';

export const getArticleList = async (all: boolean = false) => {
	const session = await auth();

	if (!session?.user) {
		return { ok: false, message: 'Not authenticated' };
	}

	if (all && !session.user.roles.includes('admin')) {
		return { ok: false, message: 'Cannot get all articles, not an admin' };
	}

	const articles = await prisma.article.findMany({
		select: {
			category: true,
			createdAt: true,
			creatorId: true,
			id: true,
			priority: true,
			visibleForUsers: true,
			title: true,
		},
	});

	return {
		ok: true,
		articles,
	};
};
