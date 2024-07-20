import React from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { Input } from '../../ui/input';
import { PiMagnifyingGlass } from 'react-icons/pi';
import { MenuOptionsContainer } from './menu-options-container';

type Props = {
	className?: string;
};

export const SideMenu = ({ className }: Props) => {
	return (
		<nav className={'p-4 ' + className}>
			<div className=''>
				<Link href='/admin'>
					<Image src='/images/logo.svg' alt='OpenHerald Logo' width={300} height={80} />
				</Link>
			</div>
			<div className='pt-6 pb-3'>
				<form action=''>
					<Input placeholder='search' icon={PiMagnifyingGlass} />
				</form>
			</div>
			<MenuOptionsContainer />
		</nav>
	);
};
