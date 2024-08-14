'use server';

import prisma from '@/db/db';
import { uploadImage } from '../images/upload-image';
import { auth } from '@/auth';
import { checkUser } from '../auth/check-user';

type CreateAdFormFields = {
	title?: string;
	destinationUrl: string;
	type: string;
};

export const createAd = async (fields: CreateAdFormFields, imageFormData: FormData) => {
	try {
		const session = await auth();

		if (!session) {
			return { ok: false, message: 'Unauthenticated' };
		}

		const userDataFromDb = await checkUser(session.user.id);

		if (!userDataFromDb.user?.roles?.includes('admin') || userDataFromDb.user?.banned) {
			return {
				ok: false,
				message: 'Not authorized',
			};
		}

		const image = imageFormData.get('image');
		const uploadedImageUrl = await uploadImage(image as File);

		console.log(uploadedImageUrl);

		await prisma.advertisement.create({
			data: {
				title: fields.title ?? '',
				mediaLink: uploadedImageUrl,
				destinationUrl: fields.destinationUrl,
				vertical: fields.type === 'vertical',
			},
		});

		return { ok: true };
	} catch (error) {
		console.log(error);
		return { ok: false, message: 'Unknown error while creating the AD' };
	}
};
