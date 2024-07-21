'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { loginUserClient } from '@/actions/auth/login-user-client';
import { redirect } from 'next/navigation';
import { AlertTitle, Alert, AlertDescription } from '../ui/alert';
import { PiWarning } from 'react-icons/pi';
import { useState } from 'react';
import { GoogleButton } from './google-button';

const formSchema = z.object({
	email: z.string().email(),
	password: z.string().min(6, { message: 'Password should have at least 6 character(s)' }),
});

export const LoginForm = () => {
	const [credentialsError, setCredentialsError] = useState(false);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: { email: '', password: '' },
	});

	const onSubmit = async () => {
		try {
			await loginUserClient(form.getValues());
			redirect('/admin');
		} catch (error) {
			setCredentialsError(true);
		}
	};

	return (
		<div className='w-full px-4 md:w-[500px]'>
			<div className='mb-6'>
				<h1 className='text-2xl'>Login</h1>
				<p className='text-zinc-500'>Enter your credentials</p>
			</div>

			{credentialsError && (
				<Alert className='mb-4' variant='destructive'>
					<PiWarning size={20} />
					<AlertTitle>Error</AlertTitle>
					<AlertDescription>Credentials are incorrect, check your credentials and try again</AlertDescription>
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
					<Button type='submit' className='mt-4 w-full'>
						Login
					</Button>
				</form>
			</Form>
			<hr className='mt-4' />
			<GoogleButton />

			<div className='mt-6'>
				<p className='text-zinc-500'>
					If you don{"'"}t have an account or don{"'t"} remember the credentials, please contact the site administrator
				</p>
			</div>
		</div>
	);
};
