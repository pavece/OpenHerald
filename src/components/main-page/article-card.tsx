import Link from 'next/link';
import React from 'react';
import { ImageContainer } from '../ui/image-container';
import { PiCalendar, PiClock, PiUser } from 'react-icons/pi';
import { Badge } from '../ui/badge';
import { format, parseISO } from 'date-fns';
import clsx from 'clsx';

type Props = {
	slug: string;
	category: string;
	title: string;
	thumbnailUrl: string;
	thumbnailAlt: string;
	author: string;
	date: string;
	header?: boolean;
};

export const ArticleCard = ({ category, thumbnailUrl, thumbnailAlt, author, date, title, header, slug }: Props) => {
	return (
		<article>
			<h4 className='text-md text-zinc-500 tracking-wide mb-2'>{category}</h4>
			<Link href={`/article/${slug}`}>
				<ImageContainer
					url={thumbnailUrl}
					alt={thumbnailAlt}
					className={clsx({ 'h-[120px]': header, 'h-[180px]': !header })}
				/>
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
			<Link href={`/article/${slug}`}>
				<h2 className='text-md font-semibold'>{title}</h2>
			</Link>
		</article>
	);
};
