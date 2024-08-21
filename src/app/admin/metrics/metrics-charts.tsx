import { BarChartCard } from '@/components/charts/bar-chart';
import { AreaChartCard } from '@/components/charts/area-chart';
import { parse } from 'date-fns';

const configs = {
	articlesBarChartConfig: {
		views: {
			label: 'Views',
			color: 'hsl(var(--chart-4))',
		},
	},
	adsBarChartConfig: {
		views: {
			label: 'Views',
			color: 'hsl(var(--chart-5))',
		},
	},
	categoriesChartConfig: {
		views: {
			label: 'Views',
			color: 'hsl(var(--chart-1))',
		},
	},
	articlesAreaConfig: {
		views: {
			label: 'Views',
			color: 'hsl(var(--chart-1))',
		},
	},
	mainPageAreaConfig: {
		views: {
			label: 'Views',
			color: 'hsl(var(--chart-2))',
		},
	},
	systemAreaConfig: {
		views: {
			label: 'Views',
			color: 'hsl(var(--chart-3))',
		},
	},
};

export const parseData = (keyName: string, valueName: string, unparsedSource: any, requiresSorting?: boolean) => {
	const destinationArr = [];
	for (const key in unparsedSource) {
		destinationArr.push({ [keyName]: key, [valueName]: unparsedSource[key] });
	}

	//Sort series by date
	if (requiresSorting) {
		destinationArr.sort((a, b) => {
			const parsedA = parse(a[keyName], 'MM-dd-yyyy', new Date()).getTime();
			const parsedB = parse(b[keyName], 'MM-dd-yyyy', new Date()).getTime();
			if (parsedA > parsedB) return 1;

			return -1;
		});
	}

	return destinationArr;
};

interface Props {
	articlesBarChartData: { [key: string]: number };
	adsBarChartData: { [key: string]: number };
	categoryPagesChartData: { [key: string]: number };
	totalSystemAreaData: { [key: string]: number };
	articlesAreaData: { [key: string]: number };
	mainPageAreaData: { [key: string]: number };
}

export const MetricsCharts = ({
	articlesBarChartData,
	adsBarChartData,
	categoryPagesChartData,
	totalSystemAreaData,
	articlesAreaData,
	mainPageAreaData,
}: Props) => {
	const articlesBarChartParsed = parseData('article', 'views', articlesBarChartData);
	const adsBarChartParsed = parseData('ad', 'views', adsBarChartData);
	const categoryPagesChartParsed = parseData('category', 'views', categoryPagesChartData);

	const systemViewsAreaParsed = parseData('day', 'views', totalSystemAreaData, true);
	const articlesAreaParsed = parseData('day', 'views', articlesAreaData, true);
	const mainPageAreaParsed = parseData('day', 'views', mainPageAreaData, true);

	return (
		<div className='flex gap-4 flex-wrap flex-1'>
			<AreaChartCard
				chartConfig={configs.mainPageAreaConfig}
				chartData={mainPageAreaParsed}
				keyName='day'
				valueName='views'
				description='Showing number of main page views last 15 days.'
				title='Main page views'
			/>
			<AreaChartCard
				chartConfig={configs.articlesAreaConfig}
				chartData={articlesAreaParsed}
				keyName='day'
				valueName='views'
				description='Showing number of total article views this week.'
				title='Article views'
			/>
			<AreaChartCard
				chartConfig={configs.systemAreaConfig}
				chartData={systemViewsAreaParsed}
				keyName='day'
				valueName='views'
				description='Showing number of total views in the system for this week.'
				title='Total system views'
			/>
			<BarChartCard
				chartConfig={configs.articlesBarChartConfig}
				chartData={articlesBarChartParsed}
				keyName='article'
				valueName='views'
				title='Articles today'
				description='Showing number of views per article today.'
			/>
			<BarChartCard
				chartConfig={configs.adsBarChartConfig}
				chartData={adsBarChartParsed}
				keyName='ad'
				valueName='views'
				description='Showing number of views per ad today.'
				title='ADS today'
			/>
			<BarChartCard
				chartConfig={configs.categoriesChartConfig}
				chartData={categoryPagesChartParsed}
				keyName='category'
				valueName='views'
				description='Showing number of views per category page today.'
				title='Category pages today'
			/>
		</div>
	);
};
