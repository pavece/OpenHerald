import Link from "next/link"
import Image from 'next/image';
import React from 'react';

export const NavBar = () => {
	return (
		<div className='px-4 py-3 md:px-6 md:py-5 flex justify-between items-center'>
			<div>
				<Link href='/'>
					<Image src={'/images/logo.svg'} alt='Open herald logo' width={600} height={250} className='w-[205px]' />
				</Link>
			</div>
		</div>
	);
};
