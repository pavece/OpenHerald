'use server';

import prisma from '@/db/db';
import { uploadImage } from '../images/upload-image';
import { getUserById } from './get-user-by-id';
import { auth } from '@/auth';

const roles = {
	'super-admin': ['super-admin', 'admin', 'editor'],
	admin: ['admin', 'editor'],
	editor: ['editor'],
};

type Fields = {
	name: string;
	email: string;
	description?: string | null;
	role: 'super-admin' | 'admin' | 'editor';
};

export const adminProfileUpdate = async (id: string, fields: Fields, imageFormData?: FormData) => {
	try {
		const originalUserProps = await getUserById(id);

		if (!originalUserProps.ok) {
			return {
				ok: false,
				message: originalUserProps.message,
			};
		}

		const session = await auth();

		const updaterProps: any = { description: fields.description, name: fields.name };

		if (!(!session?.user.roles.includes('super-admin') && fields.role === 'super-admin')) {
			updaterProps.roles = roles[fields.role];
		}

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
