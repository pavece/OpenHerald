import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../button';
import { PiBookmarkSimple } from 'react-icons/pi';
import { CategoryList } from './category-list';
import { ArticleSearch } from '@/components/main-page/article-search';
import { getSiteConfig } from '@/actions/site-config/get-site-config';

export const NavBar = async () => {
	const {
		config: { navbarCategories },
	} = await getSiteConfig();

	return (
		<div className='px-4 py-3 md:px-6 md:py-5 flex justify-between items-center'>
			<div>
				<Link href='/'>
					<Image src={'/images/logo.svg'} alt='Open herald logo' width={600} height={250} className='w-[205px]' />
				</Link>
			</div>
			<div>
				<CategoryList categories={navbarCategories} />
			</div>
			<div className='flex gap-3 items-center justify-center'>
				<ArticleSearch />
				<Link href='/saved-articles'>
					<Button className='bg-zinc-800'>
						<PiBookmarkSimple size={24} className='md:mr-2' /> <span className='hidden md:block'>Saved articles</span>
					</Button>
				</Link>
			</div>
		</div>
	);
};
