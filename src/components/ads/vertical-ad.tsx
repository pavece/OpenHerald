import React from 'react';
import { Button } from '../ui/button';
import Link from 'next/link';
import { PiInfo } from 'react-icons/pi';
import clsx from 'clsx';
import { cropText } from '@/lib/utils';

type Props = {
	className?: string;
	side?: 'left' | 'right';
	description: string;
	link: string;
	src: string;
};

/**
 * 	Vertical ads will only show on large screens
 *
 * 	@param description Will be cropped to 50 characters
 *  */
export const VerticalAD = ({ className, side, description, link, src }: Props) => {
	return (
		<div className={clsx('absolute top-44', { 'left-5': side !== 'right', 'right-5': side === 'right' })}>
			<div
				className={`h-[500px] w-[250px] hidden 2xl:block bg-cover bg-center bg-no-repeat rounded-md  ${className}`}
				style={{ backgroundImage: `url('${src}')` }}
			>
				<div className='w-full h-full rounded-md bg-gradient-to-b from-slate-900/5 to-slate-900/80 flex items-bottom relative'>
					<div className='absolute top-0 left-0 p-4 w-full'>
						{/* TODO: Link to correct page for AD disclaimer */}
						<Link href='' className='flex gap-2 text-neutral-300 text-sm underline'>
							<PiInfo size={20} /> AD
						</Link>
					</div>
					<div className='absolute bottom-0 left-0 p-4 w-full'>
						<h1 className='text-neutral-200 text-lg font-medium '>{cropText(description, 50)}</h1>
						<Button className='w-full mt-2 hover:underline' variant='secondary' asChild>
							<Link href={link}>Visit</Link>
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};
