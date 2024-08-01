import { redirect } from 'next/navigation';

export default function RegisterRedirectPage() {
	return redirect('/admin/dashboard');
}
