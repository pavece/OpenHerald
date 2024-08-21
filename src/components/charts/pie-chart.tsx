'use client';

import { Area, CartesianGrid, XAxis, PieChart, Pie } from 'recharts';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import clsx from 'clsx';

interface Props {
	keyName: string;
	valueName: string;
	title: string;
	description: string;
	chartConfig: ChartConfig;
	chartData: any;
}

export const PieChartCard = ({ chartConfig, chartData, keyName, valueName, title, description }: Props) => {
	return (
		<Card className='flex-1 max-w-fit'>
			<CardHeader className='border-b'>
				<CardTitle>{title}</CardTitle>
				<CardDescription>{description}</CardDescription>
			</CardHeader>
			<CardContent className='px-6 py-4'>
				<ChartContainer config={chartConfig} className={clsx('min-h-[250px] max-w-[400px]')}>
					<PieChart data={chartData}>
						<ChartTooltip cursor={false} content={<ChartTooltipContent />} wrapperClassName='bg-red-500' />
						<Pie
							dataKey={valueName}
							nameKey={keyName}
							innerRadius={60}
							fill={`var(--color-${valueName})`}
							stroke=''
							radius={4}
						/>
					</PieChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
};
