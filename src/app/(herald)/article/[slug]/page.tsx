import { HorizontalAd } from '@/components/ads/horizontal-ad';
import { VerticalAD } from '@/components/ads/vertical-ad';
import { ArticleBody } from '@/components/article/article-body';
import { ArticleHeader } from '@/components/article/article-header';

type Props = {
	params: {
		slug: string;
	};
};

export default function ArticlePage({ params: { slug } }: Props) {
	return (
		<div className=''>
			<ArticleHeader
				author='John Doe'
				date={new Date().toISOString()}
				title='Lorem, ipsum dolor sit amet consectetur adipisicing elit. Numquam, obcaecati.'
				description='Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam laudantium deleniti nihil tempora, quis eos nemo aliquam illum voluptatibus tempore?'
				readingTime={10}
				thumbnail='/images/dev/test-image-2.jpg'
				thumbnailAlt='Thumbnail'
			/>
			<ArticleBody />

			<HorizontalAd link='' src='/images/dev/test-image-3.jpg' description='Some description' />

			<VerticalAD
				description='Some testing ad so so long that does not fit under 50 chars'
				link=''
				side='right'
				src='/images/dev/test-gif-1.gif'
			/>
		</div>
	);
}
