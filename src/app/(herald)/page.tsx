import { getArticlesMainPage } from '@/actions/articles/get-articles-mainpage';
import { ArticlesSection } from '@/components/main-page/articles-section';
import { TopArticlesSection } from '@/components/main-page/top-articles';

export default async function Home() {
	const result = await getArticlesMainPage();

	if (!result.ok) {
		return <h1>{result.message}</h1>;
	}

	return (
		<div>
			<TopArticlesSection
				featuredArticle={result.articles!.coverArticles.featured!}
				normalArticles={result.articles!.coverArticles.normal}
			/>
			<ArticlesSection
				sectionTitle='Latest news'
				articles={result.articles!.latestArticles}
				moreLink='/articles/latest-articles'
			/>

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
