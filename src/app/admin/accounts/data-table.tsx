'use client';

import * as React from 'react';

import {
	ColumnDef,
	getCoreRowModel,
	useReactTable,
	SortingState,
	getSortedRowModel,
	getFilteredRowModel,
	ColumnFiltersState,
} from '@tanstack/react-table';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { DataTableBase } from '@/components/ui/data-table-base';
import { UserPlus } from 'lucide-react';
import Link from 'next/link';

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
	filterBy?: string;
}

export function AccountsDataTable<TData, TValue>({ columns, data, filterBy }: DataTableProps<TData, TValue>) {
	const [sorting, setSorting] = React.useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		onSortingChange: setSorting,
		getSortedRowModel: getSortedRowModel(),
		onColumnFiltersChange: setColumnFilters,
		getFilteredRowModel: getFilteredRowModel(),
		state: {
			sorting,
			columnFilters,
		},
	});

	return (
		<div>
			{filterBy && (
				<div className='flex items-center py-4 gap-2'>
					<Input
						placeholder={`Filter by ${filterBy}...`}
						value={(table.getColumn(filterBy!)?.getFilterValue() as string) ?? ''}
						onChange={event => table.getColumn(filterBy!)?.setFilterValue(event.target.value)}
						className='max-w-sm'
					/>
					<Button variant='outline' asChild>
						<Link href={'/admin/accounts/new'}>
							<UserPlus size={24} className='mr-2' /> Add New
						</Link>
					</Button>
				</div>
			)}
			<div className='rounded-md border max-w-[89vw]'>
				<DataTableBase table={table} columns={columns} />
			</div>
			S
		</div>
	);
}
