import { DataTable } from '@/components/ui/data-table';
import { columns } from './columns';
import { getAccounts } from '@/actions/accounts/get-accounts';

export default async function AccountsPage() {
	const result = await getAccounts();

	if (!result.ok) {
		return;
	}

	return (
		<div>
			<div>
				<h1 className='text-xl'>Accounts</h1>
				<p className='text-zinc-500'>Add or edit user accounts</p>
			</div>
			<DataTable columns={columns} data={result.accounts!} filterBy='email' />
		</div>
	);
}
