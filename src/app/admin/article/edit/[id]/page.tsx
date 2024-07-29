import { getArticle } from '@/actions/articles/get-article';
import { auth } from '@/auth';
import { UpdateArticleForm } from '@/components/admin/publish/update-article-form';
import { notFound, redirect } from 'next/navigation';

type Props = {
	params: { id: string };
};

export default async function EditArticlePage({ params: { id } }: Props) {
	const session = await auth();
	const result = await getArticle(id);

	if (result.notFound) {
		notFound();
	}

	if (!result.ok) {
		notFound();
	}

	if (session?.user.id !== result.article?.creatorId && !session?.user.roles.includes('admin')) {
		redirect('/admin/dashboard');
	}

	const { verticalAds, priority, ...rest } = result.article!;

	const defaultValues = {
		...rest,
		verticalAds: verticalAds.toString().toLowerCase() as 'none' | 'left' | 'right',
		priority: priority.toString(),
	};

	return (
		<div className='pt-2'>
			<h1 className='text-xl'>Update an article</h1>
			<p className='text-zinc-500'>Fill the form to update this article</p>
			<div className='py-6'>
				<UpdateArticleForm defaultValues={defaultValues} id={id} />
			</div>
		</div>
	);
}
