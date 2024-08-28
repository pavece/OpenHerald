'use server';

import prisma from '@/db/db';
import { IArticle } from '@/interfaces/article.interface';
import { uploadImage } from '../images/upload-image';
import { auth } from '@/auth';
import { revalidatePath } from 'next/cache';

export const updateArticle = async (articleId: string, article: Partial<IArticle>, thumbnailFormData?: FormData) => {
	try {
		const session = await auth();

		if (!session?.user) {
			return {
				ok: false,
				message: 'No session',
			};
		}

		const articleFromDb = await prisma.article.findUnique({ where: { id: articleId } });
		const userFromDb = await prisma.user.findUnique({ where: { id: session.user.id } });

		if (userFromDb?.banned) {
			return {
				ok: false,
				banned: true,
				message: 'User is banned',
			};
		}

		if (session.user.id !== articleFromDb?.creatorId && !userFromDb?.roles.includes('admin')) {
			return {
				ok: false,
				message: 'Only the article author and admins can edit articles',
			};
		}

		const { thumbnail: _, verticalAds, category, ...rest } = article;

		const verticalAdsOption = verticalAds?.toString().toUpperCase() as 'NONE' | 'LEFT' | 'RIGHT';
		const updateProps = {
			verticalAds: verticalAdsOption,
			thumbnail: articleFromDb?.thumbnail,
			categoryId: category,
			...rest,
		};

		if (thumbnailFormData) {
			const image = thumbnailFormData.get('image') as File;
			updateProps.thumbnail = await uploadImage(image);
		}

		const result = await prisma.article.update({
			where: { id: articleId },
			data: { ...updateProps },
		});

		revalidatePath(`/article/${result.slug}`);
		revalidatePath('/');
		revalidatePath('/admin/articles');

		return {
			ok: true,
			article: result,
		};
	} catch (error) {
		return {
			ok: false,
			message: 'An error ocurred while updating the article',
		};
	}
};
