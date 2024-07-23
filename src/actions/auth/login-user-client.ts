'use server';

import { signIn } from '@/auth';

type formData = {
	email: string;
	password: string;
};

export const loginUserClient = async (formData: formData) => {
	await signIn('credentials', {
		redirect: false,
		...formData,
	});
};
