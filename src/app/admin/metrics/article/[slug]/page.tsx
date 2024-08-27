import { getResourceStats } from '@/actions/analytics/get-resouce-stats';
import { getArticleBySlug } from '@/actions/articles/get-article-by-slug';
import { notFound, redirect } from 'next/navigation';
import { parseData } from '../../metrics-charts';
import { AreaChartCard } from '@/components/charts/area-chart';
import { NavBar } from '@/components/admin/nav-bar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { auth } from '@/auth';

export const metadata = {
	title: 'Article metrics',
	ok: {
		title: 'Article metrics',
	},
	twitter: {
		title: 'Article metrics',
	},
};

type Props = {
	params: {
		slug: string;
	};
};

const chartConfig = {
	views: {
		label: 'Views',
		color: 'hsl(var(--chart-1))',
	},
};

export default async function ArticleMetricsPage({ params: { slug } }: Props) {
	//Soft auth
	const session = await auth();

	if (!session) {
		redirect('/');
	}

	const { ok, article } = await getArticleBySlug(slug);

	if (!ok || !article) {
		return notFound();
	}

	if (!session.user.roles.includes('admin') && session.user.id !== article.creatorId) {
		return notFound();
	}

	const articleViews = await getResourceStats('article', slug, 30);
	const parsedViews = parseData('day', 'views', articleViews.metrics, true);

	return (
		<div>
			<NavBar
				className='hidden md:flex mb-4'
				title='Article stats'
				subtitle='Get insights on how this article is performing.'
			/>
			<div className='md:hidden'>
				<h1 className='text-xl'>Article stats</h1>
				<p className='text-zinc-500'>Get insights on how this article is performing.</p>
			</div>

			<div className='flex flex-wrap gap-4 py-6'>
				<div className='max-w-[600px]'>
					<AreaChartCard
						chartConfig={chartConfig}
						chartData={parsedViews}
						keyName='day'
						valueName='views'
						description='Showing the number of views for the last month.'
						title='Article views'
					/>
				</div>
				<Card className='w-full md:w-auto min-w-[300px]'>
					<CardHeader className='border-b'>
						<CardTitle>Article info</CardTitle>
						<CardDescription>Check the article{"'s"} basic information</CardDescription>
					</CardHeader>
					<CardContent className='px-6 py-4'>
						<ul>
							<li>
								Title: <span className='font-semibold'>{article.title}</span>{' '}
							</li>
							<li>
								Author: <span className='font-semibold'> {article.creator.name}</span>
							</li>
							<li>
								Publishing date: <span className='font-semibold'>{format(article.createdAt, 'MM-dd-yyyy')}</span>
							</li>
						</ul>
					</CardContent>
					<CardFooter>
						<Link href={`/admin/article/edit/${article.id}`}>
							<Button>Edit article</Button>
						</Link>
					</CardFooter>
				</Card>
			</div>
		</div>
	);
}
