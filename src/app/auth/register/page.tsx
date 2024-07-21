import { createUser } from '@/actions/auth/register-user';

export default async function RegisterPage() {
	const u = await createUser('Pablo', 'pablo@pablo.com', '123');

	return (
		<div>
			<h1>Hello Page</h1>
		</div>
	);
}
