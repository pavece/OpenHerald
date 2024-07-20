import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import '../globals.css';
import { SideMenu } from '@/components/admin/side-menu/side-menu';

const poppins = Poppins({
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-poppins',
	weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
	title: 'OpenHerald - Admin',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className={poppins.className + ' grid grid-cols-8 bg-white'}>
				<SideMenu className='col-span-1' />
				<main className='col-span-7 w-full min-h-screen p-2'>
					<div className='bg-[#FAFAFA] border-solid border-[#EAECEE] border-[1px] rounded-md w-full h-full p-4'>
						{children}
					</div>
				</main>
			</body>
		</html>
	);
}
