interface IDashboardSearchItems {
	title: string;
	destination: string;
}

export interface IDashboardSearchOptions {
	pages: IDashboardSearchItems[];
	actions: IDashboardSearchItems[];
}

export const adminSearchItems: IDashboardSearchOptions = {
	pages: [
		{ title: 'Metrics', destination: '/admin/metrics' },
		{ title: 'Accounts', destination: '/admin/accounts' },
		{ title: 'Your articles', destination: '/admin/your-posts' },
		{ title: 'All articles', destination: '/admin/posts' },
		{ title: 'Publish', destination: '/admin/publish' },
		{ title: 'Manage ads', destination: '/admin/ad-manager' },
		{ title: 'Manage banners', destination: '/admin/banners' },
		{ title: 'Configure profile', destination: '/admin/profile/config' },
	],
	actions: [
		{ title: 'Main page views', destination: '/admin/metrics' },
		{ title: 'Article views', destination: '/admin/metrics' },
		{ title: 'System views', destination: '/admin/metrics' },
		{ title: 'Articles today', destination: '/admin/metrics' },
		{ title: 'Ads today', destination: '/admin/metrics' },
		{ title: 'Category pages today', destination: '/admin/metrics' },

		{ title: 'New user', destination: '/admin/accounts' },
		{ title: 'Edit user', destination: '/admin/accounts' },

		{ title: 'Edit your articles', destination: '/admin/your-articles' },
		{ title: 'Change your articles visibility', destination: '/admin/your-articles' },
		{ title: 'Check your articles stats', destination: '/admin/your-articles' },

		{ title: 'Edit articles', destination: '/admin/articles' },
		{ title: 'Change articles visibility', destination: '/admin/articles' },
		{ title: 'Check articles stats', destination: '/admin/articles' },

		{ title: 'New category', destination: '/admin/categories' },

		{ title: 'Delete ads', destination: '/admin/ad-manager' },
		{ title: 'New ad', destination: '/admin/ad-manager/new' },

		{ title: 'Change banner visibility', destination: '/admin/banners' },
		{ title: 'Delete banner', destination: '/admin/banners' },
		{ title: 'New banner', destination: '/admin/banners' },
	],
};

export const editorSearchItems: IDashboardSearchOptions = {
	pages: [
		{ title: 'Your articles', destination: '/admin/your-posts' },
		{ title: 'Publish', destination: '/admin/publish' },
		{ title: 'Configure profile', destination: '/admin/profile/config' },
	],
	actions: [
		{ title: 'Edit your articles', destination: '/admin/your-articles' },
		{ title: 'Change your articles visibility', destination: '/admin/your-articles' },
		{ title: 'Check your articles stats', destination: '/admin/your-articles' },
	],
};
