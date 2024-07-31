import { DataTable } from '@/components/admin/article-lists/data-table';
import { columns } from './columns';
import { getArticleList } from '@/actions/articles/get-article-list';

export default async function YourPostsPage() {
	const result = await getArticleList();

	if (!result.ok) {
		return;
	}

	return (
		<div>
			<DataTable columns={columns} data={result.articles!} filterBy='title' />
		</div>
	);
}
