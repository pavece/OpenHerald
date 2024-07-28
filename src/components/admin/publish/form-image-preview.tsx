'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';

type Props = {
	image: any;
};

export const FormImagePreview = ({ image }: Props) => {
	const [src, setSrc] = useState('');

	useEffect(() => {
		if (typeof image === 'string') {
			setSrc(image);
		}

		if (image instanceof FileList) {
			setSrc(URL.createObjectURL(image[0]));
		}
	}, [image]);

	return (
		<div className='w-full'>
			{src !== '' && (
				<Image src={src} alt='Image preview' height={120} width={200} className='my-2 max-w-[130px] rounded-md'></Image>
			)}
		</div>
	);
};
