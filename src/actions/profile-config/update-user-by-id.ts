'use server';

import prisma from '@/db/db';
import { uploadImage } from '../images/upload-image';
import { getUserById } from './get-user-by-id';

type Fields = {
	name: string;
	email: string;
	description?: string | null;
};

export const updateUserById = async (id: string, fields: Fields, imageFormData?: FormData) => {
	try {
		const originalUserProps = await getUserById(id); //Does the auth check too

		if (!originalUserProps.ok) {
			return {
				ok: false,
				message: 'User not found',
			};
		}

		const updaterProps: any = { description: fields.description };

		if (!originalUserProps.user?.isGoogle) {
			updaterProps.email = fields.email;
		}

		if (imageFormData) {
			const image = imageFormData.get('image') as File;
			const imageUrl = await uploadImage(image);
			updaterProps.image = imageUrl;
		}

		const user = await prisma.user.update({
			where: { id },
			data: { ...updaterProps },
			select: { name: true, image: true, description: true, email: true },
		});

		return {
			ok: true,
			user,
		};
	} catch (error) {
		return {
			ok: false,
			message: 'Something went wrong while updating the user',
		};
	}
};
