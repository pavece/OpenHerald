import { ArticlesSection } from '@/components/main-page/articles-section';
import { TopArticlesSection } from '@/components/main-page/top-articles';

export default function Home() {
	return (
		<div>
			<TopArticlesSection />
			<ArticlesSection sectionTitle='Latest news' />
			<ArticlesSection hasFeatured sectionTitle='Politics' />
			<ArticlesSection hasFeatured sectionTitle='Tech news' />
		</div>
	);
}
