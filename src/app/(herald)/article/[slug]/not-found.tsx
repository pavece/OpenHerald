import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PiHouse } from 'react-icons/pi';

export const metadata = {
	title: 'Not found',
};

export default function NotFoundPage() {
	return (
		<div className='flex items-center justify-center h-[70vh]'>
			<div className='text-center'>
				<h1 className='text-7xl font-bold tracking-wide'>404</h1>
				<h3 className='text-lg text-zinc-800 mb-10'>The page you were looking for does not exist.</h3>
				<Link href={'/'}>
					<Button>
						<PiHouse size={22} className='mr-2' /> Go back
					</Button>
				</Link>
			</div>
		</div>
	);
}
