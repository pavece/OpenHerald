export const revalidate = 3600;

import { getArticlesByCategory } from '@/actions/articles/get-articles-by-category';
import { ArticleListItem } from '@/components/article-list/article-list-item';
import { notFound } from 'next/navigation';
import { CategoryPagination } from './category-pagination';

type Props = {
	params: {
		category: string;
	};
	searchParams: {
		page: number;
	};
};

export default async function CategoryPage({ params: { category }, searchParams }: Props) {
	const currentPage = !isNaN(Number(searchParams.page)) ? Number(searchParams.page) : 1;

	const result = await getArticlesByCategory(category, currentPage);
	const { pagination } = result;

	if (!result.ok) {
		return <h1>{result.message}</h1>;
	}

	if (result.articles === null || !result.articles?.Article.length) {
		return notFound();
	}

	return (
		<div>
			<div>
				<h1 className='capitalize text-2xl font-semibold'>{category}</h1>
				<p className='text-md text-zinc-500'>{result.articles?.description}</p>
			</div>

			<div className='py-8 space-y-4'>
				{result.articles?.Article.map(article => (
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

			<CategoryPagination pagination={pagination!} currentPage={currentPage} />
		</div>
	);
}
