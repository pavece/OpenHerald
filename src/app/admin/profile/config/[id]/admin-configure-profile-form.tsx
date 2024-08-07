'use client';

import { adminProfileUpdate } from '@/actions/profile-config/admin-profile-config';
import { toggleUserBan } from '@/actions/profile-config/toggle-user-ban';
import { updateUserById } from '@/actions/profile-config/update-user-by-id';
import { ProfileConfigFormFields } from '@/components/admin/user-profile/profile-config-formfields';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { PiWarning } from 'react-icons/pi';
import { toast } from 'sonner';
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
		banned: boolean;
	};
	userId: string;
};

export const ConfigureProfileForm = ({ user, userId }: Props) => {
	const router = useRouter();
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

		if (result.ok) {
			setLoading(false);
			router.refresh();
			return;
		}

		toast('Error', {
			description: `An error ocurred while trying to update the article, Error: ${result.message}`,
			duration: 5000,
			icon: <PiWarning size={24} />,
			className: 'text-red-400 gap-4 border-red-400',
		});
	};

	const toggleBan = async () => {
		await toggleUserBan(userId);
		router.refresh();
	};

	return (
		<ProfileConfigFormFields
			form={form}
			onSubmit={onSubmit}
			onBan={toggleBan}
			isGoogle={user.isGoogle}
			loading={loading}
			admin
			banned={user.banned}
		/>
	);
};
