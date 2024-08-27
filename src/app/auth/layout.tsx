import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import '../globals.css';
import { NavBar } from '@/components/auth/nav-bar';
import { LoginImageContainer } from '@/components/auth/login-image-container';
import { getSiteConfig } from '@/actions/site-config/get-site-config';

const poppins = Poppins({
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-poppins',
	weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export async function generateMetadata(): Promise<Metadata> {
	const siteConfig = await getSiteConfig();

	return {
		title: {
			template: siteConfig.config.siteName + ' - %s',
			default: siteConfig.config.siteName + ' - Auth',
		},
		description: siteConfig.config.siteDescription,
		openGraph: {
			title: {
				template: siteConfig.config.siteName + ' - %s',
				default: siteConfig.config.siteName + ' - Auth',
			},
			description: siteConfig.config.siteDescription,
			images: '/images/og.png',
		},
		twitter: {
			card: 'summary_large_image',
			title: {
				template: siteConfig.config.siteName + ' - %s',
				default: siteConfig.config.siteName + ' - Auth',
			},
			description: siteConfig.config.siteDescription,
			images: '/images/og.png',
		},
	};
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className={poppins.className + ' text-zinc-800 min-h-screen flex flex-col justify-between'}>
				<div>
					<div className='lg:hidden block'>
						<NavBar />
					</div>
					<main className='grid grid-cols-1 lg:grid-cols-2 lg:min-h-screen'>
						<LoginImageContainer />
						<div className='flex lg:items-center justify-center py-10 lg:py-0'>{children}</div>
					</main>
				</div>
			</body>
		</html>
	);
}
