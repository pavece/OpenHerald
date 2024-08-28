'use server';

import { auth } from '@/auth';
import { checkUser } from '../auth/check-user';
import prisma from '@/db/db';
import { revalidatePath } from 'next/cache';

export interface ISiteConfig {
	siteName: string;
	siteDescription: string;
	navbarCategories: string[];
	mainPageCategories: string[];
}

export const updateSiteConfig = async (formData: ISiteConfig) => {
	try {
		const session = await auth();

		if (!session) {
			return {
				ok: false,
				message: 'Unauthenticated',
			};
		}

		const userFromDb = await checkUser(session.user.id);

		if (!userFromDb.user?.roles.includes('super-admin')) {
			return {
				ok: false,
				message: 'Not authorized',
			};
		}

		const existingConfig = await prisma.siteConfig.findFirst();

		if (!existingConfig) {
			const updated = await prisma.siteConfig.create({ data: { ...formData } });
			return {
				ok: true,
				updated,
			};
		}

		const updated = await prisma.siteConfig.update({
			where: {
				id: existingConfig?.id,
			},
			data: {
				...formData,
			},
		});

		revalidatePath('/', "layout");
		revalidatePath('/admin', 'layout');
		revalidatePath('/auth', 'layout');
		return {
			ok: true,
			updated,
		};
	} catch (error) {
		console.log(error);
		return {
			ok: false,
			message: 'Unknown error while updating the site configuration.',
		};
	}
};
