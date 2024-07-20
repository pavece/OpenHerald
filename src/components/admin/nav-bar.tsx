'use client';

import React from 'react';
import { UserProfile } from './user-profile';
import { Button } from '../ui/button';
import { PiList } from 'react-icons/pi';
import { useAdminUiStore } from '@/stores/admin-ui-store';

export const NavBar = () => {
	const openSideMenu = useAdminUiStore(state => state.openSideMenu);

	return (
		<nav className='w-full flex justify-between items-center mb-6'>
			<div>
				<h2 className='text-xl md:text-2xl'>Welcome back John</h2>
				<p className='text-xs md:text-md text-zinc-500'>Lorem ipsum dolor, sit amet consectetur.</p>
			</div>
			<div>
				<UserProfile
					username='John Doe'
					role='Admin'
					avatar='/images/dev/test-image-1.jpg'
					className='hidden md:flex'
				/>
				<Button size='icon' variant='outline' className='flex md:hidden' onClick={openSideMenu}>
					<PiList size={28} />
				</Button>
			</div>
		</nav>
	);
};
