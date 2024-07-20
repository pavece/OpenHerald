import React from 'react';
import { ArticleCard } from '../main-page/article-card';

export const RecommendedArticles = () => {
	return (
		<section className='w-full '>
			<h3 className='mt-10 text-2xl mb-3'>Recommended articles</h3>
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
					thumbnailUrl='/images/dev/test-image-1.jpg'
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
			</div>
		</section>
	);
};
