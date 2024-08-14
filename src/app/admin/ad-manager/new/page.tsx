'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { NavBar } from '@/components/admin/nav-bar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FormImagePreview } from '@/components/admin/publish/form-image-preview';
import { VerticalAD } from '@/components/ads/vertical-ad';
import { HorizontalAd } from '@/components/ads/horizontal-ad';

const formSchema = z.object({
	title: z.string().optional(),
	destinationUrl: z.string().url(),
	image: z.any().refine(files => !(!files || files[0] instanceof File), 'Ad image is required'),
	type: z.string(),
});

export default function CreateAdPage() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: '',
			destinationUrl: '',
			image: null,
			type: 'vertical',
		},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		console.log(values);
	}

	return (
		<div>
			<NavBar className='hidden md:flex mb-4' title='Create a new AD' subtitle='Fill the form to add a new AD.' />
			<div className='md:hidden'>
				<h1 className='text-xl'>Create new AD</h1>
				<p className='text-zinc-500'>Fill the form to add a new AD.</p>
			</div>
			<div className='md:grid grid-cols-2 gap-4'>
				<div>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
							<FormField
								control={form.control}
								name='title'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Title (optional)</FormLabel>
										<FormControl>
											<Input placeholder='Some title...' {...field} />
										</FormControl>
										<FormDescription>Title will be displayed inside the ad.</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='destinationUrl'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Destination URL</FormLabel>
										<FormControl>
											<Input placeholder='https://example.com' {...field} />
										</FormControl>
										<FormDescription>
											The page you want people to be redirected to when the AD is clicked.
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='image'
								render={({ field: { onChange, value, ...fieldProps } }) => (
									<FormItem>
										<FormLabel>Ad image</FormLabel>
										<FormControl>
											<Input
												type='file'
												onChange={e => onChange(e.target.files)}
												className='bg-white max-w-[400px]'
												accept='image/jpg image/png image/jpeg image/webp'
												{...fieldProps}
											/>
										</FormControl>

										<FormImagePreview image={form.getValues().image} />
										<FormDescription>Upload any image to replace the current one.</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name='type'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Type</FormLabel>
										<FormControl>
											<Select {...field} onValueChange={field.onChange} defaultValue={field.value.toString()}>
												<SelectTrigger className='w-[260px]'>
													<SelectValue placeholder='Priority' />
												</SelectTrigger>
												<SelectContent>
													<SelectItem value='vertical'>Vertical</SelectItem>
													<SelectItem value='horizontal'>Horizontal</SelectItem>
												</SelectContent>
											</Select>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<Button type='submit'>Create</Button>
						</form>
					</Form>
				</div>
				<div className='hidden md:block'>
					<h1 className='text-lg'>Preview</h1>
					{form.getValues('type') === 'vertical' ? (
						<VerticalAD
							link={form.getValues('destinationUrl')}
							description={form.getValues('title')}
							src={form.getValues('image') ? URL.createObjectURL(form.getValues('image')?.[0]) : ''}
							relative
						/>
					) : (
						<HorizontalAd
							link={form.getValues('destinationUrl')}
							description={form.getValues('title')}
							src={form.getValues('image') ? URL.createObjectURL(form.getValues('image')?.[0]) : ''}
						/>
					)}
				</div>
			</div>
		</div>
	);
}
