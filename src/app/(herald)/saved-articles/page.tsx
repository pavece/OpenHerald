'use client';

import { useSavedArticlesStore } from '@/stores/saved-articles-store';
import { SavedArticle } from './saved-article';

export default function SavedArticlesPage() {
	const savedArticles = useSavedArticlesStore(state => state.savedArticles);

	return (
		<div>
			<div>
				<h1 className='capitalize text-2xl font-semibold'>Saved articles</h1>
				<p className='text-md text-zinc-500 max-w-[600px]'>
					Check your saved articles. These articles are browser dependant, if you change browsers / devices these
					articles wont appear.
				</p>
			</div>
			<div className='mt-6 space-y-4'>
				{savedArticles.length ? (
					savedArticles.map(article => (
						<SavedArticle
							key={article.slug}
							title={article.title}
							author={article.author}
							date={article.date}
							slug={article.slug}
							thumbnailUrl={article.thumbnail}
						/>
					))
				) : (
					<div className='mt-12'>
						<h1 className='text-lg'>No saved articles yet</h1>
						<p className='text-zinc-500 flex items-center'>Go to any article and click the bookmark icon to save it.</p>
					</div>
				)}
			</div>
		</div>
	);
}
