import { useRouter } from 'next/navigation';
import { PiDotsThree, PiRecycle, PiWarning } from 'react-icons/pi';
import { toast } from 'sonner';

import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
} from '@/components/ui/dropdown-menu';

import { Button } from '@/components/ui/button';
import { deleteBanner } from '@/actions/banners/remove-banner';
import { setBannerAsActive } from '@/actions/banners/set-active-banner';
import { setBannerAsInactive } from '@/actions/banners/set-banner-inactive';

const handleError = (msg: string) => {
	toast('Error', {
		description: msg,
		duration: 5000,
		icon: <PiWarning size={24} />,
		className: 'text-red-400 gap-4 border-red-400',
	});
};

export const BannerRowActions = ({ bannerId, isActive }: { bannerId: string; isActive: boolean }) => {
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
				{!isActive && (
					<DropdownMenuItem
						onClick={async () => {
							const result = await setBannerAsActive(bannerId);
							if (result.ok) {
								return router.refresh();
							}
							handleError(result.message);
						}}
						className='text-green-500 focus:text-green-600 cursor-pointer '
					>
						Set active
					</DropdownMenuItem>
				)}

				{isActive && (
					<DropdownMenuItem
						onClick={async () => {
							const result = await setBannerAsInactive(bannerId);
							if (result.ok) {
								return router.refresh();
							}
							handleError(result.message);
						}}
						className='text-yellow-500 focus:text-yellow-600 cursor-pointer '
					>
						Set inactive
					</DropdownMenuItem>
				)}

				<DropdownMenuItem
					onClick={async () => {
						const result = await deleteBanner(bannerId);
						if (result.ok) {
							return router.refresh();
						}
						handleError(result.message);
					}}
					className='text-red-500 focus:text-red-600 cursor-pointer '
				>
					<PiRecycle size={22} className='mr-2' /> Delete
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
