'use client';

import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface Props {
	keyName: string;
	valueName: string;
	title: string;
	description: string;
	chartConfig: ChartConfig;
	chartData: any;
}

export const BarChartCard = ({ chartConfig, chartData, keyName, valueName, title, description }: Props) => {
	return (
		<Card className='flex-1'>
			<CardHeader className='border-b'>
				<CardTitle>{title}</CardTitle>
				<CardDescription>{description}</CardDescription>
			</CardHeader>
			<CardContent className='px-6 py-4'>
				<ChartContainer config={chartConfig} className='min-h-[250px]'>
					<BarChart accessibilityLayer data={chartData}>
						<CartesianGrid vertical={false} />
						<XAxis
							dataKey={keyName}
							tickLine={false}
							tickMargin={10}
							axisLine={false}
                            
							tickFormatter={value => value.slice(0, 6)}
						/>
						<ChartTooltip cursor={false} content={<ChartTooltipContent />} wrapperClassName='bg-red-500' />
						<Bar dataKey={valueName} fill={`var(--color-${valueName})`} radius={4}  />
					</BarChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
};
