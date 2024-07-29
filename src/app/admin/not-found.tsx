import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function NotFoundPage() {
	return (
		<div className='h-[70vh] flex items-center justify-center'>
			<div className='text-center space-y-6'>
				<h1 className='text-7xl font-bold'>404</h1>
				<h3 className='text-lg font-normal max-w-[300px]'>Oops, the page you where looking for does not exist</h3>
				<Button asChild>
					<Link href={'/admin/dashboard'}>Go to dashboard</Link>
				</Button>
			</div>
		</div>
	);
}
