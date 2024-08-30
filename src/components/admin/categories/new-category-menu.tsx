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

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { createCategory } from '@/actions/categories/create-category';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { PiPlus, PiWarning } from 'react-icons/pi';
import { useState } from 'react';

const formSchema = z.object({
	name: z
		.string()
		.min(2, {
			message: 'Name must be at least 2 characters.',
		})
		.max(50, { message: 'Name must be shorter than 50 characters.' })
		.refine(s => !s.includes(' '), 'Name cannot include spaces'),
	description: z.string().max(200, { message: 'Description must be shorter than 200 characters.' }).optional(),
});

export const NewCategoryMenu = () => {
	const [open, setOpen] = useState(false);

	const router = useRouter();
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: '',
		},
	});

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		const result = await createCategory(values);

		if (!result.ok) {
			toast('Error', {
				description: `Error while creating a new category, ${result.message}`,
				duration: 5000,
				icon: <PiWarning size={24} />,
				className: 'text-red-400 gap-4 border-red-400',
			});
			return;
		}

		setOpen(false);
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<Button asChild>
				<DialogTrigger>
					<PiPlus size={22} className='mr-2' />
					Create new
				</DialogTrigger>
			</Button>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Add new category</DialogTitle>
					<DialogDescription>Fill the form to add a new category.</DialogDescription>
				</DialogHeader>
				<div>
					<Form {...form}>
						<form action='' onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
							<FormField
								control={form.control}
								name='name'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Name</FormLabel>
										<FormControl>
											<Input placeholder='Politics' className='bg-white' {...field} />
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
											<Textarea placeholder='some description...' {...field} />
										</FormControl>
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
