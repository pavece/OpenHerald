import { getAdById } from '@/actions/ads/get-ad-by-id';
import { getResourceStats } from '@/actions/analytics/get-resouce-stats';
import { auth } from '@/auth';
import { notFound, redirect } from 'next/navigation';
import { parseData } from '../../metrics-charts';

import { getArticleBySlug } from '@/actions/articles/get-article-by-slug';
import { AreaChartCard } from '@/components/charts/area-chart';
import { NavBar } from '@/components/admin/nav-bar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { getArticle } from '@/actions/articles/get-article';
import { VerticalAD } from '@/components/ads/vertical-ad';
import { HorizontalAd } from '@/components/ads/horizontal-ad';

type Props = {
	params: {
		id: string;
	};
};

const chartConfig = {
	views: {
		label: 'Views',
		color: 'hsl(var(--chart-1))',
	},
};

export default async function AdMetricsPage({ params: { id } }: Props) {
	//Soft auth
	const session = await auth();

	if (!session || !session.user.roles.includes('admin')) {
		redirect('/');
	}

	const { ok, ad } = await getAdById(id);

	if (!ok || !ad) {
		return notFound();
	}

	const articleViews = await getResourceStats('ads', id, 30);
	const parsedViews = parseData('day', 'views', articleViews.metrics, true);

	return (
		<div>
			<NavBar className='hidden md:flex mb-4' title='AD stats' subtitle='Get insights on how this ad is performing.' />
			<div className='md:hidden'>
				<h1 className='text-xl'>Ad stats</h1>
				<p className='text-zinc-500'>Get insights on how this ad is performing.</p>
			</div>

			<div className='flex flex-wrap gap-4 py-6'>
				<div className='max-w-[600px]'>
					<AreaChartCard
						chartConfig={chartConfig}
						chartData={parsedViews}
						keyName='day'
						valueName='views'
						description='Showing the number of views for the last month.'
						title='Article views'
					/>
				</div>
				<Card className='w-full md:w-fit min-w-[300px]'>
					<CardHeader className='border-b'>
						<CardTitle>Ad preview</CardTitle>
						<CardDescription>Check the ad{"'s"} basic information</CardDescription>
					</CardHeader>
					<CardContent className='px-6 py-4 flex justify-center'>
						{ad.vertical ? (
							<VerticalAD
								id='placeholder'
								link={ad.destinationUrl}
								src={ad.mediaLink}
								description={ad.title ?? ''}
								relative
							/>
						) : (
							<div className='w-full md:w-[600px]'>
								<HorizontalAd
									id='placeholder'
									link={ad.destinationUrl}
									src={ad.mediaLink}
									description={ad.title ?? ''}
								/>
							</div>
						)}
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
