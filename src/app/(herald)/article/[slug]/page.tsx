import { getArticleAds } from '@/actions/ads/get-article-ads';
import { getArticleBySlug } from '@/actions/articles/get-article-by-slug';
import { HorizontalAd } from '@/components/ads/horizontal-ad';
import { VerticalAD } from '@/components/ads/vertical-ad';
import { ArticleBody } from '@/components/article/article-body';
import { ArticleHeader } from '@/components/article/article-header';
import { RecommendedArticles } from '@/components/article/recommended-articles';
import { ArticleVerticalAds } from '@prisma/client';
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

	if (!article?.visibleForUsers) {
		notFound();
	}

	let verticalAd = null;
	let horizontalAd = null;

	if (article.showAds) {
		const adResponse = await getArticleAds({
			vertical: article.verticalAds !== ArticleVerticalAds.NONE,
			horizontal: article.horizontalAds,
		});

		if (!adResponse.ok) {
			return;
		}

		verticalAd = adResponse.ads?.verticalAd;
		horizontalAd = adResponse.ads?.horizontalAd;
	}

	const { creator, createdAt, content, title, thumbnail, description, readingTime } = article!;

	return (
		<div className=''>
			<ArticleHeader
				slug={slug}
				author={creator.name!}
				date={createdAt.toISOString()}
				title={title}
				description={description}
				readingTime={readingTime}
				thumbnail={thumbnail}
				thumbnailAlt='Thumbnail'
			/>

			<ArticleBody markdown={content} />

			{horizontalAd && (
				<HorizontalAd
					link={horizontalAd.destinationUrl}
					src={horizontalAd.mediaLink}
					description={horizontalAd.title ?? ''}
				/>
			)}

			{verticalAd && (
				<VerticalAD
					description={verticalAd.title ?? ''}
					link={verticalAd.destinationUrl}
					side={article.verticalAds.toString().toLowerCase() as 'left' | 'right'}
					src={verticalAd.mediaLink}
				/>
			)}

			<RecommendedArticles />
		</div>
	);
}
