import { ArticlesDataTable } from '@/components/admin/article-lists/articles-datatable';
import { columns } from './columns';
import { getArticleList } from '@/actions/articles/get-article-list';

export default async function YourPostsPage() {
	const result = await getArticleList();

	if (!result.ok) {
		return;
	}

	return (
		<div>
			<ArticlesDataTable columns={columns} data={result.articles!} />
		</div>
	);
}
