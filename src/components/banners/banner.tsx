'use client';

import { cropText } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { PiMegaphone, PiX } from 'react-icons/pi';

type Props = {
	id: string;
	bgColor: string;
	text: string;
	showIcon?: boolean;
};

export const Banner = ({ id, text, bgColor, showIcon }: Props) => {
	const [hidden, setHidden] = useState(true);

	useEffect(() => {
		const closedBanners: string[] = JSON.parse(localStorage.getItem('closed-banners') ?? '[]');
		if (!closedBanners.includes(id)) {
			setHidden(false);
		}
	}, [id]);

	const closeBanner = () => {
		const closedBanners = JSON.parse(localStorage.getItem('closed-banners') ?? '[]');
		localStorage.setItem('closed-banners', JSON.stringify([...closedBanners, id]));
		setHidden(true);
	};

	if (hidden) {
		return null;
	}

	return (
		<div className={`relative h-[60px] flex items-center justify-center`} style={{ backgroundColor: bgColor }}>
			<div className='flex items-center'>
				{showIcon && <PiMegaphone size={24} className='mr-2' />}
				<h3 className='md:hidden'>{cropText(text, 30)}</h3>
				<h3 className='hidden md:block'>{cropText(text, 60)}</h3>
			</div>
			<button className='absolute right-5 ' onClick={closeBanner}>
				<PiX size={20} className='hover:rotate-180 transition-transform duration-400' />
			</button>
		</div>
	);
};
