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
			<body className={poppins.className + ' text-zinc-800'}>
				<NavBar />
				{children}
			</body>
		</html>
	);
}
