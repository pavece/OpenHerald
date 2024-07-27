'use server';

import { uploadImage } from './upload-image';

export const uploadImageFromClient = async (formData: FormData) => {
	const image = formData.get('image') as File;
	return await uploadImage(image);
};
