"use client";

import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import {PiBookmarkSimpleFill, PiCalendar, PiUser } from 'react-icons/pi';
import { ImageContainer } from '@/components/ui/image-container';
import { format, parseISO } from 'date-fns';
import { useSavedArticlesStore } from '../../../stores/saved-articles-store';

type Props = {
	slug: string;
	title: string;
	author: string;
	date: string;
	thumbnailUrl: string;
};

export const SavedArticle = ({ title, slug, thumbnailUrl, author, date }: Props) => {
    const removeArticle = useSavedArticlesStore(state => state.removeSavedArticle)
	return (
		<article className='relative flex items-start gap-2'>
			<div>
				<Link href={`/article/${slug}`}>
					<ImageContainer
						url={thumbnailUrl}
						alt={`${title}'s thumbnail`}
						className='w-[180px] md:w-[240px] h-[120px] md:h-[150px]'
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
					<Badge variant='outline' className='text-xs font-normal py-1 bg-zinc-700 cursor-pointer text-white' onClick={() => removeArticle(slug)}>
						<PiBookmarkSimpleFill size={16} /> Saved
					</Badge>
				</div>
			</div>
		</article>
	);
};
