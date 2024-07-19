import Link from 'next/link';
import { ImageContainer } from '../ui/image-container';
import { PiCalendar, PiClock, PiUser } from 'react-icons/pi';
import { Badge } from '../ui/badge';

export const ArticleHeader = () => {
	return (
		<div className=''>
			<ImageContainer url='/images/dev/test-image-2.jpg' alt='Some image' className='h-[180px] md:h-[300px] w-full' />
			<div className='my-4 flex flex-row gap-4'>
				<Link href={`/author/${'author'}`}>
					<Badge variant='outline' className='text-xs md:text-sm font-normal py-1 text-zinc-700'>
						<PiUser size={20} className='mr-2' /> John Doe
					</Badge>
				</Link>
				<Badge variant='outline' className='text-xs md:text-sm font-normal py-1 text-zinc-700'>
					<PiCalendar size={20} className='mr-2' /> July, 12
				</Badge>
				<Badge variant='outline' className='text-xs md:text-sm font-normal py-1 text-zinc-700'>
					<PiClock size={20} className='mr-2' /> 10 min read
				</Badge>
			</div>
			<h1 className='text-4xl font-semibold'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fuga, quo.</h1>
			<p className='mt-4 text-lg text-zinc-500'>
				Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illo ad obcaecati facilis magnam quas. Aliquid,
				blanditiis cum aliquam cupiditate quae modi esse nesciunt repudiandae. Magni eaque voluptatibus accusantium
				culpa provident.
			</p>
		</div>
	);
};
