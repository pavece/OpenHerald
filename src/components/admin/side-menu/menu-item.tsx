'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { IconType } from 'react-icons';

type Props = {
	link: string;
	children: React.ReactNode;
};

export const MenuItem = ({ link, children }: Props) => {
	const pathname = usePathname();
	const isInCurrent = pathname.split('/')[1] == link.replace('/admin', '').replaceAll('/', '');

	return (
		<Link href={link}>
			<div
				className={clsx(
					'rounded-md flex items-center gap-3 px-3 py-2 border-[1px] border-solid border-transparent hover:border-slate-200 transition-colors duration-150',
					{
						'border-slate-200': isInCurrent,
					}
				)}
			>
				{children}
			</div>
		</Link>
	);
};
