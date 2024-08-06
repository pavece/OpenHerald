import { NavBar } from '@/components/admin/nav-bar';
import { ProfileConfigFormFields } from '@/components/admin/user-profile/profile-config-formfields';
import { ConfigureProfileForm } from './configure-profile-form';

export default function NamePage() {
	return (
		<div>
			<NavBar className='hidden md:flex mb-4' title='Profile config' subtitle='Update your profile' />
			<div className='md:hidden'>
				<h1 className='text-xl'>Profile config</h1>
				<p className='text-zinc-500'>Configure your profile</p>
			</div>

			<div className='w-full flex justify-center'>
				<div className='w-full max-w-[700px]'>
					<ConfigureProfileForm />
				</div>
			</div>
		</div>
	);
}
