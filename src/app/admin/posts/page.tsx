import { DataTable } from '@/components/admin/article-lists/data-table';
import { columns } from './columns';
import { getArticleList } from '@/actions/articles/get-article-list';
import { NavBar } from '@/components/admin/nav-bar';

export const metadata = {
	title: 'Manage articles',
	ok: {
		title: 'Manage articles',
	},
	twitter: {
		title: 'Manage articles',
	},
};

export default async function YourPostsPage() {
	const result = await getArticleList(true);

	if (!result.ok) {
		return;
	}

	const articles = result.articles!.map(({ category, ...rest }) => ({ ...rest, category: category.name }));

	return (
		<div>
			<NavBar className='hidden md:flex mb-4' title='All articles' subtitle='View every article in the system' />
			<div className='md:hidden'>
				<h1 className='text-xl'>All articles</h1>
				<p className='text-zinc-500'>View every article in the system</p>
			</div>
			<DataTable columns={columns} data={articles} filterBy='title' />
		</div>
	);
}
