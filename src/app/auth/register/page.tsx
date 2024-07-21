import { auth } from '@/auth';
import { RegisterForm } from '@/components/auth/register-form';
import { redirect } from 'next/navigation';

export default async function RegisterPage() {
	if (await auth()) {
		redirect('/admin');
	}

	return (
		<div>
			<RegisterForm />
		</div>
	);
}
