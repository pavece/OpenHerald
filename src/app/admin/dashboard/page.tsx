import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { NavBar } from '@/components/admin/nav-bar';
import { PiArticle, PiEye, PiFiles, PiHandCoins, PiMedal, PiNotePencil, PiUsers } from 'react-icons/pi';
import { DashboardCard } from './dashboard-card';
import { BarChartCard } from '@/components/charts/bar-chart';
import { getDailyStatsByType } from '@/actions/analytics/get-daily-stats-by-type';
import { parseData } from '../metrics/metrics-charts';
import { AreaChartCard } from '@/components/charts/area-chart';
import { getResourceStats } from '@/actions/analytics/get-resouce-stats';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const configs = {
	articlesBarChartConfig: {
		views: {
			label: 'Views',
			color: 'hsl(var(--chart-4))',
		},
	},
	mainPageAreaConfig: {
		views: {
			label: 'Views',
			color: 'hsl(var(--chart-2))',
		},
	},
};

export default async function Dashboard() {
	const [articlesBarChart, mainPageWeek] = await Promise.all([
		getDailyStatsByType('article'),
		getResourceStats('page', 'mainPage', 7),
	]);

	const articlesBarChartParsed = parseData('article', 'views', articlesBarChart.metrics);
	const mainPageAreaParsed = parseData('day', 'views', mainPageWeek.metrics);

	return (
		<div>
			<NavBar className='hidden md:flex mb-4' />
			<div>
				<div className='flex items-start flex-wrap gap-2 mt-8'>
					<DashboardCard
						title='Main page views today'
						value={821}
						icon={<PiEye size={22} className='text-zinc-500' />}
					/>
					<DashboardCard
						title='New articles today'
						value={12}
						icon={<PiArticle size={22} className='text-zinc-500' />}
					/>
					<DashboardCard title='Total articles' value={443} icon={<PiFiles size={22} className='text-zinc-500' />} />
					<DashboardCard title='Editor count' value={16} icon={<PiUsers size={22} className='text-zinc-500' />} />
					<DashboardCard title='Top editor' value={'John Doe'} icon={<PiMedal size={22} className='text-zinc-500' />} />
				</div>
				<div className='flex flex-wrap gap-2 mt-4'>
					<AreaChartCard
						chartConfig={configs.mainPageAreaConfig}
						chartData={mainPageAreaParsed}
						keyName='day'
						valueName='views'
						description='Showing number of main page views last week.'
						title='Main page views'
						footerDescription='These views do not count as unique visitors / views.'
					/>
					<BarChartCard
						chartConfig={configs.articlesBarChartConfig}
						chartData={articlesBarChartParsed}
						keyName='article'
						valueName='views'
						title='Articles today'
						description='Showing number of views per article today.'
						elementLink='/admin/metrics/article/'
					/>
					<Card className='md:max-w-[350px] flex-1'>
						<CardHeader>
							<CardTitle>Quick actions</CardTitle>
						</CardHeader>
						<CardContent className='flex flex-col gap-2'>
							<Link href='/admin/publish'>
								<Button className='w-full' variant='outline'>
									<PiNotePencil size={22} className='mr-2' />
									Publish new article
								</Button>
							</Link>
							<Link href='/admin/posts'>
								<Button className='w-full' variant='outline'>
									<PiFiles size={22} className='mr-2' /> Manage articles
								</Button>
							</Link>

							<Link href='/admin/ad-manager'>
								<Button className='w-full' variant='outline'>
									<PiHandCoins size={22} className='mr-2' /> Manage ADS
								</Button>
							</Link>

							<Link href='/admin/accounts'>
								<Button className='w-full' variant='outline'>
									<PiUsers size={22} className='mr-2' /> Manage users
								</Button>
							</Link>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
