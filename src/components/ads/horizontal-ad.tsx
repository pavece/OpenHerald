import { addAnalyticsView } from '@/actions/analytics/add-view';
import { cropText } from '@/lib/utils';
import clsx from 'clsx';
import Link from 'next/link';
import { PiInfo } from 'react-icons/pi';

type Props = {
	src: string;
	link: string;
	description?: string;
	id: string;
};

/**
 * 	Horizontal ads will show anywhere, it's recommended to use these ads at the bottom of posts (not between paragraphs as it is intrusive)
 * 	@param description Will be cropped to 50 characters
 *  */
export const HorizontalAd = async ({ description, link, src, id }: Props) => {
	if (id !== 'placeholder') {
		await addAnalyticsView(id, 'ads');
	}

	return (
		<div
			className='w-full h-[180px] md:h-[250px] rounded-md my-4 bg-center bg-cover bg-no-repeat'
			style={{ backgroundImage: `url('${src}')` }}
		>
			<Link href={link}>
				<div
					className={clsx('w-full h-full  from-zinc-800/10 to-zinc-900/50 rounded-md relative', {
						'bg-gradient-to-b': description,
					})}
				>
					<div className='absolute top-0 left-0 p-4 w-full'>
						<span className='flex gap-2 text-neutral-200 text-sm'>
							<PiInfo size={20} /> AD
						</span>
					</div>
					<div className='absolute bottom-0 left-0 p-4'>
						<h1 className='text-lg text-neutral-100 font-medium'>{cropText(description ?? '', 50)}</h1>
					</div>
				</div>
			</Link>
		</div>
	);
};
