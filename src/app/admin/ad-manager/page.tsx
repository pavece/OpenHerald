export const revalidate = 120;

import { columns } from './columns';
import { NavBar } from '@/components/admin/nav-bar';
import { AdsDataTable } from '@/components/admin/ads/ads-datatable';
import { getAdList } from '@/actions/ads/get-ad-list';

export const metadata = {
	title: 'Ad manager',
	ok: {
		title: 'Ad manager',
	},
	twitter: {
		title: 'Ad manager',
	},
};

export default async function AdManagerPage() {
	const result = await getAdList();

	if (!result.ok) {
		return;
	}

	return (
		<div>
			<NavBar className='hidden md:flex mb-4' title='AD manager' subtitle='Manage every AD in the system.' />
			<div className='md:hidden'>
				<h1 className='text-xl'>AD manager</h1>
				<p className='text-zinc-500'>Manage every AD in the system.</p>
			</div>
			<AdsDataTable columns={columns} data={result.ads!} filterBy='title' />
		</div>
	);
}
