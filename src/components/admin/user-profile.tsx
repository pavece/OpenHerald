import React from 'react';
import { Avatar } from '../ui/avatar';
import { PiCaretDown } from 'react-icons/pi';

type Props = {
	username: string;
	role: string;
	avatar: string;
	className?: string;
};

export const UserProfile = ({ username, role, avatar, className }: Props) => {
	return (
		<div className={`flex items-center gap-2 cursor-pointer ${className}`}>
			<div>
				<Avatar className='w-[50px] h-[50px]' url={avatar} />
			</div>
			<div>
				<h4>{username}</h4>
				<p className='text-sm text-zinc-500'>{role}</p>
			</div>
			<div className='ml-4'>
				<button>
					<PiCaretDown size={28} />
				</button>
			</div>
		</div>
	);
};
