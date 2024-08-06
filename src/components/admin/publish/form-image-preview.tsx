'use client';
import clsx from 'clsx';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

type Props = {
	image: any;
	square?: boolean;
};

export const FormImagePreview = ({ image, square }: Props) => {
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
			className={clsx('relative', {
				'max-w-[320px]': !square,
				'h-[180px]': src !== '' && !square,
				'max-w-[150px]': square,
				'h-[150px]': square && src !== '',
			})}
		>
			{src !== '' && <Image src={src} alt='Image preview' className='rounded-md fill object-cover' fill />}
		</div>
	);
};
