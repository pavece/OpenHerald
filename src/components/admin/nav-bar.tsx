'use client';

import { UserProfile } from './user-profile';
import { Button } from '../ui/button';
import { PiList } from 'react-icons/pi';
import { useAdminUiStore } from '@/stores/admin-ui-store';
import { format } from 'date-fns';
import { useSession } from 'next-auth/react';

export const NavBar = () => {
	const openSideMenu = useAdminUiStore(state => state.openSideMenu);
	const session = useSession();

	const user = session.data?.user;

	console.log(user);

	return (
		<nav className='w-full flex justify-between items-center mb-6'>
			<div>
				<h2 className='text-xl md:text-2xl'>Welcome back {user?.name ?? 'John Doe'} !</h2>
				<p className='text-xs md:text-base text-zinc-500'>{format(new Date(), 'EEEE dd, LLLL yyyy ')}</p>
			</div>
			<div>
				<UserProfile
					username={user?.name ?? 'John Doe'}
					role={user?.roles![0] ?? 'Editor'}
					avatar={user?.image ?? '/images/avatar-placeholder.png'}
					className='hidden md:flex'
				/>
				<Button size='icon' variant='outline' className='flex md:hidden' onClick={openSideMenu}>
					<PiList size={28} />
				</Button>
			</div>
		</nav>
	);
};
