import { getArticle } from '@/actions/articles/get-article';
import { UpdateArticleForm } from '@/components/admin/publish/update-article-form';
import { notFound } from 'next/navigation';

type Props = {
	params: { id: string };
};

export default async function EditArticlePage({ params: { id } }: Props) {
	const result = await getArticle(id);

	if (result.notFound) {
		notFound();
	}

	if (!result.ok) {
		//TODO: Error
		notFound();
	}

	const { verticalAds, priority, ...rest } = result.article!;

	const defaultValues = {
		...rest,
		verticalAds: verticalAds.toString().toLowerCase() as 'none' | 'left' | 'right',
		priority: priority.toString(),
	};

	return (
		<div>
			<UpdateArticleForm defaultValues={defaultValues} id={id} />
		</div>
	);
}
