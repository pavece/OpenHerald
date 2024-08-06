'use client';

import { ProfileConfigFormFields } from '@/components/admin/user-profile/profile-config-formfields';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
	name: z.string().min(2, {
		message: 'Username must be at least 2 characters.',
	}),
	email: z.string().email(),
	description: z.string().max(400, { message: 'Description cannot exceed 400 characters' }),
	picture: z.any(),
});

export const ConfigureProfileForm = () => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: '',
			email: '',
			description: '',
			picture: null,
		},
	});

	const onSubmit = (values: z.infer<typeof formSchema>) => {
		console.log(values);
	};

	return <ProfileConfigFormFields form={form} onSubmit={onSubmit} />;
};
