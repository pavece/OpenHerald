'use client';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import { ColumnDef } from '@tanstack/react-table';
import { PiArrowsDownUp, PiCheck, PiDotsThree, PiEye, PiEyeSlash, PiProhibit } from 'react-icons/pi';

import Link from 'next/link';
import clsx from 'clsx';

type UserTableRow = {
	id: string;
	name: string | null;
	email: string;
	roles: string[];
	banned: boolean;
	image: string | null;
	createdAt: Date;
};

export const columns: ColumnDef<UserTableRow>[] = [
	{
		accessorKey: 'id',
		header: 'Id',
		cell: ({ row }) => {
			const id = row.getValue('id') as string;
			return <div>{id.split('-')[0]}...</div>;
		},
	},

	{
		accessorKey: 'name',
		header: ({ column }) => {
			return (
				<Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')} className='p-2'>
					Username <PiArrowsDownUp size={22} className='ml-2' />
				</Button>
			);
		},
		cell: ({ row }) => {
			const name = row.getValue('name') as string;
			return <div className='px-2'>{name}</div>;
		},
	},

	{
		accessorKey: 'email',
		header: ({ column }) => {
			return (
				<Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')} className='p-2'>
					E-mail <PiArrowsDownUp size={22} className='ml-2' />
				</Button>
			);
		},
		cell: ({ row }) => {
			const email = row.getValue('email') as string;
			return <div className='px-2'>{email}</div>;
		},
	},

	{
		accessorKey: 'roles',
		header: ({ column }) => {
			return (
				<Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')} className='p-2'>
					Role <PiArrowsDownUp size={22} className='ml-2' />
				</Button>
			);
		},
		cell: ({ row }) => {
			const role = (row.getValue('roles') as String[])[0];

			return <div className='px-2 capitalize'>{role}</div>;
		},
	},

	{
		accessorKey: 'banned',
		header: 'Banned',
		cell: ({ row }) => {
			const banned = row.getValue('banned');
			const bannedDescriptive = banned ? 'Yes' : 'No';
			const icon = banned ? <PiProhibit size={22} /> : <PiCheck size={22} />;

			return (
				<div
					className={clsx('px-2 capitalize flex items-center gap-2', {
						'text-red-500': banned,
						'text-green-500': !banned,
					})}
				>
					{icon}
					{bannedDescriptive}
				</div>
			);
		},
	},

	{
		id: 'actions',
		cell: ({ row }) => {
			const userId = row.getValue('id') as string;

			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant='ghost' className='h-8 w-8 p-0'>
							<span className='sr-only'>Open menu</span>
							<PiDotsThree size={28} />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuLabel>Actions</DropdownMenuLabel>
						<Link href={`/admin/profile/config/${userId}`}>
							<DropdownMenuItem>Edit</DropdownMenuItem>
						</Link>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];
