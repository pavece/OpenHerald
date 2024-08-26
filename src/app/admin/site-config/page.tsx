'use client';

import { z } from 'zod';
import { NavBar } from '@/components/admin/nav-bar';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { CategorySelector } from './category-selector';

const formSchema = z.object({
	siteTitle: z.string().min(2).max(50),
	siteDescription: z.string().min(2).max(350),
	navBarCategories: z.array(z.string()),
	mainPageCategories: z.array(z.string()),
});

export default function SiteConfig() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			siteTitle: 'OpenHerald',
			siteDescription: 'OpenHerald description',
			navBarCategories: ['Tech'],
			mainPageCategories: [],
		},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		console.log(values);
	}

	return (
		<div className='pt-2'>
			<NavBar className='hidden md:flex mb-4' title='Site config' subtitle='Configure some site options.' />
			<div className='md:hidden'>
				<h1 className='text-xl'>Site config</h1>
				<p className='text-zinc-500'>COnfigure some site options.</p>
			</div>

			<div className='w-full flex items-center justify-center'>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 w-full md:w-[600px]'>
						<FormField
							control={form.control}
							name='siteTitle'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Site title</FormLabel>
									<FormControl>
										<Input placeholder='OpenHerald' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='siteDescription'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Site description</FormLabel>
									<FormControl>
										<Textarea placeholder='Some description...' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='navBarCategories'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Nav bar categories</FormLabel>
									<FormControl>
										<CategorySelector
											validCategories={['Politics', 'Tech']}
											onChange={field.onChange}
											initialSelection={field.value}
										/>
									</FormControl>
									<FormDescription>Determines the categories that show up on the navbar.</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='mainPageCategories'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Main page categories</FormLabel>
									<FormControl>
										<FormControl>
											<CategorySelector
												validCategories={['Politics', 'Tech']}
												onChange={field.onChange}
												initialSelection={field.value}
											/>
										</FormControl>
									</FormControl>
									<FormDescription>Determines the category sections that show up on the main screen.</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>

						<Button type='submit'>Submit</Button>
					</form>
				</Form>
			</div>
		</div>
	);
}
