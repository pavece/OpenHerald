import { signIn } from '@/auth';
import { Button } from '../ui/button';
import { googleSignIn } from '@/actions/auth/google-sign-in';
import { FcGoogle } from 'react-icons/fc';

type Props = {
	register?: boolean;
};

export const GoogleButton = ({ register }: Props) => {
	return (
		<Button type='submit' className='mt-4 w-full' variant='outline' onClick={() => googleSignIn()}>
			<FcGoogle size={24} className='mr-2' /> {register ? 'Register' : 'SignIn'} with Google
		</Button>
	);
};
