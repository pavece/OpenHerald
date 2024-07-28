'use client';

import { CreateArticleForm } from '../../../components/admin/publish/create-article-form';

export default function Publish() {
	return (
		<div className='pt-2'>
			<h1 className='text-xl'>Publish a new article</h1>
			<p className='text-zinc-500'>Fill the form to publish a new article</p>
			<div className='py-6'>
				<CreateArticleForm />
			</div>
		</div>
	);
}
