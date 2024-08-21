'use client';

import { Area, CartesianGrid, XAxis, AreaChart } from 'recharts';
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
	big?: boolean;
}

export const AreaChartCard = ({ chartConfig, chartData, keyName, valueName, title, description, big }: Props) => {
	return (
		<Card className='flex-1'>
			<CardHeader className='border-b'>
				<CardTitle>{title}</CardTitle>
				<CardDescription>{description}</CardDescription>
			</CardHeader>
			<CardContent className='px-6 py-4'>
				<ChartContainer config={chartConfig} className={clsx('min-h-[250px]', { 'md:min-w-[600px]': big })}>
					<AreaChart data={chartData}>
						<CartesianGrid vertical={false} />
						<XAxis dataKey={keyName} tickLine={false} tickMargin={10} axisLine={false} />
						<ChartTooltip cursor={false} content={<ChartTooltipContent />} wrapperClassName='bg-red-500' />
						<Area dataKey={valueName} fill={`var(--color-${valueName})`} stroke='' type='natural' radius={4} />
					</AreaChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
};
