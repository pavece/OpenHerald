'use client';
import { ColumnDef } from '@tanstack/react-table';
import clsx from 'clsx';

interface BannerTableColumn {
	id: string;
	text: string;
	textColor: string;
	bgColor: string;
	isActive: boolean;
}

export const columns: ColumnDef<BannerTableColumn>[] = [
	{
		accessorKey: 'id',
		header: 'Id',
		cell: ({ row }) => {
			const id = row.getValue('id') as string;
			return <div className='capitalize'>{id.split('-')[0]}...</div>;
		},
	},

	{
		accessorKey: 'text',
		header: 'Text',
	},
	{
		accessorKey: 'bgColor',
		header: 'Background color',
		cell: ({ row }) => {
			return (
				<div
					className='w-[40px] h-[20px] rounded-md'
					style={{
						backgroundColor: row.getValue('bgColor'),
					}}
				></div>
			);
		},
	},

	{
		accessorKey: 'textColor',
		header: 'Text color',
		cell: ({ row }) => {
			return (
				<div
					className='w-[40px] h-[20px] rounded-md'
					style={{
						backgroundColor: row.getValue('textColor'),
					}}
				></div>
			);
		},
	},

	{
		accessorKey: 'isActive',
		header: 'Is active',
		cell: ({ row }) => {
			const isActive = row.getValue('isActive') as boolean;
			return (
				<p className={clsx('', { 'text-yellow-500': !isActive, 'text-green-500': isActive })}>
					{isActive ? 'Yes' : 'No'}
				</p>
			);
		},
	},
];
