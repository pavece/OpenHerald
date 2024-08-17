'use client';

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { PiWarning } from 'react-icons/pi';
import { useState } from 'react';
import { Switch } from '@/components/ui/switch';
import { ColorPicker } from '@/components/ui/color-picker';
import { createBanner } from '@/actions/banners/create-banner';

const formSchema = z.object({
	text: z
		.string()
		.min(5, { message: 'Text should be at least 5 characters long.' })
		.max(100, { message: 'Text cannot be longer than 100 characters.' }),
	bgColor: z.string(),
	textColor: z.string(),
	showIcon: z.boolean(),
});

export const NewBannerMenu = () => {
	const [open, setOpen] = useState(false);

	const router = useRouter();
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			text: '',
			bgColor: '#FFDA76',
			textColor: '#1E201E',
			showIcon: true,
		},
	});

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		const result = await createBanner(values);

		if (!result.ok) {
			toast('Error', {
				description: `Error while creating a new category, ${result.message}`,
				duration: 5000,
				icon: <PiWarning size={24} />,
				className: 'text-red-400 gap-4 border-red-400',
			});
			return;
		}

		router.refresh();
		setOpen(false);
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<Button asChild variant='outline'>
				<DialogTrigger>Add new</DialogTrigger>
			</Button>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Add new banner</DialogTitle>
					<DialogDescription>Fill the form to add a new banner.</DialogDescription>
				</DialogHeader>
				<div>
					<Form {...form}>
						<form action='' onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
							<FormField
								control={form.control}
								name='text'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Text</FormLabel>
										<FormControl>
											<Input placeholder='Our new service launched!' className='bg-white' {...field} />
										</FormControl>
										<FormDescription>The banner{"'s"} content.</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name='bgColor'
								render={({ field }) => (
									<FormItem>
										<div className='flex flex-col gap-2'>
											<FormLabel>Background color</FormLabel>
											<FormControl>
												<ColorPicker value={field.value} onColorChange={field.onChange} />
											</FormControl>
										</div>
										<FormDescription>Click to change the color.</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name='textColor'
								render={({ field }) => (
									<FormItem>
										<div className='flex flex-col gap-2'>
											<FormLabel>Text color</FormLabel>
											<FormControl>
												<ColorPicker value={field.value} onColorChange={field.onChange} />
											</FormControl>
										</div>
										<FormDescription>Click to change the color.</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name='showIcon'
								render={({ field }) => (
									<FormItem>
										<div className='flex items-center justify-start gap-2'>
											<FormLabel>Show icon</FormLabel>
											<FormControl>
												<Switch checked={field.value} onCheckedChange={field.onChange} />
											</FormControl>
										</div>
										<FormDescription>Determines if the megaphone icon is shown.</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>

							<Button>Create</Button>
						</form>
					</Form>
				</div>
			</DialogContent>
		</Dialog>
	);
};
