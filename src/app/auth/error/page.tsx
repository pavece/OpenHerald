import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { PiWarning } from 'react-icons/pi';

export default function ErrorPage() {
	return (
		<div className='px-4'>
			<h1 className='text-red-500 text-2xl mb-4'>Login error</h1>
			<Alert className='max-w-[500px]' variant='destructive'>
				<PiWarning size={20} />
				<AlertTitle>Error</AlertTitle>
				<AlertDescription>
					Something went wrong while trying to login. This can be a server error or due to a{' '}
					<span className='font-semibold'>ban</span> in your account.{' '}
					<span className='font-semibold'>If you are not banned from this site you can try to login again. </span>
					<br />
					<br />
					If you are <span className='font-semibold'>registering</span> with google, please go back and verify if the
					email you entered above the register with google button is the same as the one in your Google account.
				</AlertDescription>
			</Alert>
		</div>
	);
}
