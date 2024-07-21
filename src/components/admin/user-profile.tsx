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
					<div>
						<Avatar className='w-[45px] h-[45px]' url={avatar} />
					</div>
					<div>
						<h4>{username}</h4>
						<p className='text-sm text-zinc-500 capitalize'>{role}</p>
					</div>
					<div className='ml-4'>
						<span>
							<PiCaretDown size={28} />
						</span>
					</div>
				</div>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuLabel>My Account</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem>
					<PiGearFine size={18} className='mr-2' /> Config
				</DropdownMenuItem>
				<DropdownMenuItem className='text-red-500 focus:text-red-600' onClick={logout}>
					<PiSignOut size={18} className='mr-2' /> Log-out
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
