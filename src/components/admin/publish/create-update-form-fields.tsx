'use client';

import { Suspense, useEffect, useState } from 'react';

import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectValue, SelectTrigger } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { MdxEditorComponent } from './mdx-editor-component';
import { FormImagePreview } from './form-image-preview';
import { PiFloppyDiskBack, PiWarningOctagon } from 'react-icons/pi';

type Props = {
	form: any;
	isUploading: boolean;
	update?: boolean;
	submitForm: (values: any) => void;
};

export const CreateUpdateFormFields = ({ form, isUploading, update = false, submitForm }: Props) => {
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(submitForm)}>
				<div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
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
									<FormImagePreview image={form.getValues().thumbnail} />
									<FormDescription>Upload any image to replace the current one.</FormDescription>
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
										<Select {...field} onValueChange={field.onChange} defaultValue={field.value.toString()}>
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
							name='category'
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Category</FormLabel>

									<Select onValueChange={field.onChange} value={field.value}>
										<FormControl>
											<SelectTrigger className='w-[260px]'>
												<SelectValue placeholder='Select category' />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectItem value='politics'>Politics</SelectItem>
											<SelectItem value='technology'>Technology</SelectItem>
										</SelectContent>
									</Select>
									<FormMessage />
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
										<Input placeholder='' type='number' min={1} max={20} {...field} className='bg-white w-[180px]' />
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
									<FormControl>
										<Suspense fallback={null}>
											<MdxEditorComponent markdown={field.value} {...field} />
										</Suspense>
									</FormControl>
									<FormDescription>
										This editor uses <span className='font-semibold'>markdown</span> you can learn more about it{' '}
										<Link href='https://www.markdownguide.org/basic-syntax/' rel='noopener noreferrer' target='_blank'>
											<span className='font-semibold underline'>here</span>
										</Link>
										.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						></FormField>
					</div>
				</div>

				<div className='mt-6'>
					<div>
						<h3 className='text-xl'>Ads</h3>
						<p className='text-sm text-zinc-500'>
							If you want you can modify these options to control the post{"'s"} ads
						</p>
					</div>
					<div className='space-y-4 mt-4'>
						<FormField
							name='showAds'
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<div className='flex items-center justify-start gap-2'>
										<FormLabel>Show ADS</FormLabel>
										<FormControl>
											<Switch checked={field.value} onCheckedChange={field.onChange} />
										</FormControl>
									</div>
									<FormDescription>If unchecked the post won{"'"}t show ads.</FormDescription>
								</FormItem>
							)}
						></FormField>
						<FormField
							name='verticalAds'
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Vertical ADS</FormLabel>
									<Select
										{...field}
										onValueChange={field.onChange}
										defaultValue={field.value}
										disabled={!form.getValues().showAds}
									>
										<FormControl>
											<SelectTrigger className='w-[180px]'>
												<SelectValue placeholder='Vertical ads' />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectItem value='none'>None</SelectItem>
											<SelectItem value='left'>Left</SelectItem>
											<SelectItem value='right'>Right</SelectItem>
										</SelectContent>
									</Select>

									<FormDescription>Select where vertical ads show</FormDescription>
								</FormItem>
							)}
						></FormField>
						<FormField
							name='horizontalAds'
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<div className='flex items-center justify-start gap-2'>
										<FormLabel>Horizontal ADS</FormLabel>
										<FormControl>
											<Switch
												checked={field.value}
												onCheckedChange={field.onChange}
												disabled={!form.getValues().showAds}
											/>
										</FormControl>
									</div>
									<FormDescription>If unchecked the post won{"'"}t show horizontal ads.</FormDescription>
								</FormItem>
							)}
						></FormField>
					</div>

					<hr className='mt-4' />

					<div className='space-y-4 mt-4'>
						<div>
							<h3 className='text-xl text-red-600 flex items-center justify-start'>
								<PiWarningOctagon size={24} className='mr-2' /> Danger zone
							</h3>
							<p className='text-sm text-red-500'>
								Remember to verify all the information before making an article visible for users.
							</p>
						</div>

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

						<Button className='w-[200px]' type='submit' disabled={isUploading}>
							<PiFloppyDiskBack size={24} className='mr-2' />
							{isUploading ? 'Loading...' : update ? 'Update' : 'Publish'}
						</Button>
						<p className='text-sm text-zinc-500'>
							You can {update ? 'update' : 'publish'} the post in order to save changes, and come back later to finish
							editing. Just check the visible for users switch when you finish.
						</p>
					</div>
				</div>
			</form>
		</Form>
	);
};
