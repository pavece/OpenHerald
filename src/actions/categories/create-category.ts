'use server';

import { auth } from '@/auth';
import { checkUser } from '../auth/check-user';
import prisma from '@/db/db';

interface CreateCategoryFormFields {
	name: string;
	description?: string;
}

export const createCategory = async (data: CreateCategoryFormFields) => {
	try {
		const session = await auth();
		const userDbCheck = await checkUser(session?.user.id ?? '');

		if (!userDbCheck.ok) {
			return {
				ok: false,
				message: 'Not allowed',
			};
		}

		if (userDbCheck.user?.banned || !userDbCheck.user?.roles.includes('admin')) {
			return {
				ok: false,
				message: 'Not allowed',
			};
		}

		const newCategory = await prisma.category.create({ data });

		return {
			ok: true,
			category: newCategory,
		};
	} catch (error) {
		return {
			ok: false,
			message: 'Unexpected error',
		};
	}
};
