'use client';

import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { PiInfo } from 'react-icons/pi';

interface Props {
	keyName: string;
	valueName: string;
	title: string;
	description: string;
	chartConfig: ChartConfig;
	chartData: any;
	elementLink?: string;
}

export const BarChartCard = ({
	chartConfig,
	chartData,
	keyName,
	valueName,
	title,
	description,
	elementLink,
}: Props) => {
	const router = useRouter();

	return (
		<Card className='flex-1'>
			<CardHeader className='border-b'>
				<CardTitle>{title}</CardTitle>
				<CardDescription>{description}</CardDescription>
			</CardHeader>
			<CardContent className='px-6 py-4'>
				<ChartContainer config={chartConfig} className='min-h-[150px] md:min-h-[250px]'>
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
						<Bar
							className={elementLink && 'cursor-pointer'}
							dataKey={valueName}
							fill={`var(--color-${valueName})`}
							radius={4}
							onClick={(data: any) => {
								elementLink && router.push(elementLink + data[keyName]);
							}}
						/>
					</BarChart>
				</ChartContainer>
			</CardContent>
			{elementLink && (
				<CardFooter className='border-t pt-4 pb-4'>
					<CardDescription className='flex items-center'>
						<PiInfo size={22} className='mr-2' /> Click on the bars to access more information about each resource.
					</CardDescription>
				</CardFooter>
			)}
		</Card>
	);
};
