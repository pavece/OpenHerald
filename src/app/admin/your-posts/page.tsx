import { DataTable } from '@/components/admin/article-lists/data-table';
import { columns } from './columns';
import { getArticleList } from '@/actions/articles/get-article-list';
import { NavBar } from '@/components/admin/nav-bar';

export default async function YourPostsPage() {
	const result = await getArticleList();

	if (!result.ok) {
		return;
	}

	return (
		<div>
			<NavBar className='hidden md:flex mb-4' title='Your articles' subtitle='View all the articles created by you' />
			<div className='md:hidden'>
				<h1 className='text-xl'>Your articles</h1>
				<p className='text-zinc-500'>View all the articles created by you</p>
			</div>
			<DataTable columns={columns} data={result.articles!} filterBy='title' />
		</div>
	);
}
