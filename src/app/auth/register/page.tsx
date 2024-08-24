import { auth } from '@/auth';
import { RegisterForm } from '@/components/auth/register-form';
import prisma from '@/db/db';
import { redirect } from 'next/navigation';

export default async function RegisterRedirectPage() {
	const userCount = await prisma.user.count();

	if (await auth()) {
		redirect('/admin/dashboard');
	}

	if (userCount !== 0) {
		return redirect('/');
	}

	return (
		<>
			<div className='flex flex-col'>
				<RegisterForm linkId='first-user' firstTime />
			</div>
		</>
	);
}
