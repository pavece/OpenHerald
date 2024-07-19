import { ArticleHeader } from '@/components/article/article-header';

type Props = {
	params: {
		slug: string;
	};
};

export default function ArticlePage({ params: { slug } }: Props) {
	return (
		<div className=''>
			<ArticleHeader />
		</div>
	);
}
