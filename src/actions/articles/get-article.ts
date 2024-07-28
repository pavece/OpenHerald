'use server';

import prisma from '@/db/db';

export const getArticle = async (id: string) => {
	try {
		const result = await prisma.article.findUnique({ where: { id } });
		if (!result) {
			return { ok: false, notFound: true };
		}

		return { ok: true, article: result };
	} catch (error) {
		return {
			ok: false,
			notFount: false,
			message: 'An error ocurred while trying to find an article',
		};
	}
};
