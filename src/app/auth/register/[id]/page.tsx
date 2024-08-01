import { verifyLink } from '@/actions/auth/register-link-actions';
import { auth } from '@/auth';
import { RegisterForm } from '@/components/auth/register-form';
import { redirect } from 'next/navigation';

type Props = {
	params: {
		id: string;
	};
};

export default async function RegisterPage({ params: { id } }: Props) {
	if (await auth()) {
		redirect('/admin');
	}

	const checkLinkResult = await verifyLink(id);

	if (!checkLinkResult.ok) {
		return (
			<div>
				<h1>TODO: ERROR</h1>
			</div>
		);
	}

	return (
		<div>
			<RegisterForm linkId={id} />
		</div>
	);
}
