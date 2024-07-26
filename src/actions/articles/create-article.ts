'use server';

import { auth } from '@/auth';
import prisma from '@/db/db';
import { IArticle } from '@/interfaces/article.interface';

export const createArticle = async (article: IArticle) => {
	const session = await auth();
	const { verticalAds, ...rest } = article;
	const verticalAdsOption = verticalAds.toString().toUpperCase() as 'NONE' | 'LEFT' | 'RIGHT';

	//TODO: Upload thumbnail

	try {
		const creator = await prisma.user.findUnique({ where: { id: session?.user.id } });

		if (creator && creator?.banned) {
			return {
				ok: false,
				banned: true,
				message: 'The creator is banned',
			};
		}

		const result = await prisma.article.create({
			data: { verticalAds: verticalAdsOption, creatorId: creator!.id, ...rest },
		});

		return {
			ok: true,
			article: result,
		};
	} catch (error) {
		return {
			ok: false,
			message: 'An error occurred while trying to create a new article',
		};
	}
};
