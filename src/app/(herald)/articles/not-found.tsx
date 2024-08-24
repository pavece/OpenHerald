import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PiHouse } from 'react-icons/pi';

export default function NotFoundPage() {
	return (
		<div className='flex items-center justify-center h-80'>
			<div className='text-center space-y-6'>
				<h1 className='text-5xl font-bold tracking-wide'>404</h1>
				<h3 className='text-xl text-zinc-800'>The page you were looking for does not exist.</h3>
				<Link href={'/'}>
					<Button>
						<PiHouse size={22} className='mr-2' /> Go back
					</Button>
				</Link>
			</div>
		</div>
	);
}
