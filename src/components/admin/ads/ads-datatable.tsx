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
import { DataTableBase } from '../../ui/data-table-base';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PiFilePlus } from 'react-icons/pi';

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
	filterBy?: string;
}

export function AdsDataTable<TData, TValue>({ columns, data, filterBy }: DataTableProps<TData, TValue>) {
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
				<div className='flex items-center py-4'>
					<Input
						placeholder={`Filter by ${filterBy}...`}
						value={(table.getColumn(filterBy!)?.getFilterValue() as string) ?? ''}
						onChange={event => table.getColumn(filterBy!)?.setFilterValue(event.target.value)}
						className='max-w-sm'
					/>
					<Link href={'/admin/ad-manager/new'}>
						<Button>
							<PiFilePlus size={22} className='mr-2' /> Create new
						</Button>
					</Link>
				</div>
			)}
			<div className='rounded-md border max-w-[89vw]'>
				<DataTableBase table={table} columns={columns} />
			</div>
		</div>
	);
}
