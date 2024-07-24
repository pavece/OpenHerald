'use client';

import z from 'zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectValue, SelectTrigger, SelectLabel } from '@/components/ui/select';

import {
	headingsPlugin,
	listsPlugin,
	quotePlugin,
	thematicBreakPlugin,
	markdownShortcutPlugin,
	MDXEditor,
	type MDXEditorMethods,
	type MDXEditorProps,
	toolbarPlugin,
	UndoRedo,
	BoldItalicUnderlineToggles,
	CreateLink,
	InsertImage,
	DiffSourceToggleWrapper,
	BlockTypeSelect,
	linkDialogPlugin,
	diffSourcePlugin,
	imagePlugin,
} from '@mdxeditor/editor';
import '@mdxeditor/editor/style.css';
import { Diff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z.object({
	title: z.string().min(5).max(300),
	description: z.string().min(10).max(500),
	thumbnail: z.string(),
	priority: z.string(),
	readingTime: z.number(),
	content: z.string().min(100).max(5000),
});

const defaultValues = {
	title: '',
	description: '',
	thumbnail: '',
	priority: '3',
	readingTIme: 0,
	content: '',
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
				<form onSubmit={form.handleSubmit(submitForm)} className='space-y-4'>
					<FormField
						name='title'
						control={form.control}
						render={({ field }) => (
							<FormItem>
								<FormLabel>Title</FormLabel>
								<FormControl>
									<Input placeholder='Some title' {...field} />
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
									<Input type='file' {...field} />
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
									<Input placeholder='' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					></FormField>

					<FormField
						name='content'
						control={form.control}
						render={({ field }) => (
							<FormItem>
								<FormLabel>Content</FormLabel>
								<FormMessage />
								<FormControl>
									<MDXEditor
										{...field}
										markdown={form.getValues().content}
										contentEditableClassName='prose'
										plugins={[
											// Example Plugin Usage
											headingsPlugin(),
											thematicBreakPlugin(),
											markdownShortcutPlugin(),
											linkDialogPlugin(),
											diffSourcePlugin(),
											imagePlugin(),
											toolbarPlugin({
												toolbarContents: () => (
													<>
														<UndoRedo />
														<BoldItalicUnderlineToggles />
														<CreateLink />
														<InsertImage />
														<BlockTypeSelect />
														<DiffSourceToggleWrapper>
															<Diff />
														</DiffSourceToggleWrapper>
													</>
												),
											}),
										]}
									></MDXEditor>
								</FormControl>
							</FormItem>
						)}
					></FormField>

					<Button className='w-[200px]' type='submit'>
						Publish
					</Button>
				</form>
			</Form>
		</>
	);
};
