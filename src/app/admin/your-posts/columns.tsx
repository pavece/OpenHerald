'use client';

import { EArticlePriority } from '@/interfaces/article.interface';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import { ColumnDef } from '@tanstack/react-table';
import { PiArrowsDownUp, PiDotsThree, PiEye, PiEyeSlash } from 'react-icons/pi';

import Link from 'next/link';
import { cropText } from '@/lib/utils';

export type ArticleTableRow = {
	category: string;
	createdAt: Date;
	creatorId: string;
	id: string;
	priority: number;
	visibleForUsers: boolean;
	title: string;
	creatorName: string;
};

export const columns: ColumnDef<ArticleTableRow>[] = [
	{
		accessorKey: 'id',
		header: 'ID',
		cell: ({ row }) => {
			const id = row.getValue('id') as string;
			return <div className='capitalize'>{id.split('-')[0]}...</div>;
		},
	},
	{
		accessorKey: 'title',
		header: 'Title',
		cell: ({ row }) => {
			const title = row.getValue('title') as string;
			return <div className=''>{cropText(title, 60)}</div>;
		},
	},
	{
		accessorKey: 'category',
		header: ({ column }) => {
			return (
				<Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')} className='p-2'>
					Category <PiArrowsDownUp size={22} className='ml-2' />
				</Button>
			);
		},
		cell: ({ row }) => {
			return <div className='capitalize px-2'>{row.getValue('category')}</div>;
		},
	},

	{
		accessorKey: 'priority',
		header: ({ column }) => {
			return (
				<Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')} className='p-2'>
					Priority <PiArrowsDownUp size={22} className='ml-2' />
				</Button>
			);
		},
		cell: ({ row }) => {
			const parsedPriority = EArticlePriority[(row.getValue('priority') as number) - 1];
			return (
				<div className='capitalize px-2'>
					({row.getValue('priority')}) {parsedPriority}
				</div>
			);
		},
	},
	{
		accessorKey: 'visibleForUsers',
		header: ({ column }) => {
			return (
				<Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')} className='p-2'>
					Visible for users <PiArrowsDownUp size={22} className='ml-2' />
				</Button>
			);
		},
		cell: ({ row }) => {
			const parsedVisibility = (row.getValue('visibleForUsers') as boolean) ? 'Yes' : 'No';
			const icon = (row.getValue('visibleForUsers') as boolean) ? <PiEye size={22} /> : <PiEyeSlash size={22} />;

			return (
				<div className='capitalize flex items-center gap-2 px-d'>
					{icon}
					{parsedVisibility}
				</div>
			);
		},
	},
	{
		id: 'actions',
		cell: ({ row }) => {
			const articleId = row.getValue('id') as string;

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
						<DropdownMenuItem>
							<Link href={`/article/${articleId}`}>View</Link>
						</DropdownMenuItem>
						<DropdownMenuItem>
							<Link href={`/admin/article/edit/${articleId}`}>Edit</Link>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];
