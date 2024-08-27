export const revalidate = 300;

import { addAnalyticsView } from '@/actions/analytics/add-view';
import { getLatestArticles } from '@/actions/articles/get-latest-articles';
import { ArticleListItem } from '@/components/article-list/article-list-item';

export const metadata = {
	title: 'Latest news',
	og: {
		title: 'Latest news',
	},
	twitter: {
		title: 'Latest news',
	},
};

export default async function LatestArticlesPage() {
	const result = await getLatestArticles();

	if (!result.ok) {
		return <h1>{result.message}</h1>;
	}

	await addAnalyticsView('latest', 'categoryPage');

	return (
		<div>
			<div>
				<h1 className='capitalize text-2xl font-semibold'>Latest articles</h1>
				<p className='text-md text-zinc-500'>Explore some of the latest articles.</p>
			</div>
			<div className='py-8 space-y-4'>
				{result.articles?.map(article => (
					<ArticleListItem
						title={article.title}
						key={article.slug}
						author={article.creator.name ?? ''}
						date={article.createdAt.toISOString()}
						slug={article.slug}
						thumbnailAlt={article.title + "'s thumbnail"}
						thumbnailUrl={article.thumbnail}
					/>
				))}
			</div>
		</div>
	);
}
