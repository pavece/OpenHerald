import { getUserById } from '@/actions/profile-config/get-user-by-id';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { ConfigureProfileForm } from './admin-configure-profile-form';
import { NavBar } from '@/components/admin/nav-bar';

type Props = {
	params: {
		id: string;
	};
};

export default async function AdminProfileEditPage({ params: { id } }: Props) {
	const session = await auth();

	if (session?.user.id === id) {
		redirect('/admin/users');
	}

	const { ok, message, user } = await getUserById(id);

	if (!ok) {
		return <h1>{message}</h1>;
	}

	return (
		<div>
			<NavBar className='hidden md:flex mb-4' title='Profile config' subtitle={`Configure ${user?.name}'s profile`} />
			<div className='md:hidden'>
				<h1 className='text-xl'>Profile config</h1>
				<p className='text-zinc-500'>Configure {user?.name + " 's"} profile</p>
			</div>

			<div className='w-full flex justify-center'>
				<div className='w-full max-w-[700px]'>
					<ConfigureProfileForm user={user!} userId={id} />
				</div>
			</div>
		</div>
	);
}
