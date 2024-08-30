export const revalidate = 1800;

import { addAnalyticsView } from '@/actions/analytics/add-view';
import { getArticlesMainPage } from '@/actions/articles/get-articles-mainpage';
import { ArticlesSection } from '@/components/main-page/articles-section';
import { TopArticlesSection } from '@/components/main-page/top-articles';
import { PiWarning } from 'react-icons/pi';

export default async function Home() {
	const result = await getArticlesMainPage();

	if (!result.ok) {
		return (
			<div className='text-red-500 h-[50vh] flex items-center justify-center'>
				<div className='flex items-center justify-center gap-4'>
					<PiWarning size={45} />
					<h1 className='text-2xl'>{result.message}</h1>
				</div>
			</div>
		);
	}

	await addAnalyticsView('mainPage', 'page');

	return (
		<div>
			{result.articles?.coverArticles.featured && result.articles.coverArticles.normal && (
				<TopArticlesSection
					featuredArticle={result.articles!.coverArticles.featured!}
					normalArticles={result.articles!.coverArticles.normal}
				/>
			)}

			{result.articles!.latestArticles[0] && (
				<ArticlesSection
					sectionTitle='Latest news'
					articles={result.articles!.latestArticles}
					moreLink='/articles/latest-articles'
				/>
			)}

			{result.articles?.categoryArticles.map(category => {
				return (
					<ArticlesSection
						sectionTitle={category.name}
						key={category.name}
						articles={category.Article}
						moreLink={`/articles/${category.name}`}
					/>
				);
			})}
		</div>
	);
}
