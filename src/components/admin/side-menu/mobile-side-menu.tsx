'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React from 'react';
import { PiMagnifyingGlass, PiX } from 'react-icons/pi';
import { MenuOptionsContainer } from './menu-options-container';
import { Input } from '@/components/ui/input';
import { useAdminUiStore } from '@/stores/admin-ui-store';

export const MobileSideMenu = () => {
	const { isSideMenuOpen, closeSideMenu } = useAdminUiStore();

	if (!isSideMenuOpen) {
		return null;
	}

	return (
		<div className='w-full h-screen absolute top-0 left-0 side-fade md:hidden z-30'>
			<div className='bg-white w-full h-full'>
				<div className='flex justify-between items-center p-4'>
					<Image src={'/images/logo.svg'} alt='OpenHerald logo' width={180} height={60} />
					<Button variant='outline' size='icon' onClick={closeSideMenu}>
						<PiX size={24} />
					</Button>
				</div>
				<div className='p-4'>
					<form action=''>
						<Input placeholder='search' icon={PiMagnifyingGlass} />
					</form>
				</div>
				<div className='px-4'>
					<MenuOptionsContainer />
				</div>
			</div>
		</div>
	);
};
