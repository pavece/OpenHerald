'use client';

import React, { useEffect, useState } from 'react';
import { UserProfile } from './user-profile';
import { Button } from '../ui/button';
import { PiList } from 'react-icons/pi';
import { useAdminUiStore } from '@/stores/admin-ui-store';
import { format } from 'date-fns';
import { getUserData } from '@/actions/auth/get-user-data';
import { useSession } from 'next-auth/react';

type userProps = {
	image?: string;
	roles?: string[];
	email?: string;
	name?: string;
};

export const NavBar = () => {
	const openSideMenu = useAdminUiStore(state => state.openSideMenu);
	const [user, setUser] = useState<userProps | null>(null);
	const session = useSession();

	useEffect(() => {
		const getUser = async () => {
			const user = await getUserData(session?.data?.user?.id ?? '');
			setUser(user.data as userProps);
		};

		if (session.status === 'authenticated') {
			getUser();
		}
	}, [session]);

	return (
		<nav className='w-full flex justify-between items-center mb-6'>
			<div>
				<h2 className='text-xl md:text-2xl'>Welcome back {user?.name} !</h2>
				<p className='text-xs md:text-base text-zinc-500'>{format(new Date(), 'EEEE dd, LLLL yyyy ')}</p>
			</div>
			<div>
				<UserProfile
					username={user?.name ?? ''}
					role={user?.roles![0] ?? ''}
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
