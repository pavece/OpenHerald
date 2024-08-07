import { NavBar } from '@/components/admin/nav-bar';
import { ConfigureProfileForm } from './self-configure-profile-form';
import { getUserById } from '@/actions/profile-config/get-user-by-id';
import { auth } from '@/auth';
import { notFound } from 'next/navigation';

export default async function NamePage() {
	const session = await auth();
	const { ok, user } = await getUserById(session?.user.id!);

	if (!ok) {
		return notFound();
	}

	return (
		<div>
			<NavBar className='hidden md:flex mb-4' title='Profile config' subtitle='Update your profile' />
			<div className='md:hidden'>
				<h1 className='text-xl'>Profile config</h1>
				<p className='text-zinc-500'>Configure your profile</p>
			</div>

			<div className='w-full flex justify-center'>
				<div className='w-full max-w-[700px]'>
					<ConfigureProfileForm user={user!} />
				</div>
			</div>
		</div>
	);
}
