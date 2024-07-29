'use client';

import z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { PiWarning } from 'react-icons/pi';

import { createArticle } from '@/actions/articles/create-article';
import { CreateUpdateFormFields } from './create-update-form-fields';
import { signOut } from '@/auth';

const formSchema = z.object({
	title: z
		.string()
		.min(5, 'Title should have at least 5 characters')
		.max(300, 'Title is too long (max 300 characters)'),
	description: z
		.string()
		.min(10, 'Description should have at least 10 characters')
		.max(500, 'Description is too long (max 500 characters)'),
	thumbnail: z.any().refine(files => files?.length == 1, 'Thumbnail is required.'),
	priority: z.string({ required_error: 'Please select a priority' }),
	category: z.string().refine(c => c !== '', 'Please select a category'),
	readingTime: z.coerce.number(),
	content: z
		.string()
		.min(100, 'Content should have at least 100 characters')
		.max(5000, 'Content is too long (max 5000 characters)'),
	showAds: z.boolean(),
	verticalAds: z.enum(['none', 'left', 'right']),
	horizontalAds: z.boolean(),
	visibleForUsers: z.boolean(),
});

const defaultValues: z.infer<typeof formSchema> = {
	title: '',
	description: '',
	thumbnail: null,
	priority: '3',
	category: '',
	readingTime: 1,
	content: '',
	showAds: true,
	verticalAds: 'right',
	horizontalAds: true,
	visibleForUsers: false,
};

export const CreateArticleForm = () => {
	const router = useRouter();
	const [isUploading, setIsUploading] = useState(false);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: defaultValues,
	});

	const submitForm = async (values: z.infer<typeof formSchema>) => {
		const { thumbnail, priority, ...rest } = values;

		const thumbnailAsFormData = new FormData();
		thumbnailAsFormData.append('thumbnail', thumbnail[0]);

		setIsUploading(true);
		const result = await createArticle(
			{
				thumbnail: '',
				priority: Number(priority),
				...rest,
			},
			thumbnailAsFormData
		);
		setIsUploading(false);

		if (result.ok) {
			router.replace(`/admin/article/edit/${result.article?.id}`);
			return;
		}

		if (result.banned) {
			signOut();
			return;
		}

		toast('Error', {
			description: 'An error ocurred while trying to publish the article',
			duration: 5000,
			icon: <PiWarning size={24} />,
			className: 'text-red-400 gap-4 border-red-400',
		});
	};

	return (
		<>
			<CreateUpdateFormFields form={form} isUploading={isUploading} submitForm={submitForm} />
		</>
	);
};
