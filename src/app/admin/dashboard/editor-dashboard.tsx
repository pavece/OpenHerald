import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { PiArticle, PiFiles, PiNotePencil } from 'react-icons/pi';
import { DashboardCard } from './dashboard-card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

import React from 'react';

type Props = {
	data: {
		newArticlesToday: number;
		totalArticles: number;
		yourArticles: number;
	};
};

export const EditorDashboard = ({ data }: Props) => {
	return (
		<>
			<div className='flex items-start flex-wrap gap-2 mt-8'>
				<DashboardCard
					title='Your articles'
					value={data.yourArticles}
					icon={<PiArticle size={22} className='text-zinc-500' />}
				/>
				<DashboardCard
					title='New articles today'
					value={data.newArticlesToday}
					icon={<PiNotePencil size={22} className='text-zinc-500' />}
				/>
				<DashboardCard
					title='Total articles'
					value={data.totalArticles}
					icon={<PiFiles size={22} className='text-zinc-500' />}
				/>
			</div>
			<div className='flex flex-wrap gap-2 mt-4'>
				<Card className='md:max-w-[350px] flex-1'>
					<CardHeader>
						<CardTitle>Quick actions</CardTitle>
					</CardHeader>
					<CardContent className='flex flex-col gap-2'>
						<Link href='/admin/publish'>
							<Button className='w-full' variant='outline'>
								<PiNotePencil size={22} className='mr-2' />
								Publish new article
							</Button>
						</Link>
						<Link href='/admin/your-posts'>
							<Button className='w-full' variant='outline'>
								<PiFiles size={22} className='mr-2' /> Manage your articles
							</Button>
						</Link>{' '}
					</CardContent>
				</Card>
			</div>
		</>
	);
};
