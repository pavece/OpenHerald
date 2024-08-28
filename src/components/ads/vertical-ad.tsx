'use client';

import React from 'react';
import { Button } from '../ui/button';
import Link from 'next/link';
import { PiInfo, PiLink } from 'react-icons/pi';
import clsx from 'clsx';
import { cropText } from '@/lib/utils';
import { addAnalyticsView } from '@/actions/analytics/add-view';
import { useEffect } from 'react';

type Props = {
	link: string;
	src: string;
	className?: string;
	side?: 'left' | 'right';
	description?: string;
	relative?: boolean;
	id: string;
};

/**
 * 	Vertical ads will only show on large screens
 *
 * 	@param description Will be cropped to 50 characters
 *  */
export const VerticalAD = ({ className, side, description, link, src, relative = false, id }: Props) => {
	useEffect(() => {
		const saveView = async () => {
			await addAnalyticsView(id, 'ads');
		};

		saveView();
	});

	return (
		<div
			className={clsx('', { 'left-5': side !== 'right', 'right-5': side === 'right', 'absolute top-44': !relative })}
		>
			<div
				className={`h-[500px] w-[250px] ${
					!relative && 'hidden 2xl:block'
				}  bg-cover bg-center bg-no-repeat rounded-md  ${className}`}
				style={{ backgroundImage: `url('${src}')` }}
			>
				<div className='w-full h-full rounded-md bg-gradient-to-b from-slate-900/5 to-slate-900/80 flex items-bottom relative'>
					<div className='absolute top-0 left-0 p-4 w-full'>
						<span className='flex gap-2 text-neutral-200 text-sm'>
							<PiInfo size={20} /> AD
						</span>
					</div>
					<div className='absolute bottom-0 left-0 p-4 w-full'>
						<h1 className='text-neutral-200 text-lg font-medium '>{cropText(description ?? '', 50)}</h1>
						<Button className='w-full mt-2 hover:underline' variant='secondary' asChild>
							<Link href={link}>
								<PiLink size={20} className='mr-2' /> Visit
							</Link>
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};
