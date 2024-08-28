import { auth } from '@/auth';

const superAdminUrls = ['/admin/site-config'];
const adminUrls = [
	'/admin/metrics',
	'/admin/accounts',
	'/admin/posts',
	'/admin/ad-manager',
	'/admin/banners',
	'/admin/categories',
	'/admin/ad-manager/new',
];

const publisherUrls = [
	'/admin/dashboard',
	'/admin/publish',
	'/admin/your-posts',
	'/admin/publish',
	'/admin/profile/config',
	'/admin/article',
	'/admin/metrics/article',
	'/admin/metrics/ad',
];

export default auth(req => {
	if (!req.auth?.user?.roles?.includes('super-admin') && superAdminUrls.includes(req.nextUrl.pathname)) {
		const baseUrl = new URL(process.env.NEXT_PUBLIC_SITE_LINK ?? 'http://localhost:3000'); //TODO: Add to config file
		return Response.redirect(baseUrl);
	}

	if (!req.auth?.user?.roles?.includes('admin') && adminUrls.includes(req.nextUrl.pathname)) {
		const baseUrl = new URL(process.env.NEXT_PUBLIC_SITE_LINK ?? 'http://localhost:3000'); //TODO: Add to config file
		return Response.redirect(baseUrl);
	}

	if (!req.auth && publisherUrls.includes(req.nextUrl.pathname)) {
		const loginUrl = new URL(`${process.env.NEXT_PUBLIC_SITE_LINK ?? 'http://localhost:3000'}/auth/signIn`);
		return Response.redirect(loginUrl);
	}
});

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
