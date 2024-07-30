import { ArticlesDataTable } from '@/components/admin/article-lists/articles-datatable';
import { columns } from './columns';
import { getArticleList } from '@/actions/articles/get-article-list';

export default async function YourPostsPage() {
	const result = await getArticleList(true);

	if (!result.ok) {
		return;
	}

	return (
		<div>
			<div>
				<h1 className='text-xl'>All articles</h1>
				<p className='text-zinc-500'>View every article in the system</p>
			</div>
			<ArticlesDataTable columns={columns} data={result.articles!} />
		</div>
	);
}
