import Link from 'next/link';

type Props = {
	categories: string[];
};

export const CategoryList = ({ categories }: Props) => {
	return (
		<ul className='hidden lg:flex items-center justify-center flex-row gap-4'>
			{categories.map(category => {
				return (
					<Link href={`/articles/${category}`} key={category}>
						{category}
					</Link>
				);
			})}
		</ul>
	);
};
