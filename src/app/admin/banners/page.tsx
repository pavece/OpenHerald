import { DataTable } from '@/components/admin/banners/data-table';
import { NavBar } from '@/components/admin/nav-bar';
import { columns } from './columns';
import { getBanners } from '@/actions/banners/get-banners';

export default async function CategoriesPage() {
	const result = await getBanners();

	if (!result.ok) {
		return <h1>Server error</h1>;
	}

	const banners = result.banners?.toSorted(b => (!b.isActive ? 1 : -1));

	return (
		<div>
			<NavBar className='hidden md:flex mb-4' title='Banners' subtitle='View and add new banners.' />
			<div className='md:hidden'>
				<h1 className='text-xl'>Banners</h1>
				<p className='text-zinc-500'>View and add new banners.</p>
			</div>
			<DataTable columns={columns} data={banners!} filterBy='name' />
		</div>
	);
}
