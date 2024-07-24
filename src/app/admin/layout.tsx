import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import '../globals.css';
import { SideMenu } from '@/components/admin/side-menu/side-menu';
import { MobileSideMenu } from '@/components/admin/side-menu/mobile-side-menu';
import { NavBar } from '@/components/admin/nav-bar';
import { Providers } from '@/components/providers/providers';
import { ScrollArea } from '@/components/ui/scroll-area';

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
				<Providers>
					<SideMenu className='hidden md:block md:col-span-2  xl:col-span-1' />
					<main className='col-span-8 md:col-span-6 xl:col-span-7 w-full h-screen p-2'>
						<MobileSideMenu />
						<div className='bg-[#FAFAFA] border-solid border-[#EAECEE] border-[1px] rounded-md w-full h-full p-4'>
							<ScrollArea className='w-full h-full'>
								<NavBar />
								{children}
							</ScrollArea>
						</div>
					</main>
				</Providers>
			</body>
		</html>
	);
}
