import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { LoginForm } from '../../../components/auth/login-form';

export default async function LoginPage() {
	if (await auth()) {
		redirect('/admin');
	}

	return (
		<>
			<LoginForm />
		</>
	);
}
