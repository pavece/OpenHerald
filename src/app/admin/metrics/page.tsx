export const revalidate = 60;

import { NavBar } from '@/components/admin/nav-bar';
import { MetricsCharts } from './metrics-charts';
import { getDailyStatsByType } from '@/actions/analytics/get-daily-stats-by-type';
import { getTotalSystemViews } from '@/actions/analytics/get-total-system-views';
import { getResourceStats } from '@/actions/analytics/get-resouce-stats';
import { getStatsBySourceTypeTotal } from '@/actions/analytics/get-stats-by-source-type-total';

export const metadata = {
	title: 'Metrics',
	ok: {
		title: 'Metrics',
	},
	twitter: {
		title: 'Metrics',
	},
};

export default async function Metrics() {
	const metricsPromises = [
		getDailyStatsByType('article'),
		getDailyStatsByType('ads'),
		getDailyStatsByType('categoryPage'),
		getTotalSystemViews(),
		getStatsBySourceTypeTotal('article', 7),
		getResourceStats('page', 'mainPage', 15),
	];
	const [articlesBarChart, adsBarChart, categoryBarChart, systemViewsAreaChart, articlesArea, mainPageArea] =
		await Promise.all(metricsPromises);

	return (
		<div>
			<NavBar className='hidden md:flex mb-4' title='Metrics' subtitle='View traffic and usage metrics.' />
			<div className='md:hidden'>
				<h1 className='text-xl'>Metrics</h1>
				<p className='text-zinc-500'>View traffic and usage metrics.</p>
			</div>
			<MetricsCharts
				articlesBarChartData={articlesBarChart.metrics}
				adsBarChartData={adsBarChart.metrics}
				categoryPagesChartData={categoryBarChart.metrics}
				totalSystemAreaData={systemViewsAreaChart.metrics}
				articlesAreaData={articlesArea.metrics}
				mainPageAreaData={mainPageArea.metrics}
			/>
		</div>
	);
}
