export const revalidate = 0;

import { NavBar } from '@/components/admin/nav-bar';
import { MetricsCharts } from './metrics-charts';
import { getDailyStatsByType } from '@/actions/analytics/get-daily-stats-by-type';

export default async function Metrics() {
	const metricsPromises = [
		getDailyStatsByType('article'),
		getDailyStatsByType('ads'),
		getDailyStatsByType('categoryPage'),
	];
	const [articlesBarChart, adsBarChart, categoryBarChart] = await Promise.all(metricsPromises);

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
			/>
		</div>
	);
}
