import { getArticleBySlug } from '@/actions/articles/get-article-by-slug';
import { HorizontalAd } from '@/components/ads/horizontal-ad';
import { VerticalAD } from '@/components/ads/vertical-ad';
import { ArticleBody } from '@/components/article/article-body';
import { ArticleHeader } from '@/components/article/article-header';
import { RecommendedArticles } from '@/components/article/recommended-articles';
import { notFound } from 'next/navigation';

type Props = {
	params: {
		slug: string;
	};
};

export default async function ArticlePage({ params: { slug } }: Props) {
	const { ok, article } = await getArticleBySlug(slug);

	if (!ok) {
		notFound();
	}

	const { creator, createdAt, content, title, thumbnail, description, readingTime } = article!;

	return (
		<div className=''>
			<ArticleHeader
				author={creator.name!}
				date={createdAt.toISOString()}
				title={title}
				description={description}
				readingTime={readingTime}
				thumbnail={thumbnail}
				thumbnailAlt='Thumbnail'
			/>

			<ArticleBody markdown={content} />

			<HorizontalAd link='' src='/images/dev/test-image-3.jpg' description='Some description' />

			<VerticalAD
				description='Some testing ad so so long that does not fit under 50 chars'
				link=''
				side='right'
				src='/images/dev/test-gif-1.gif'
			/>

			<RecommendedArticles />
		</div>
	);
}
