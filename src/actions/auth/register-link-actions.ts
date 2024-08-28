'use server';

import { auth } from '@/auth';
import prisma from '@/db/db';
import { addDays } from 'date-fns';

export const generateRegisterLink = async () => {
	try {
		const session = await auth();

		if (!session?.user.roles.includes('admin')) {
			return {
				ok: false,
				message: 'Unauthorized',
			};
		}

		const now = new Date();
		const validTilDate = addDays(now, 1);

		const registerAuth = await prisma.registerAuthorization.create({
			data: {
				validUntil: validTilDate,
			},
		});

		return {
			ok: true,
			link: process.env.NEXT_PUBLIC_SITE_LINK + '/auth/register/' + registerAuth.id,
		};
	} catch (error) {
		return {
			ok: false,
			message: 'An error occurred while generating the link.',
		};
	}
};

export const verifyLink = async (id: string) => {
	try {
		const registerAuth = await prisma.registerAuthorization.findUnique({ where: { id } });

		if (!registerAuth || registerAuth.used) {
			return {
				ok: false,
				message: 'Register link not valid, please request a new one.',
			};
		}

		const linkExpired = new Date() > new Date(registerAuth.validUntil);

		if (linkExpired) {
			return {
				ok: false,
				message: 'This registration link has expired, please request a new one.',
			};
		}

		return {
			ok: true,
			valid: true,
		};
	} catch (error) {
		return {
			ok: false,
			message: 'An error occurred while checking the link, try again later.',
		};
	}
};

export const markAsUsed = async (id: string) => {
	try {
		const checkLinkResult = await verifyLink(id);

		if (!checkLinkResult.ok) {
			return {
				ok: false,
				message: 'The link is not valid',
			};
		}

		await prisma.registerAuthorization.update({ where: { id }, data: { used: true } });

		return {
			ok: true,
			message: 'Marked as used',
		};
	} catch (error) {
		return {
			ok: false,
			message: 'An error occurred while trying to mark the link as used',
		};
	}
};

export const addGoogleMail = async (id: string, mail: string) => {
	try {
		await prisma.registerAuthorization.update({ where: { id }, data: { googleEmail: mail } });
		return {
			ok: true,
			message: 'Google mail added',
		};
	} catch (error) {
		return {
			ok: false,
			message: 'An error occurred while trying to add a google mail',
		};
	}
};
