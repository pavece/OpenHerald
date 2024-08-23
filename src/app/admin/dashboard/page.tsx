import { NavBar } from '@/components/admin/nav-bar';
import { buildDashboard } from '@/actions/dashboard/build-dashboard';
import { AdminDashboard } from './admin-dasboard';

export default async function Dashboard() {
	const { ok, dashboard, type, message } = await buildDashboard();

	if (!ok) {
		return <h1>{message}</h1>;
	}

	return (
		<div>
			<NavBar className='hidden md:flex mb-4' />
			<div>{type === 'admin' && <AdminDashboard data={dashboard!} />}</div>
		</div>
	);
}
