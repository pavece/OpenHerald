import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import React from 'react';
import { PiEye } from 'react-icons/pi';

type Props = {
	title: string;
	value: string | number;
	icon: React.ReactNode;
};

export const DashboardCard = ({ title, value, icon }: Props) => {
	return (
		<Card className='flex-1  min-w-fit max-w-[400px]'>
			<CardHeader className='flex flex-row items-center pb-4 justify-between'>
				<CardTitle className='text-sm font-medium'>{title}</CardTitle>
				{icon}
			</CardHeader>
			<CardContent>
				<h1 className='text-3xl font-semibold'>{value}</h1>
			</CardContent>
		</Card>
	);
};
