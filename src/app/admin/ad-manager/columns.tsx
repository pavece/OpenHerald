'use client';

import { deleteAdById } from '@/actions/ads/delete-ad-by-id';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { PiDotsThree, PiRecycle, PiWarning } from 'react-icons/pi';
import { toast } from 'sonner';

interface AdTableRow {
	title: string | null;
	destinationUrl: string;
	mediaLink: string;
	vertical: boolean;
}

const ActionsDropdown = ({ adId }: { adId: string }) => {
	const router = useRouter();
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant='ghost' className='h-8 w-8 p-0'>
					<span className='sr-only'>Open menu</span>
					<PiDotsThree size={28} />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuItem
					onClick={async () => {
						const result = await deleteAdById(adId);
						if (result.ok) {
							return router.refresh();
						}
						toast('Error', {
							description: result.message,
							duration: 5000,
							icon: <PiWarning size={24} />,
							className: 'text-red-400 gap-4 border-red-400',
						});
					}}
					className='text-red-500 focus:text-red-600 cursor-pointer '
				>
					<PiRecycle size={22} className='mr-2' /> Delete
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export const columns: ColumnDef<AdTableRow>[] = [
	{
		accessorKey: 'id',
		header: 'Id',
		cell: ({ row }) => {
			const id = row.getValue('id') as string;
			return <div className='capitalize'>{id.split('-')[0]}...</div>;
		},
	},
	{
		header: 'Media',
		accessorKey: 'mediaLink',
		cell: ({ row }) => {
			const mediaUrl = row.getValue('mediaLink') as string;
			return <Image src={mediaUrl} alt='AD media' height={80} width={80} className='rounded-md' />;
		},
	},
	{ accessorKey: 'title', header: 'Title' },
	{
		accessorKey: 'destinationUrl',
		header: 'Destination URL',
		cell: ({ row }) => {
			const url = row.getValue('destinationUrl') as string;
			return (
				<Link href={url} className='underline'>
					{url}
				</Link>
			);
		},
	},
	{
		header: 'Type',
		accessorKey: 'vertical',
		cell: ({ row }) => {
			return <p>{row.getValue('vertical') ? 'Vertical' : 'Horizontal'}</p>;
		},
	},
	{
		id: 'actions',
		cell: ({ row }) => {
			const adId = row.getValue('id') as string;
			return <ActionsDropdown adId={adId} />;
		},
	},
];
