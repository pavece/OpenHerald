'use server';

import { auth } from '@/auth';
import { checkUser } from '../auth/check-user';
import prisma from '@/db/db';
import { addDays, startOfDay } from 'date-fns';

export const buildDashboard = async () => {
	try {
		const session = await auth();

		if (!session) {
			return {
				ok: false,
				message: 'unauthenticated',
			};
		}

		const userFromDb = await checkUser(session.user.id);

		if (userFromDb.user?.banned) {
			return {
				ok: false,
				message: 'unauthorized',
			};
		}

		const today = startOfDay(new Date());
		const tomorrow = addDays(today, 1);

		const newArticlesToday = await prisma.article.count({
			where: {
				createdAt: { lte: tomorrow, gte: today },
			},
		});

		const totalArticles = await prisma.article.count();

		if (userFromDb.user?.roles.includes('admin')) {
			const editorCount = await prisma.user.count();
			const topEditorCount = await prisma.article.groupBy({
				by: ['creatorId'],
				_count: {
					creatorId: true,
				},
				orderBy: {
					_count: {
						creatorId: 'desc',
					},
				},
				take: 1,
			});

			const topEditor = await prisma.user.findUnique({
				where: {
					id: topEditorCount[0].creatorId,
				},
			});

			return {
				ok: true,
				type: 'admin',
				dashboard: {
					newArticlesToday,
					totalArticles,
					editorCount,
					topEditor: topEditor?.name,
				},
			};
		}

		const yourArticles = await prisma.article.count({ where: { creatorId: session.user.id } });

		return {
			ok: true,
			type: 'editor',
			dashboard: {
				newArticlesToday,
				totalArticles,
				yourArticles,
			},
		};
	} catch (error) {
		console.log(error);
		return {
			ok: false,
			message: 'Unknown error while retrieving dashboard information.',
		};
	}
};
