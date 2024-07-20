import React from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { Input } from '../../ui/input';
import {
	PiArticle,
	PiChartLine,
	PiFiles,
	PiGearFine,
	PiHandCoins,
	PiHouse,
	PiMagnifyingGlass,
	PiMegaphone,
	PiNotePencil,
	PiUsers,
} from 'react-icons/pi';
import { MenuItem } from './menu-item';
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
			<div className='flex flex-col gap-2'>
				<MenuItem link='/admin/dashboard'>
					<PiHouse size={24} />
					<h4>Dashboard</h4>
				</MenuItem>
				<MenuItem link='/admin/metrics'>
					<PiChartLine size={24} />
					<h4>Metrics</h4>
				</MenuItem>
				<MenuItem link='/admin/accounts'>
					<PiUsers size={24} />
					<h4>Accounts</h4>
				</MenuItem>
				<MenuItem link='/admin/your-posts'>
					<PiArticle size={24} />
					<h4>Your posts</h4>
				</MenuItem>
				<MenuItem link='/admin/posts'>
					<PiFiles size={24} />
					<h4>All posts</h4>
				</MenuItem>
				<MenuItem link='/admin/publish'>
					<PiNotePencil size={24} />
					<h4>Publish</h4>
				</MenuItem>
				<MenuItem link='/admin/ad-manager'>
					<PiHandCoins size={24} />
					<h4>ADS manager</h4>
				</MenuItem>
				<MenuItem link='/admin/banners'>
					<PiMegaphone size={24} />
					<h4>Banners</h4>
				</MenuItem>
				<MenuItem link='/admin/config'>
					<PiGearFine size={24} />
					<h4>Site config</h4>
				</MenuItem>
			</div>
		</nav>
	);
};
