'use server';

import prisma from '@/db/db';
import { addDays } from 'date-fns';

export const generateRegisterLink = async () => {
	try {
		const now = new Date();
		const validTilDate = addDays(now, 1);

		const registerAuth = await prisma.registerAuthorization.create({
			data: {
				validUntil: validTilDate,
			},
		});

		return {
			ok: true,
			link: process.env.SITE_LINK + "/auth/register/" + registerAuth.id,
		};
	} catch (error) {
		return {
			ok: false,
			message: 'An error occurred while generating the link.',
		};
	}
};
