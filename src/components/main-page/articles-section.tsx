import Link from 'next/link';
import { ArticleCard } from './article-card';
import { FeaturedArticleCard } from './featured-article-card';
import { PiDotsThree } from 'react-icons/pi';
import { IMainPageArticle } from '@/actions/articles/get-articles-mainpage';

type Props = {
	sectionTitle: string;
	moreLink?: string;
	articles: IMainPageArticle[];
};

export const ArticlesSection = ({ sectionTitle, moreLink, articles }: Props) => {
	let featuredArticle = null;

	if (sectionTitle !== 'Latest news') {
		featuredArticle = articles.filter(article => article.priority === 1)[0];
	}

	articles = articles.filter(article => article.slug !== featuredArticle?.slug);

	return (
		<section className='mt-10'>
			<hr className='mb-8' />
			<div className='flex justify-between items-center mb-6'>
				<h3 className='text-2xl font-medium'>{sectionTitle}</h3>
				<Link href={moreLink ?? ''}>
					<span className='flex items-center gap-2 hover:text-zinc-600'>
						<PiDotsThree size={24} /> View more
					</span>
				</Link>
			</div>
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
				{featuredArticle && (
					<div className='md:col-span-2 md:row-span-2 pt-2'>
						<FeaturedArticleCard
							author={featuredArticle.creator.name ?? ''}
							date={featuredArticle.createdAt.toISOString()}
							slug={featuredArticle.slug}
							title={featuredArticle.title}
							readingTime={featuredArticle.readingTime}
							thumbnail={featuredArticle.thumbnail}
							thumbnailAlt={featuredArticle.title + ' thumbnail'}
							showFeaturedLabel={false}
						/>
					</div>
				)}

				{articles.map((article, i) => {
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
							header={!!featuredArticle && i < 3}
						/>
					);
				})}
			</div>
		</section>
	);
};
