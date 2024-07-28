'use server';
import { v2 as cloudinary } from 'cloudinary';

export const uploadImage = async (image: File) => {
	try {
		cloudinary.config({
			api_key: process.env.CLOUDINARY_API_KEY,
			api_secret: process.env.CLOUDINARY_SECRET,
			cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
		});

		const arrayBuffer = await image.arrayBuffer();
		const base64 = Buffer.from(arrayBuffer).toString('base64');
		const result = cloudinary.uploader.upload(`data:image/png;base64,${base64}`).then(resp => resp.secure_url);
		return result;
	} catch (error) {
		console.log(error);
		return '';
	}
};
