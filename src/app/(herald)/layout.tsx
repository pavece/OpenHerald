import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import '../globals.css';
import { NavBar } from '@/components/ui/layout/nav-bar';
import { Footer } from '@/components/ui/layout/footer';
import { Banner } from '@/components/banners/banner';
import { getLatestBanner } from '@/actions/banners/get-latest-banner';
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
			default: siteConfig.config.siteName + ' - Home',
		},
		description: siteConfig.config.siteDescription,
		openGraph: {
			title: {
				template: siteConfig.config.siteName + ' - %s',
				default: siteConfig.config.siteName + ' - Home',
			},
			description: siteConfig.config.siteDescription,
			images: '/images/og.png',
		},
		twitter: {
			card: 'summary_large_image',
			title: {
				template: siteConfig.config.siteName + ' - %s',
				default: siteConfig.config.siteName + ' - Home',
			},
			description: siteConfig.config.siteDescription,
			images: '/images/og.png',
		},
	};
}

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const { banner } = await getLatestBanner();

	return (
		<html lang='en'>
			<body className={poppins.className + ' text-zinc-800 min-h-screen flex flex-col justify-between'}>
				<div>
					{banner && (
						<Banner
							id={banner.id}
							text={banner.text}
							bgColor={banner.bgColor}
							showIcon={banner.showIcon}
							textColor={banner.textColor}
						/>
					)}

					<NavBar />
					<main className=''>
						<div className='flex justify-center mt-6'>
							<div className='max-w-[950px] w-full px-4 md:px-6 lg:px-0'>{children}</div>
						</div>
					</main>
				</div>
				<Footer />
			</body>
		</html>
	);
}
