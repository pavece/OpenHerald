import Link from 'next/link';

export type CategoryListItem = { link: string; title: string; priority?: number };

type Props = {
	categories: CategoryListItem[];
};

/**
 *  @param categories An array of categories, will order them by priority and limit to 5 elements
 * **/

export const CategoryList = ({ categories }: Props) => {
	categories.sort((e, c) => ((e.priority ?? 1) < (c.priority ?? 1) ? 1 : -1));
	categories.splice(5);

	return (
		<ul className='hidden lg:flex items-center justify-center flex-row gap-4'>
			{categories.map(category => {
				return (
					<Link href={category.link} key={category.link}>
						{category.title}
					</Link>
				);
			})}
		</ul>
	);
};
