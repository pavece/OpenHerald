'use server';
import { nanoid } from 'nanoid';
import prisma from '@/db/db';

export const generateArticleSlug = async (title: string) => {
	const slug = title
		.toString()
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.toLowerCase()
		.trim()
		.replace(/[^a-z0-9 ]/g, '')
		.replace(/\s+/g, '-');

	const articleWithSameSlug = await prisma.article.findFirst({ where: { slug } });

	if (!articleWithSameSlug) {
		return slug;
	}

	return slug + '-' + nanoid();
};
