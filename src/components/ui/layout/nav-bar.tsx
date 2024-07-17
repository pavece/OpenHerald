import Image from 'next/image';
import Link from "next/link"
import { Button } from '../button';
import { PiBookmarkSimple, PiMagnifyingGlass } from 'react-icons/pi';
import { CategoryList, CategoryListItem } from './category-list';



export const NavBar = () => {
	const categories: CategoryListItem[] = [
		{ title: 'Politics', link: '', priority: 3 },
		{ title: 'Economics', link: '', priority: 5 },
		{ title: 'Technology', link: '', priority: 4 },
		{ title: 'Culture', link: '', priority: 4 },
	];

	return (
		<div className='px-4 py-3 md:px-6 md:py-5 flex justify-between items-center'>
			<div>
				<Link href="/">
					<Image src={'/images/logo.svg'} alt='Open herald logo' width={600} height={250} className='w-[205px]' />
				</Link>
			</div>
			<div>
				<CategoryList categories={categories} />
			</div>
			<div className='flex gap-3 items-center justify-center'>
				<Button variant='outline'>
					<PiMagnifyingGlass size={24} className='md:mr-2' /> <span className='hidden md:block'>Search</span>
				</Button>
				<Button className='bg-zinc-800'>
					<PiBookmarkSimple size={24} className='md:mr-2' /> <span className='hidden md:block'>Saved articles</span>
				</Button>
			</div>
		</div>
	);
};
