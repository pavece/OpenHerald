import { PublishPostForm } from './publish-post-form';

export default function Publish() {
	return (
		<div className='pt-2'>
			<h1 className='text-xl'>Publish a new post</h1>
			<p className='text-zinc-500'>Fill the form to publish a new post</p>
			<div className='py-6'>
				<PublishPostForm />
			</div>
		</div>
	);
}
