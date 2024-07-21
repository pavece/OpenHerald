import { auth } from '@/auth';

export default auth(req => {
	const adminUrls = ['/admin'];
	const publisherUrls = [''];

	if (!req.auth?.user?.roles?.includes('admin') && adminUrls.includes(req.nextUrl.pathname)) {
		const baseUrl = new URL('http://localhost:3000/'); //TODO: Cambiar cuando no esté en desarrollo
		return Response.redirect(baseUrl);
	}

	if (!req.auth && publisherUrls.includes(req.nextUrl.pathname)) {
		const loginUrl = new URL('http://localhost:3000/auth/signIn'); //TODO: Cambiar cuando no esté en desarrollo
		return Response.redirect(loginUrl);
	}
});

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
