'use client';

import { NavBar } from '@/components/admin/nav-bar';
import { CreateArticleForm } from '../../../components/admin/publish/create-article-form';

export default function Publish() {
	return (
		<div className='pt-2'>
			<NavBar
				className='hidden md:flex mb-4'
				title='Publish a new article'
				subtitle='Fill the form to publish a new article'
			/>
			<div className='md:hidden'>
				<h1 className='text-xl'>Publish a new article</h1>
				<p className='text-zinc-500'>Fill the form to publish a new article</p>
			</div>
			<div className='py-6'>
				<CreateArticleForm />
			</div>
		</div>
	);
}
