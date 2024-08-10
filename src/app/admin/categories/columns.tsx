'use client';
import { ColumnDef } from '@tanstack/react-table';

interface CategoryTableColumn {
	name: string;
	id: string;
}

export const columns: ColumnDef<CategoryTableColumn>[] = [
	{
		accessorKey: 'id',
		header: 'Id',
		cell: ({ row }) => {
			const id = row.getValue('id') as string;
			return <div className='capitalize'>{id.split('-')[0]}...</div>;
		},
	},

	{
		accessorKey: 'name',
		header: 'Name',
	},
];
