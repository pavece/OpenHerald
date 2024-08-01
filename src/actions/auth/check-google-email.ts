'use server';

import prisma from '@/db/db';

export const checkGoogleMail = async (email: string) => {
	try {
		const emailInUsers = await prisma.user.findFirst({ where: { email } });
		const emailInRegisterAuth = await prisma.registerAuthorization.findFirst({ where: { googleEmail: email } });

		return {
			ok: true,
			inUsers: !!emailInUsers,
			emailInRegister: emailInRegisterAuth?.id ?? false,
		};
	} catch (error) {
		return {
			ok: false,
		};
	}
};
