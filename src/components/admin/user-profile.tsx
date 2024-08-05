import React from 'react';
import { Avatar } from '../ui/avatar';
import { PiCaretDown, PiGearFine, PiSignOut } from 'react-icons/pi';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { signOut } from 'next-auth/react';
import Link from 'next/link';

type Props = {
	username: string;
	role: string;
	avatar: string;
	className?: string;
};

export const UserProfile = ({ username, role, avatar, className }: Props) => {
	const logout = async () => {
		await signOut();
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<div className={`flex items-center gap-2 cursor-pointer ${className}`}>
					<div className='md:mr-2 pt-2'>
						<Avatar className='h-[50px] rounded-full' url={avatar} />
					</div>

					<div className='text-start hidden md:block'>
						<h4>{username}</h4>
						<p className='text-sm text-zinc-500 capitalize'>{role}</p>
					</div>
					<div className='ml-4 hidden md:block'>
						<span>
							<PiCaretDown size={28} />
						</span>
					</div>
				</div>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuLabel>My Account</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<Link href={'/admin/profile/config'}>
					<DropdownMenuItem className='cursor-pointer'>
						<PiGearFine size={18} className='mr-2' /> Config
					</DropdownMenuItem>
				</Link>
				<DropdownMenuItem className='text-red-500 focus:text-red-600 cursor-pointer' onClick={logout}>
					<PiSignOut size={18} className='mr-2' /> Log-out
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
