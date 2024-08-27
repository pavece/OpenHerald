import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { LoginForm } from '../../../components/auth/login-form';

export const metadata = {
	title: 'Login',
	og: {
		title: 'Login',
	},
	twitter: {
		title: 'Login',
	},
};

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
