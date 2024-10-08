'use server';

import { auth } from '@/auth';
import prisma from '@/db/db';
import { IArticle } from '@/interfaces/article.interface';
import { uploadImage } from '../images/upload-image';
import { generateArticleSlug } from './generate-slug';
import { revalidatePath } from 'next/cache';

export const createArticle = async (article: IArticle, imageFormData: FormData) => {
	const session = await auth();
	const { verticalAds, thumbnail, category, ...rest } = article;
	const verticalAdsOption = verticalAds.toString().toUpperCase() as 'NONE' | 'LEFT' | 'RIGHT';

	try {
		if (!session?.user.id) {
			return {
				ok: false,
				message: 'Not allowed to create posts',
			};
		}

		const creator = await prisma.user.findUnique({ where: { id: session?.user.id } });

		if (creator && creator?.banned) {
			return {
				ok: false,
				banned: true,
				message: 'The creator is banned',
			};
		}
		const image = imageFormData.get('thumbnail') as File;
		const thumbnailUrl = await uploadImage(image);

		const slug = await generateArticleSlug(article.title);

		const result = await prisma.article.create({
			data: {
				slug,
				categoryId: category,
				creatorId: creator!.id,
				verticalAds: verticalAdsOption,
				thumbnail: thumbnailUrl,
				...rest,
			},
		});

		revalidatePath('/');
		revalidatePath('/admin/articles');
		return {
			ok: true,
			article: result,
		};
	} catch (error) {
		console.log(error);
		return {
			ok: false,
			message: 'An error occurred while trying to create a new article',
		};
	}
};
