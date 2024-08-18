'use client';

import React, { useEffect, useState } from 'react';
import { CommandDialog, CommandInput, CommandItem, CommandList } from '../ui/command';
import { Button } from '../ui/button';
import { PiArticle, PiMagnifyingGlass } from 'react-icons/pi';
import Link from 'next/link';
import { searchArticles } from '@/actions/articles/search-articles';
import { cropText } from '@/lib/utils';

export const ArticleSearch = () => {
	const [open, setOpen] = useState(false);
	const [articles, setArticles] = useState<[] | { title: string; slug: string }[]>([]);

	const search = async (v: string) => {
		if (v.length > 2) {
			const { ok, articles: result } = await searchArticles(v);
			if (ok) {
				setArticles(result || []);
			}
		}
	};

	return (
		<>
			<Button variant='outline' onClick={() => setOpen(true)}>
				<PiMagnifyingGlass size={24} className='md:mr-2' /> <span className='hidden md:block'>Search</span>
			</Button>
			<CommandDialog
				open={open}
				onOpenChange={o => {
					setOpen(o);
					setArticles([]);
				}}
			>
				<CommandInput placeholder='Search articles...' onValueChange={v => search(v)} />
				<div className='px-4 py-2 text-sm flex flex-col gap-4'>
					{articles.map(article => (
						<Link
							key={article.slug}
							href={`/article/${article.slug}`}
							className='flex items-center  gap-2'
							onClick={() => {
								setOpen(false);
								setArticles([]);
							}}
						>
							<PiArticle size={22} />
							{cropText(article.title, 30)}
						</Link>
					))}
				</div>
				<CommandList></CommandList>
			</CommandDialog>
		</>
	);
};
