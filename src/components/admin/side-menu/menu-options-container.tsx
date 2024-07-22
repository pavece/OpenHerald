import React from 'react';
import {
	PiArticle,
	PiChartLine,
	PiFiles,
	PiGearFine,
	PiHandCoins,
	PiHouse,
	PiMegaphone,
	PiNotePencil,
	PiUsers,
} from 'react-icons/pi';
import { MenuItem } from './menu-item';
import { auth } from '@/auth';

type Props = {
	className?: string;
};

const options = [
	{
		icon: <PiHouse size={24} />,
		title: 'Dashboard',
		link: '/admin/dashboard',
		role: 'all',
	},
	{
		icon: <PiChartLine size={24} />,
		title: 'Metrics',
		link: '/admin/metrics',
		role: 'admin',
	},
	{
		icon: <PiUsers size={24} />,
		title: 'Accounts',
		link: '/admin/accounts',
		role: 'admin',
	},
	{
		icon: <PiArticle size={24} />,
		title: 'Your posts',
		link: '/admin/your-posts',
		role: 'all',
	},
	{
		icon: <PiFiles size={24} />,
		title: 'All posts',
		link: '/admin/posts',
		role: 'admin',
	},
	{
		icon: <PiNotePencil size={24} />,
		title: 'Publish',
		link: '/admin/publish',
		role: 'all',
	},
	{
		icon: <PiHandCoins size={24} />,
		title: 'ADS manager',
		link: '/admin/ad-manager',
		role: 'admin',
	},
	{
		icon: <PiMegaphone size={24} />,
		title: 'Banners',
		link: '/admin/banners',
		role: 'admin',
	},
	{
		icon: <PiGearFine size={24} />,
		title: 'Site config',
		link: '/admin/site-config',
		role: 'super-admin',
	},
];

export const MenuOptionsContainer = async ({ className }: Props) => {
	const session = await auth();
	const roles = session?.user?.roles;

	return (
		<div className={`flex flex-col gap-2 ${className}`}>
			{options.map(option => {
				if (roles?.includes(option.role) || option.role === 'all') {
					return (
						<MenuItem link={option.link} key={option.link}>
							{option.icon}
							<h4>{option.title}</h4>
						</MenuItem>
					);
				}
			})}
		</div>
	);
};
