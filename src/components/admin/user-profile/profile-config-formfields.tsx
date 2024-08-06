'use client';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { FormImagePreview } from '@/components/admin/publish/form-image-preview';

type Props = {
	form: any;
	isGoogle?: boolean;
	loading: boolean;
	onSubmit: (params: any) => void;
};

export const ProfileConfigFormFields = ({ form, isGoogle, loading, onSubmit }: Props) => {
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
				<FormField
					control={form.control}
					name='name'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Name</FormLabel>
							<FormControl>
								<Input placeholder='John Doe' className='bg-white' {...field} />
							</FormControl>
							<FormDescription>Public display name.</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='email'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input disabled={isGoogle} placeholder='some@email.com' className='bg-white' type='email' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='description'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Description (optional)</FormLabel>
							<FormControl>
								<Textarea className='md:h-[130px]' placeholder='Some description' {...field} />
							</FormControl>
							<FormDescription>Write a short description about your work.</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					name='picture'
					control={form.control}
					render={({ field: { onChange, value, ...fieldProps } }) => (
						<FormItem>
							<FormLabel>Thumbnail</FormLabel>
							<FormControl>
								<Input
									type='file'
									onChange={e => onChange(e.target.files)}
									className='bg-white max-w-[400px]'
									accept='image/jpg image/png image/jpeg image/webp'
									{...fieldProps}
								/>
							</FormControl>
							<FormMessage />
							<FormImagePreview image={form.getValues().picture} square />
							<FormDescription>Upload any image to replace the current one.</FormDescription>
						</FormItem>
					)}
				></FormField>

				<div>
					<Button className='min-w-[180px]' type='submit' disabled={loading}>
						{loading ? 'Loading...' : 'Update'}
					</Button>
					<p className='text-zinc-500 text-sm mt-2'>
						Some visual changes may require you to log out and log back in to take effect.
					</p>
				</div>
			</form>
		</Form>
	);
};
