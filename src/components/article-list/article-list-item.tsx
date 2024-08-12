import Link from 'next/link';
import { Badge } from '../ui/badge';
import { PiCalendar, PiUser } from 'react-icons/pi';
import { ImageContainer } from '../ui/image-container';
import clsx from 'clsx';
import { format, parseISO } from 'date-fns';

type Props = {
	slug: string;
	title: string;
	author: string;
	date: string;
	thumbnailUrl: string;
	thumbnailAlt: string;
};

export const ArticleListItem = ({ title, slug, thumbnailAlt, thumbnailUrl, author, date }: Props) => {
	return (
		<article className='flex items-start gap-2'>
			<div>
				<Link href={`/article/${slug}`}>
					<ImageContainer
						url={thumbnailUrl}
						alt={thumbnailAlt}
						className='w-[180px] md:w-[240px] h-[140px] md:h-[150px]'
					/>
				</Link>
			</div>
			<div>
				<Link href={`/article/${slug}`}>
					<h1 className='font-medium text-lg'>{title}</h1>
				</Link>
				<div className='mt-2 flex flex-row gap-2 flex-wrap'>
					<Link href={`/author/${author}`}>
						<Badge variant='outline' className='text-xs font-normal py-1 text-zinc-700'>
							<PiUser size={16} className='mr-2' /> {author}
						</Badge>
					</Link>
					<Badge variant='outline' className='text-xs font-normal py-1 text-zinc-700'>
						<PiCalendar size={16} className='mr-2' /> {format(parseISO(date ?? ''), 'LLLL, dd')}
					</Badge>
				</div>
			</div>
		</article>
	);
};
