'use client';
import clsx from 'clsx';
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
		<div
			className={clsx('max-w-[320px]  relative', {
				'h-[180px]': src !== '',
			})}
		>
			{src !== '' && <Image src={src} alt='Image preview' className='rounded-md fill object-cover' fill />}
		</div>
	);
};
