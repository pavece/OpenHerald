import { ArticleCard } from './article-card';
import { FeaturedArticleCard } from './featured-article-card';

export const TopArticlesSection = () => {
	return (
		<section>
			<h3 className='mb-6 text-2xl font-medium'>Today{"'"}s top articles</h3>
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:gap-4'>
				<div className='col-span-2'>
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
				<div className='md:col-span-2 lg:col-span-1 flex flex-col md:flex-row lg:flex-col w-full gap-4 mt-4 lg:mt-0'>
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
					<hr className='hidden lg:block' />
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
			<div className='mt-10'>
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
					<ArticleCard
						author='John Doe'
						date={new Date().toISOString()}
						slug='some-post-title'
						title='Lorem, ipsum dolor sit amet consectetur adipisicing elit. Numquam, obcaecati.'
						thumbnailUrl='/images/dev/test-image-3.jpg'
						thumbnailAlt='Thumbnail'
						category='Technology'
					/>
					<ArticleCard
						author='John Doe'
						date={new Date().toISOString()}
						slug='some-post-title'
						title='Lorem, ipsum dolor sit amet consectetur adipisicing elit. Numquam, obcaecati.'
						thumbnailUrl='/images/dev/test-image-2.jpg'
						thumbnailAlt='Thumbnail'
						category='Technology'
					/>
					<ArticleCard
						author='John Doe'
						date={new Date().toISOString()}
						slug='some-post-title'
						title='Lorem, ipsum dolor sit amet consectetur adipisicing elit. Numquam, obcaecati.'
						thumbnailUrl='/images/dev/test-image-1.jpg'
						thumbnailAlt='Thumbnail'
						category='Technology'
					/>
				</div>
			</div>
		</section>
	);
};
