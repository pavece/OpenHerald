'use client';

import { adminProfileUpdate } from '@/actions/profile-config/admin-profile-config';
import { updateUserById } from '@/actions/profile-config/update-user-by-id';
import { ProfileConfigFormFields } from '@/components/admin/user-profile/profile-config-formfields';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
	name: z.string().min(2, {
		message: 'Username must be at least 2 characters.',
	}),
	email: z.string().email(),
	description: z.string().max(400, { message: 'Description cannot exceed 400 characters' }),
	picture: z.any(),
	role: z.enum(['super-admin', 'admin', 'editor']),
});

type Props = {
	user: {
		name: string | null;
		email: string;
		isGoogle: boolean;
		image: string | null;
		description: string | null;
		roles: string[];
	};
	userId: string;
};

export const ConfigureProfileForm = ({ user, userId }: Props) => {
	const session = useSession();
	const [loading, setLoading] = useState(false);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: user.name ?? '',
			email: user.email,
			description: user.description ?? '',
			picture: user.image,
			role: user.roles[0] as any,
		},
	});

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		setLoading(true);

		let imageFormData: FormData | undefined = undefined;
		const { picture, ...rest } = values;

		if (picture && typeof picture !== 'string') {
			imageFormData = new FormData();
			imageFormData.append('image', (picture as File[])[0]);
		}

		const result = await adminProfileUpdate(userId, { ...rest }, imageFormData);

		console.log(result);

		if (result.ok) {
			setLoading(false);
		}
	};

	return <ProfileConfigFormFields form={form} onSubmit={onSubmit} isGoogle={user.isGoogle} loading={loading} admin />;
};
