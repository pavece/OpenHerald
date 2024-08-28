'use server';

import { auth } from '@/auth';
import { checkUser } from '../auth/check-user';
import prisma from '@/db/db';
import { revalidatePath } from 'next/cache';

type FormValues = {
	text: string;
	bgColor: string;
	textColor: string;
	showIcon: boolean;
};

export const createBanner = async (formValues: FormValues) => {
	try {
		const session = await auth();

		if (!session?.user) {
			return {
				ok: false,
				message: 'Unauthenticated.',
			};
		}

		const userCheckFromDb = await checkUser(session.user.id);

		if (!userCheckFromDb.user?.roles.includes('admin') || userCheckFromDb.user?.banned) {
			return {
				ok: false,
				message: 'Not authorized.',
			};
		}

		//Set every banner as not active
		await prisma.banner.updateMany({
			data: {
				isActive: false,
			},
		});

		//Create banner
		await prisma.banner.create({
			data: {
				...formValues,
				isActive: true,
			},
		});

		revalidatePath('/');
		return {
			ok: true,
			message: 'Banner created.',
		};
	} catch (error) {
		console.log(error);
		return {
			ok: false,
			message: 'Unknown error while creating the banner.',
		};
	}
};
