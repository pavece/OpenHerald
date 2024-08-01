import { AccountsDataTable } from './data-table';
import { columns } from './columns';
import { getAccounts } from '@/actions/accounts/get-accounts';
import { Button } from '@/components/ui/button';

export default async function AccountsPage() {
	const result = await getAccounts();

	if (!result.ok) {
		return <h1>Server error</h1>;
	}

	return (
		<div>
			<div>
				<h1 className='text-xl'>Accounts</h1>
				<p className='text-zinc-500'>Add or edit user accounts</p>
			</div>
			<AccountsDataTable columns={columns} data={result.accounts!} filterBy='email' />
		</div>
	);
}
