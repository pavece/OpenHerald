import Link from 'next/link';
import { ArticleCard } from './article-card';
import { FeaturedArticleCard } from './featured-article-card';
import { PiDotsThree } from 'react-icons/pi';

type Props = {
	sectionTitle: string;
	moreLink?: string;
	hasFeatured?: boolean;
};

export const ArticlesSection = ({ hasFeatured, sectionTitle, moreLink }: Props) => {
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
			<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
				{hasFeatured && (
					<div className='md:col-span-2 md:row-span-2'>
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
				)}

				<ArticleCard
					author='John Doe'
					date={new Date().toISOString()}
					slug='some-post-title'
					title='Lorem, ipsum dolor sit amet consectetur adipisicing elit. Numquam, obcaecati.'
					thumbnailUrl='/images/dev/test-image-1.jpg'
					thumbnailAlt='Thumbnail'
					category='Technology'
					header={hasFeatured}
				/>

				<ArticleCard
					author='John Doe'
					date={new Date().toISOString()}
					slug='some-post-title'
					title='Lorem, ipsum dolor sit amet consectetur adipisicing elit. Numquam, obcaecati.'
					thumbnailUrl='/images/dev/test-image-1.jpg'
					thumbnailAlt='Thumbnail'
					category='Technology'
					header={hasFeatured}
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
		</section>
	);
};
