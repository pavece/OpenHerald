export const revalidate = 500;

import { getArticleAds } from '@/actions/ads/get-article-ads';
import { addAnalyticsView } from '@/actions/analytics/add-view';
import { getArticleBySlug } from '@/actions/articles/get-article-by-slug';
import { HorizontalAd } from '@/components/ads/horizontal-ad';
import { VerticalAD } from '@/components/ads/vertical-ad';
import { ArticleBody } from '@/components/article/article-body';
import { ArticleHeader } from '@/components/article/article-header';
import { RecommendedArticles } from '@/components/article/recommended-articles';
import { ArticleVerticalAds } from '@prisma/client';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

type Props = {
	params: {
		slug: string;
	};
};

export async function generateMetadata({ params: { slug } }: Props): Promise<Metadata> {
	const { ok, article } = await getArticleBySlug(slug);

	if (!ok) {
		return {
			title: 'not found',
		};
	}

	return {
		title: article?.title,
		description: article?.description,
		openGraph: {
			title: article?.title,
			description: article?.description,
			images: article?.thumbnail,
		},
		twitter: {
			card: 'summary_large_image',
			title: article?.title,
			description: article?.description,
			images: article?.thumbnail,
		},
	};
}

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

	await addAnalyticsView(slug, 'article');

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
					id={horizontalAd.id}
					link={horizontalAd.destinationUrl}
					src={horizontalAd.mediaLink}
					description={horizontalAd.title ?? ''}
				/>
			)}

			{verticalAd && (
				<VerticalAD
					id={verticalAd.id}
					description={verticalAd.title ?? ''}
					link={verticalAd.destinationUrl}
					side={article.verticalAds.toString().toLowerCase() as 'left' | 'right'}
					src={verticalAd.mediaLink}
				/>
			)}
		</div>
	);
}
