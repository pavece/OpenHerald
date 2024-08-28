'use client';

import Link from 'next/link';
import { ImageContainer } from '../ui/image-container';
import { PiBookmarkSimple, PiBookmarkSimpleFill, PiCalendar, PiClock, PiUser, PiXLogo } from 'react-icons/pi';
import { Badge } from '../ui/badge';
import { format, parseISO } from 'date-fns';
import { useSavedArticlesStore } from '@/stores/saved-articles-store';
import clsx from 'clsx';

type Props = {
	title: string;
	thumbnail: string;
	thumbnailAlt: string;
	date: string;
	author: string;
	readingTime: number;
	description: string;
	slug: string;
};

export const ArticleHeader = ({
	title,
	thumbnail,
	thumbnailAlt,
	date,
	author,
	readingTime,
	description,
	slug,
}: Props) => {
	const saveArticle = useSavedArticlesStore(state => state.addSavedArticle);
	const removeArticle = useSavedArticlesStore(state => state.removeSavedArticle);
	const isSaved = !!useSavedArticlesStore(state => state.savedArticles).find(article => article.slug === slug);

	return (
		<div className=''>
			<ImageContainer url={thumbnail} alt={thumbnailAlt} className='h-[180px] md:h-[300px] w-full' />
			<div className='my-4 flex justify-between items-center'>
				<div className='flex gap-4'>
					<Link href={`/author/${'author'}`}>
						<Badge variant='outline' className='text-xs md:text-sm font-normal py-1 text-zinc-700'>
							<PiUser size={20} className='mr-2' /> {author}
						</Badge>
					</Link>
					<Badge variant='outline' className='text-xs md:text-sm font-normal py-1 text-zinc-700 hidden md:flex'>
						<PiCalendar size={20} className='mr-2' /> {format(parseISO(date ?? ''), 'LLLL, dd')}
					</Badge>
					<Badge variant='outline' className='text-xs md:text-sm font-normal py-1 text-zinc-700'>
						<PiClock size={20} className='mr-2' /> {readingTime} min read
					</Badge>
				</div>
				<div className='flex gap-2 '>
					<Link
						href={`https://twitter.com/intent/tweet?text=Check out this article ${
							process.env.NEXT_PUBLIC_SITE_LINK + '/article/' + slug
						}`}
					>
						<Badge variant='outline' className='text-s md:text-sm font-normal py-1 text-zinc-700 cursor-pointer'>
							<PiXLogo size={24} />
						</Badge>
					</Link>
					<Badge
						variant='outline'
						className={clsx('text-xs md:text-sm font-normal py-1  cursor-pointer', {
							'text-zinc-700': !isSaved,
							'text-white bg-zinc-700': isSaved,
						})}
						onClick={() => {
							if (isSaved) {
								return removeArticle(slug);
							}
							saveArticle({ title, thumbnail, date, author, slug });
						}}
					>
						{!isSaved ? <PiBookmarkSimple size={24} /> : <PiBookmarkSimpleFill size={24} />}
					</Badge>
				</div>
			</div>
			<h1 className='text-4xl font-semibold'>{title}</h1>
			<p className='mt-4 text-lg text-zinc-500'>{description}</p>
		</div>
	);
};
