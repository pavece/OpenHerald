import { ChartConfig } from '@/components/ui/chart';
import { BarChartCard } from '@/components/charts/bar-chart';

const articlesBarChartConfig = {
	views: {
		label: 'Views',
		color: 'hsl(var(--chart-1))',
	},
} satisfies ChartConfig;

const adsBarChartConfig = {
	views: {
		label: 'Views',
		color: 'hsl(var(--chart-2))',
	},
} satisfies ChartConfig;

const categoriesChartConfig = {
	views: {
		label: 'Views',
		color: 'hsl(var(--chart-3))',
	},
};

interface Props {
	articlesBarChartData: { [key: string]: number };
	adsBarChartData: { [key: string]: number };
	categoryPagesChartData: { [key: string]: number };
}

export const MetricsCharts = ({ articlesBarChartData, adsBarChartData, categoryPagesChartData }: Props) => {
	const articlesBarChartParsed = [];
	const adsBarChartParsed = [];
	const categoryPagesChartParsed = [];

	for (const article in articlesBarChartData) {
		articlesBarChartParsed.push({ article, views: articlesBarChartData[article] });
	}
	for (const ad in adsBarChartData) {
		adsBarChartParsed.push({ ad, views: adsBarChartData[ad] });
	}
	for (const category in categoryPagesChartData) {
		categoryPagesChartParsed.push({ category, views: categoryPagesChartData[category] });
	}

	return (
		<div className='flex gap-4 flex-wrap flex-1'>
			<BarChartCard
				chartConfig={articlesBarChartConfig}
				chartData={articlesBarChartParsed}
				keyName='article'
				valueName='views'
				title='Articles today'
				description='Showing number of views per article today.'
			/>
			<BarChartCard
				chartConfig={adsBarChartConfig}
				chartData={adsBarChartParsed}
				keyName='ad'
				valueName='views'
				description='Showing number of views per ad today.'
				title='ADS today'
			/>
			<BarChartCard
				chartConfig={categoriesChartConfig}
				chartData={categoryPagesChartParsed}
				keyName='category'
				valueName='views'
				description='Showing number of views per category page today.'
				title='Category pages today'
			/>
		</div>
	);
};
