import { AccountsDataTable } from './data-table';
import { columns } from './columns';
import { getAccounts } from '@/actions/accounts/get-accounts';
import { NavBar } from '@/components/admin/nav-bar';

export const metadata = {
	title: 'Accounts',
	ok: {
		title: 'Accounts',
	},
	twitter: {
		title: 'Accounts',
	},
};

export default async function AccountsPage() {
	const result = await getAccounts();

	if (!result.ok) {
		return <h1>Server error</h1>;
	}

	return (
		<div>
			<NavBar className='hidden md:flex mb-4' title='Accounts' subtitle='Add or edit user accounts' />
			<div className='md:hidden'>
				<h1 className='text-xl'>Accounts</h1>
				<p className='text-zinc-500'>Add or edit user accounts</p>
			</div>
			<AccountsDataTable columns={columns} data={result.accounts!} filterBy='email' />
		</div>
	);
}
