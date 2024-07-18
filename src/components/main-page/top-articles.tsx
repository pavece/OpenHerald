import { ArticleCard } from './article-card';
import { FeaturedArticleCard } from './featured-article-card';

export const TopArticlesSection = () => {
	return (
		<section>
			<h3 className='mb-6 text-2xl font-medium'>Today{"'"}s top articles</h3>
			<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
				<div className='md:col-span-2'>
					<FeaturedArticleCard
						author='John Doe'
						date={new Date().toISOString()}
						slug='some-post-title'
						title='Lorem, ipsum dolor sit amet consectetur adipisicing elit. Numquam, obcaecati.'
						readingTime={10}
						thumbnail='/images/dev/test-image-2.jpg'
						thumbnailAlt='Thumbnail'
					/>
				</div>
				<div className='col-span-1 flex flex-col gap-4'>
					<ArticleCard
						author='John Doe'
						date={new Date().toISOString()}
						slug='some-post-title'
						title='Lorem, ipsum dolor sit amet consectetur adipisicing elit. Numquam, obcaecati.'
						thumbnailUrl='/images/dev/test-image-1.jpg'
						thumbnailAlt='Thumbnail'
						category='Technology'
						header
					/>
					<hr />
					<ArticleCard
						author='John Doe'
						date={new Date().toISOString()}
						slug='some-post-title'
						title='Lorem, ipsum dolor sit amet consectetur adipisicing elit. Numquam, obcaecati.'
						thumbnailUrl='/images/dev/test-image-2.jpg'
						thumbnailAlt='Thumbnail'
						category='Technology'
						header
					/>
				</div>
			</div>
		</section>
	);
};
