import { verifyLink } from '@/actions/auth/register-link-actions';
import { auth } from '@/auth';
import { RegisterForm } from '@/components/auth/register-form';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { redirect } from 'next/navigation';
import { PiWarning } from 'react-icons/pi';

type Props = {
	params: {
		id: string;
	};
};

export const metadata = {
	title: 'Register',
	og: {
		title: 'Register',
	},
	twitter: {
		title: 'Register',
	},
};

export default async function RegisterPage({ params: { id } }: Props) {
	if (await auth()) {
		redirect('/admin');
	}

	const checkLinkResult = await verifyLink(id);

	if (!checkLinkResult.ok) {
		return (
			<div className='px-4'>
				<h1 className='text-red-500 text-2xl mb-4'>Login error</h1>
				<Alert className='max-w-[500px]' variant='destructive'>
					<PiWarning size={20} />
					<AlertTitle>Error</AlertTitle>
					<AlertDescription>{checkLinkResult.message}</AlertDescription>
				</Alert>
			</div>
		);
	}

	return (
		<div>
			<RegisterForm linkId={id} />
		</div>
	);
}
