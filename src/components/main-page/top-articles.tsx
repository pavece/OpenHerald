import { IMainPageArticle } from '@/actions/articles/get-articles-mainpage';
import { ArticleCard } from './article-card';
import { FeaturedArticleCard } from './featured-article-card';

type Props = {
	featuredArticle: IMainPageArticle;
	normalArticles: IMainPageArticle[];
};

export const TopArticlesSection = ({ featuredArticle, normalArticles }: Props) => {
	return (
		<section>
			<h3 className='mb-6 text-2xl font-medium'>Today{"'"}s top articles</h3>
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:gap-4'>
				<div className='col-span-2'>
					<FeaturedArticleCard
						author={featuredArticle.creator.name ?? ''}
						date={featuredArticle.createdAt.toISOString()}
						slug={featuredArticle.slug}
						title={featuredArticle.title}
						readingTime={featuredArticle.readingTime}
						thumbnail={featuredArticle.thumbnail}
						thumbnailAlt={featuredArticle.title + ' thumbnail'}
					/>
				</div>
				<div className='md:col-span-2 lg:col-span-1 flex flex-col md:flex-row lg:flex-col w-full gap-4 mt-4 lg:mt-0'>
					{normalArticles.map((article, i) => {
						if (i > 1) {
							return null;
						}

						return (
							<ArticleCard
								key={article.slug}
								author={article.creator.name ?? ''}
								date={article.createdAt.toISOString()}
								slug={article.slug}
								title={article.title}
								thumbnailUrl={article.thumbnail}
								thumbnailAlt={article.title + ' thumbnail'}
								category={article.category?.name ?? ''}
								header
							/>
						);
					})}
				</div>
			</div>
			<div className='mt-10'>
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
					{normalArticles.map((article, i) => {
						if (i < 2) {
							return null;
						}

						return (
							<ArticleCard
								key={article.slug}
								author={article.creator.name ?? ''}
								date={article.createdAt.toISOString()}
								slug={article.slug}
								title={article.title}
								thumbnailUrl={article.thumbnail}
								thumbnailAlt={article.title + ' thumbnail'}
								category={article.category?.name ?? ''}
							/>
						);
					})}
				</div>
			</div>
		</section>
	);
};
