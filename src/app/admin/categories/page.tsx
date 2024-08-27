import { DataTable } from '@/components/admin/categories/data-table';
import { NavBar } from '@/components/admin/nav-bar';
import { getCategories } from '@/actions/categories/get-categories';
import { columns } from './columns';

export const metadata = {
	title: 'Categories',
	ok: {
		title: 'Categories',
	},
	twitter: {
		title: 'Categories',
	},
};

export default async function CategoriesPage() {
	const result = await getCategories();

	if (!result.ok) {
		return <h1>Server error</h1>;
	}

	const categories = result.categories;

	return (
		<div>
			<NavBar className='hidden md:flex mb-4' title='Categories' subtitle='View and add categories.' />
			<div className='md:hidden'>
				<h1 className='text-xl'>Categories</h1>
				<p className='text-zinc-500'>View and add categories.</p>
			</div>
			<DataTable columns={columns} data={categories!} filterBy='name' />
		</div>
	);
}
