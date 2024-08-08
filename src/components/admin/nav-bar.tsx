'use client';

import { UserProfile } from './user-profile';
import { Button } from '../ui/button';
import { PiList } from 'react-icons/pi';
import { useAdminUiStore } from '@/stores/admin-ui-store';
import { format } from 'date-fns';
import { useSession } from 'next-auth/react';

type Props = {
	className?: string;
	title?: string;
	subtitle?: string;
};

export const NavBar = ({ className, title, subtitle }: Props) => {
	const openSideMenu = useAdminUiStore(state => state.openSideMenu);
	const session = useSession();
	const user = session.data?.user;

	return (
		<nav className={`${className} w-full flex justify-between items-center`}>
			<Button size='icon' variant='outline' className='flex md:hidden' onClick={openSideMenu}>
				<PiList size={28} />
			</Button>

			<div>
				<div className='hidden md:block'>
					<h2 className='text-xl md:text-2xl'>{title ?? `Welcome back ${user?.name} !`} </h2>
					<p className='text-xs md:text-base text-zinc-500'>{subtitle ?? format(new Date(), 'EEEE dd, LLLL yyyy ')}</p>
				</div>
			</div>

			<div className=''>
				<UserProfile
					username={user?.name ?? 'John Doe'}
					role={user?.roles![0] ?? 'Editor'}
					avatar={user?.image|| '/images/user-fallback.png'}
				/>
			</div>
		</nav>
	);
};
