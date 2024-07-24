'use client';

import z from 'zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectValue, SelectTrigger } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { MdxEditorComponent } from './mdx-editor-component';
import { Switch } from '@/components/ui/switch';

const formSchema = z.object({
	title: z.string().min(5).max(300),
	description: z.string().min(10).max(500),
	thumbnail: z.string(),
	priority: z.string(),
	readingTime: z.string(),
	content: z.string().min(100).max(5000),
	visibleForUsers: z.boolean(),
});

const defaultValues = {
	title: '',
	description: '',
	thumbnail: '',
	priority: '3',
	readingTIme: 0,
	content: '',
	visibleForUsers: false,
};

export const PublishPostForm = () => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues,
	});

	const submitForm = (values: z.infer<typeof formSchema>) => {
		console.log(form.getValues());
	};

	return (
		<>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(submitForm)} className=' grid grid-cols-1 lg:grid-cols-2 md:gap-4'>
					<div className='space-y-4'>
						<FormField
							name='title'
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Title</FormLabel>
									<FormControl>
										<Input placeholder='Some title' {...field} className='bg-white' />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						></FormField>

						<FormField
							name='description'
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Description</FormLabel>
									<FormControl>
										<Textarea placeholder='Description' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						></FormField>

						<FormField
							name='thumbnail'
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Thumbnail</FormLabel>
									<FormControl>
										<Input type='file' {...field} className='bg-white' />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						></FormField>

						<FormField
							name='priority'
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Priority</FormLabel>

									<FormControl>
										<Select {...field}>
											<SelectTrigger className='w-[260px]'>
												<SelectValue placeholder='Priority' />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value='1'>Featured (1)</SelectItem>
												<SelectItem value='2'>Cover (2)</SelectItem>
												<SelectItem value='3'>Normal (3)</SelectItem>
											</SelectContent>
										</Select>
									</FormControl>
									<FormMessage />
									<FormDescription>
										Determines if a post is more or less important. (1) will make a post appear as the featured post for
										the day (2) will make it show in the cover etc...
									</FormDescription>
								</FormItem>
							)}
						></FormField>

						<FormField
							name='readingTime'
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Reading time (minutes)</FormLabel>
									<FormControl>
										<Input placeholder='' type='number' min={1} max={20} {...field} className='bg-white' />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						></FormField>
					</div>
					<div className='space-y-4'>
						<FormField
							name='content'
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Content</FormLabel>
									<FormMessage />
									<FormControl>
										<MdxEditorComponent markdown={form.getValues().content} {...field} />
									</FormControl>
								</FormItem>
							)}
						></FormField>

						<FormField
							name='visibleForUsers'
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<div className='flex items-center justify-start gap-2'>
										<FormLabel>Visible for users</FormLabel>
										<FormControl>
											<Switch checked={field.value} onCheckedChange={field.onChange} />
										</FormControl>
									</div>
									<FormDescription>Check this switch to make the article visible for everyone.</FormDescription>
								</FormItem>
							)}
						></FormField>

						<Button className='w-[200px]' type='submit'>
							Publish
						</Button>
						<p className='text-sm text-zinc-500'>
							You can publish the post in order to save changes, and come back later to finish editing. Just check the
							visible for users switch when you finish.
						</p>
					</div>
				</form>
			</Form>
		</>
	);
};
