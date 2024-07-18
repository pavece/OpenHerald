import Link from 'next/link';
import { format, parseISO } from 'date-fns';
import { ImageContainer } from '../ui/image-container';
import { Badge } from '../ui/badge';
import { PiCalendar, PiClock, PiUser } from 'react-icons/pi';

type Props = {
	author: string;
	date: string;
	readingTime: number;
	title: string;
	thumbnail: string;
	slug: string;
	thumbnailAlt: string;
};

export const FeaturedArticleCard = ({ author, date, readingTime, title, thumbnail, slug, thumbnailAlt }: Props) => {
	return (
		<article className='min-w-full'>
			<h4 className='text-md text-zinc-500 tracking-wide mb-2'>Featured Article</h4>
			<Link href={`/article/${slug}`}>
				<ImageContainer url={thumbnail} alt={thumbnailAlt} className='h-[350px] w-full' />
			</Link>
			<div className='mt-2 flex flex-row gap-2 flex-wrap'>
				<Link href={`/author/${author}`}>
					<Badge variant='outline' className='text-sm font-normal py-1 text-zinc-700'>
						<PiUser size={20} className='mr-2' /> {author}
					</Badge>
				</Link>
				<Badge variant='outline' className='text-sm font-normal py-1 text-zinc-700'>
					<PiCalendar size={20} className='mr-2' /> {format(parseISO(date), 'LLLL, dd')}
				</Badge>
				<Badge variant='outline' className='text-sm font-normal py-1 text-zinc-700'>
					<PiClock size={20} className='mr-2' /> {readingTime} min read
				</Badge>
			</div>
			<div>
				<Link href={`/article/${slug}`}>
					<h1 className='mt-3 text-2xl font-semibold hover:text-zinc-600 transition-colors duration-150'>{title}</h1>
				</Link>
			</div>
		</article>
	);
};
