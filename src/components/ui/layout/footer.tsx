import Image from 'next/image';
import { Button } from '../button';
import { PiCopyright, PiFacebookLogo, PiInstagramLogo, PiXLogo } from 'react-icons/pi';
import Link from 'next/link';

export const Footer = () => {
	return (
		<footer className='flex justify-center px-4 py-10 mt-24'>
			<div className='max-w-[950px] w-full flex justify-start flex-col'>
				<div className='flex flex-col md:flex-row gap-8 md:gap-16 items-start'>
					<Image src={'/images/logo.svg'} alt='Open herald logo' width={600} height={250} className='w-[205px]' />

					<div className='flex flex-col md:flex-row gap-10'>
						<div className='flex items-start justify-start flex-col gap-2 py-2 '>
							<h3 className='text-lg font-medium uppercase tracking-wider'>About</h3>
							<Link href='' className='text-zinc-600'>
								About this site
							</Link>
							<Link href='' className='text-zinc-600'>
								About our company
							</Link>
							<Link href='' className='text-zinc-600'>
								About Us
							</Link>
						</div>

						<div className='flex items-start justify-start flex-col gap-2 py-2 '>
							<h3 className='text-lg font-medium uppercase tracking-wider'>Contact</h3>
							<Link href='' className='text-zinc-600'>
								Contact the company
							</Link>
							<Link href='' className='text-zinc-600'>
								Publish an AD
							</Link>
							<Link href='' className='text-zinc-600'>
								Anything to report?
							</Link>
						</div>

						<div className='flex items-start justify-start flex-col gap-2 py-2 '>
							<h3 className='text-lg font-medium uppercase tracking-wider'>Editors</h3>
							<Link href='/auth/signIn' className='text-zinc-600'>
								Login
							</Link>
							<Link href='/admin/dashboard' className='text-zinc-600'>
								Dashboard
							</Link>
						</div>
					</div>
				</div>
				<hr className='w-full mt-8' />
				<div className='flex justify-between py-4'>
					<div className='flex items-center justify-start gap-1'>
						<PiCopyright size={18} />
						Open Herald {new Date().getFullYear()}
					</div>
					<div className='flex flex-row gap-3'>
						<Link href=''>
							<Button variant='outline' size='icon'>
								<PiXLogo size={28} />
							</Button>
						</Link>
						<Link href=''>
							<Button variant='outline' size='icon'>
								<PiInstagramLogo size={28} />
							</Button>
						</Link>
						<Link href=''>
							<Button variant='outline' size='icon'>
								<PiFacebookLogo size={28} />
							</Button>
						</Link>
					</div>
				</div>
			</div>
		</footer>
	);
};
