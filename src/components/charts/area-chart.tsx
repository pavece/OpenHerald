'use client';

import { Area, CartesianGrid, XAxis, AreaChart } from 'recharts';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import clsx from 'clsx';
import { PiInfo } from 'react-icons/pi';

interface Props {
	keyName: string;
	valueName: string;
	title: string;
	description: string;
	chartConfig: ChartConfig;
	chartData: any;
	big?: boolean;
	footerDescription?: string;
}

export const AreaChartCard = ({
	chartConfig,
	chartData,
	keyName,
	valueName,
	title,
	description,
	big,
	footerDescription,
}: Props) => {
	return (
		<Card className='flex-1'>
			<CardHeader className='border-b'>
				<CardTitle>{title}</CardTitle>
				<CardDescription>{description}</CardDescription>
			</CardHeader>
			<CardContent className='px-6 py-4'>
				<ChartContainer config={chartConfig} className='min-h-[150px] md:min-h-[250px]'>
					<AreaChart data={chartData}>
						<CartesianGrid vertical={false} />
						<XAxis dataKey={keyName} tickLine={false} axisLine={false} tickMargin={8} />
						<ChartTooltip cursor={false} content={<ChartTooltipContent />} wrapperClassName='bg-red-500' />
						<Area dataKey={valueName} fill={`var(--color-${valueName})`} stroke='' type='natural' radius={4} />
					</AreaChart>
				</ChartContainer>
			</CardContent>
			{footerDescription && (
				<CardFooter className='border-t pt-4 pb-4'>
					<CardDescription className='flex items-center'>
						<PiInfo size={22} className='mr-2' />
						{footerDescription}
					</CardDescription>
				</CardFooter>
			)}
		</Card>
	);
};
