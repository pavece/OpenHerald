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
import { ISiteConfig, updateSiteConfig } from '@/actions/site-config/update-site-config';
import { useRouter } from 'next/navigation';
import { PiWarning } from 'react-icons/pi';
import { toast } from 'sonner';
import { useEffect, useState } from 'react';
import { getSiteConfig } from '@/actions/site-config/get-site-config';
import { getCategories } from '@/actions/categories/get-categories';

const formSchema = z.object({
	siteName: z.string().min(2).max(50),
	siteDescription: z.string().min(2).max(350),
	navbarCategories: z.array(z.string()),
	mainPageCategories: z.array(z.string()),
});

const defaults: ISiteConfig = {
	siteName: 'OpenHerald',
	siteDescription: 'OpenHerald description',
	navbarCategories: [],
	mainPageCategories: [],
};

export default function SiteConfig() {
	const router = useRouter();
	const [defaultValues, setDefaultValues] = useState(defaults);
	const [availCategories, setAvailCategories] = useState<string[]>([]);
	const [updating, setUpdating] = useState(false);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: defaultValues,
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		setUpdating(true);
		const { ok, message } = await updateSiteConfig(values);
		setUpdating(false);

		if (ok) {
			router.refresh();
			return;
		}

		toast('Error', {
			description: message,
			duration: 5000,
			icon: <PiWarning size={24} />,
			className: 'text-red-400 gap-4 border-red-400',
		});
	}

	useEffect(() => {
		const fetchData = async () => {
			const { categories } = await getCategories();
			const { config } = await getSiteConfig();

			setDefaultValues(config);

			if (categories) {
				const parsed = categories.map(c => c.name);
				setAvailCategories(parsed);
			}
		};

		fetchData();
	}, []);

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
							name='siteName'
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
							name='navbarCategories'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Nav bar categories</FormLabel>
									<FormControl>
										<CategorySelector
											validCategories={availCategories}
											onChange={field.onChange}
											initialSelection={defaultValues.navbarCategories}
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
												validCategories={availCategories}
												onChange={field.onChange}
												initialSelection={defaultValues.mainPageCategories}
											/>
										</FormControl>
									</FormControl>
									<FormDescription>Determines the category sections that show up on the main screen.</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>

						<Button type='submit' disabled={updating}>
							{updating ? 'Updating...' : 'Update'}
						</Button>
					</form>
				</Form>
			</div>
		</div>
	);
}
