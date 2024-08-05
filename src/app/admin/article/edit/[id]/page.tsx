import { getArticle } from '@/actions/articles/get-article';
import { auth } from '@/auth';
import { NavBar } from '@/components/admin/nav-bar';
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
			<NavBar
				className='hidden md:flex mb-4'
				title='Update an article'
				subtitle='Fill the form to update this article'
			/>
			<div className='md:hidden'>
				<h1 className='text-xl'>Update an article</h1>
				<p className='text-zinc-500'>Fill the form to update this article</p>
			</div>
			<div className='py-6'>
				<UpdateArticleForm defaultValues={defaultValues} id={id} />
			</div>
		</div>
	);
}
