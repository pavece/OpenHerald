import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React from 'react';
import { PiMagnifyingGlass, PiX } from 'react-icons/pi';
import { MenuOptionsContainer } from './menu-options-container';
import { Input } from '@/components/ui/input';

export const MobileSideMenu = () => {
	return (
		<div className='w-full h-screen absolute top-0 left-0 side-fade md:hidden '>
			<div className='bg-white w-full h-full'>
				<div className='flex justify-between items-center p-4'>
					<Image src={'/images/logo.svg'} alt='OpenHerald logo' width={180} height={60} />
					<Button variant='outline' size='icon'>
						<PiX size={24} />
					</Button>
				</div>
				<div className='p-4'>
					<form action=''>
						<Input placeholder='search' icon={PiMagnifyingGlass} />
					</form>
				</div>
				<MenuOptionsContainer />
			</div>
		</div>
	);
};
