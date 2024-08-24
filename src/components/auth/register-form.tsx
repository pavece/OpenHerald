'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { loginUserClient } from '@/actions/auth/login-user-client';
import { PiWarning } from 'react-icons/pi';
import { useState } from 'react';
import { createUser } from '@/actions/auth/register-user';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { GoogleButton } from './google-button';

const formSchema = z
	.object({
		email: z.string().email(),
		username: z.string().min(3).max(30),
		password: z.string().min(6, { message: 'Password should have at least 6 character(s)' }),
		passwordRepeat: z.string(),
	})
	.refine(({ password, passwordRepeat }) => password === passwordRepeat, {
		message: "Passwords don't match",
		path: ['passwordRepeat'],
	});

type Props = {
	linkId: string;
	firstTime?: boolean;
};

export const RegisterForm = ({ linkId, firstTime }: Props) => {
	const [credentialsError, setCredentialsError] = useState(false);
	const [credentialsErrorMessage, setCredentialsErrorMessage] = useState('');

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: { email: '', password: '', username: '', passwordRepeat: '' },
	});

	const onSubmit = async () => {
		try {
			const values = form.getValues();
			const user = await createUser(values.username, values.email, values.password, linkId);
			if (user?.ok) {
				await loginUserClient({ password: values.password, email: values.email });
				return;
			}

			setCredentialsError(true);
			setCredentialsErrorMessage(user?.message ?? '');
		} catch (error) {
			console.log(error);
			setCredentialsError(true);
		}
	};

	return (
		<div className='w-[100vw] md:w-[500px] px-4'>
			<div className='mb-6'>
				<h1 className='text-2xl'>Register</h1>
				<p className='text-zinc-500'>Register a new account</p>
			</div>

			{credentialsError && (
				<Alert className='mb-4' variant='destructive'>
					<PiWarning size={20} />
					<AlertTitle>Error</AlertTitle>
					<AlertDescription>Something went wrong, {credentialsErrorMessage}</AlertDescription>
				</Alert>
			)}

			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<FormField
						control={form.control}
						name='email'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input placeholder='johnDoe@email.com' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					></FormField>
					<FormField
						control={form.control}
						name='username'
						render={({ field }) => (
							<FormItem className='mt-3'>
								<FormLabel>Username</FormLabel>
								<FormControl>
									<Input type='text' placeholder='John Doe' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					></FormField>
					<FormField
						control={form.control}
						name='password'
						render={({ field }) => (
							<FormItem className='mt-3'>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<Input type='password' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					></FormField>
					<FormField
						control={form.control}
						name='passwordRepeat'
						render={({ field }) => (
							<FormItem className='mt-3'>
								<FormLabel>Repeat password</FormLabel>
								<FormControl>
									<Input type='password' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					></FormField>
					<Button type='submit' className='mt-4 w-full'>
						Register
					</Button>
				</form>
			</Form>
			<hr className='mt-4' />
			<GoogleButton register={!firstTime} linkId={linkId} />
		</div>
	);
};
