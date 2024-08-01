'use client';

import { Button } from '../ui/button';
import { googleSignIn } from '@/actions/auth/google-sign-in';
import { FcGoogle } from 'react-icons/fc';
import { Input } from '../ui/input';
import { useState } from 'react';
import clsx from 'clsx';
import { addGoogleMail } from '@/actions/auth/register-link-actions';

type Props = {
	linkId?: string;
	register?: boolean;
};

export const GoogleButton = ({ register, linkId }: Props) => {
	const [btnClicked, setBtnClicked] = useState(false);
	const [email, setEmail] = useState('');
	const [emailError, setEmailError] = useState(false);

	if (!register) {
		return (
			<Button type='submit' className='mt-4 w-full' variant='outline' onClick={() => googleSignIn()}>
				<FcGoogle size={24} className='mr-2' /> {register ? 'Register' : 'SignIn'} with Google
			</Button>
		);
	}

	const googleRegister = async () => {
		if (!email.length) {
			setEmailError(true);
		}

		const addEmailResult = await addGoogleMail(linkId ?? '', email);

		if (addEmailResult.ok) {
			googleSignIn();
		}
	};

	return (
		<>
			<div>
				{btnClicked && (
					<div>
						<p className={clsx('mt-4 mb-2 text-md font-medium', { 'text-red-500': emailError })}>
							Enter your Google mail{' '}
						</p>
						<Input
							placeholder='email@gmail.com'
							onChange={e => setEmail(e.target.value)}
							className={clsx('w-full', { 'border-red-500': emailError })}
						/>
						<p className='text-sm font-zinc-500 mt-2'>
							Enter the email address associated with the Google account you want to register with.
						</p>
					</div>
				)}

				<Button
					type='submit'
					className='mt-4 w-full'
					variant='outline'
					onClick={() => {
						if (btnClicked) {
							return googleRegister();
						}
						setBtnClicked(true);
					}}
				>
					<FcGoogle size={24} className='mr-2' /> Register with Google
				</Button>
			</div>
		</>
	);
};
