'use client';

import Image from 'next/image';
import { useState } from 'react';

type Props = {
	url: string;
	alt: string;
	className?: string;
};

export const ImageContainer = ({ className, url, alt }: Props) => {
	const [loaded, setLoaded] = useState(false);

	return (
		<div className={`relative rounded-md h-[300px] ${className}`}>
			<div className={`w-full h-full rounded-md bg-zinc-300 animate-pulse ${loaded && 'hidden'}`}></div>
			<Image className='rounded-md fill object-cover' src={url} alt={alt} fill onLoad={() => setLoaded(true)} />
		</div>
	);
};
