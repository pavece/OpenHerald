'use server';
import { nanoid } from 'nanoid';
import prisma from '@/db/db';

export const generateArticleSlug = async (title: string) => {
	const slug = title.toLowerCase().trim().split(' ').join('-');

	const articleWithSameSlug = await prisma.article.findFirst({ where: { slug } });

	if (!articleWithSameSlug) {
		return slug;
	}

	return slug + '-' + nanoid();
};
