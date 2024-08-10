'use client';

import z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { PiWarning } from 'react-icons/pi';

import { signOut } from 'next-auth/react';
import { updateArticle } from '@/actions/articles/update-article';
import { CreateUpdateFormFields } from './create-update-form-fields';
import { Category } from '@prisma/client';

const formSchema = z.object({
	title: z
		.string()
		.min(5, 'Title should have at least 5 characters')
		.max(300, 'Title is too long (max 300 characters)'),
	description: z
		.string()
		.min(10, 'Description should have at least 10 characters')
		.max(500, 'Description is too long (max 500 characters)'),
	thumbnail: z.any(),
	priority: z.string({ required_error: 'Please select a priority' }),
	category: z.string({ required_error: 'Please select a category' }),
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

type Props = {
	defaultValues: z.infer<typeof formSchema>;
	id: string;
};

export const UpdateArticleForm = ({ defaultValues, id }: Props) => {
	const router = useRouter();
	const [isUploading, setIsUploading] = useState(false);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues,
	});

	const submitForm = async (values: z.infer<typeof formSchema>) => {
		const { thumbnail, priority, ...rest } = values;

		setIsUploading(true);

		let result = null;

		if (thumbnail instanceof FileList) {
			const thumbnailAsFormData = new FormData();
			thumbnailAsFormData.append('image', thumbnail[0]);

			console.log(thumbnail);

			result = await updateArticle(id, { priority: Number(priority), ...rest }, thumbnailAsFormData);
		} else {
			result = await updateArticle(id, { priority: Number(priority), ...rest });
		}

		if (result.ok) {
			router.refresh();
		}

		if (result.banned) {
			await signOut();
		}

		if (!result.ok) {
			toast('Error', {
				description: 'An error ocurred while trying to update the article',
				duration: 5000,
				icon: <PiWarning size={24} />,
				className: 'text-red-400 gap-4 border-red-400',
			});
		}

		setIsUploading(false);
	};

	return (
		<>
			<CreateUpdateFormFields form={form} isUploading={isUploading} update submitForm={submitForm} />
		</>
	);
};
