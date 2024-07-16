import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import '../globals.css';
import { NavBar } from '@/components/ui/layout/nav-bar';

const poppins = Poppins({
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-poppins',
	weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
	title: 'OpenHerald',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className={poppins.className + ' text-zinc-800 min-h-screen flex flex-col justify-between'}>
				<div>
					<NavBar />
					<main className=''>
						<div className='flex justify-center mt-6'>
							<div className='max-w-[950px] px-4 md:px-6 lg:px-0'>{children}</div>
						</div>
					</main>
				</div>
				<footer></footer>
			</body>
		</html>
	);
}
