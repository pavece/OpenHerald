import { getSiteConfig } from '@/actions/site-config/get-site-config';
import { SiteConfigForm } from './site-config-form';
import { getCategories } from '@/actions/categories/get-categories';

export default async function SiteConfigPage() {
	const initialConfig = await getSiteConfig();
	const categories = await getCategories();

	if (!initialConfig.ok || !categories.ok) {
		return <h1>Error retrieving configuration info.</h1>;
	}

	return (
		<SiteConfigForm initialConfig={initialConfig.config!} availCategories={categories.categories!.map(c => c.name)} />
	);
}
