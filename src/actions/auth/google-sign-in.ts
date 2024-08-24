'use server';

import { signIn } from '@/auth';

export const googleSignIn = async () => {
	await signIn('google', { redirect: true, redirectTo: '/admin/dashboard' });
};
