import { FeaturedArticleCard } from '@/components/main-page/featured-article-card';

export default function Home() {
	return (
		<div className=''>
			<FeaturedArticleCard
				author='John Doe'
				date={new Date().toISOString()}
				slug='some-post-title'
				title='Lorem, ipsum dolor sit amet consectetur adipisicing elit. Numquam, obcaecati.'
				readingTime={10}
				thumbnail='/images/dev/test-image-1.jpg'
				thumbnailAlt='Thumbnail'
			/>
		</div>
	);
}
