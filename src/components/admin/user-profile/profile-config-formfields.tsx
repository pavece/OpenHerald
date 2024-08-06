'use client';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { FormImagePreview } from '@/components/admin/publish/form-image-preview';
import { Select, SelectContent, SelectTrigger, SelectItem, SelectValue } from '@/components/ui/select';
import { useSession } from 'next-auth/react';
import { PiFloppyDiskBack, PiGavel } from 'react-icons/pi';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

type Props = {
	form: any;
	isGoogle?: boolean;
	loading: boolean;
	admin?: boolean;
	onSubmit: (params: any) => void;
};

export const ProfileConfigFormFields = ({ form, isGoogle, loading, onSubmit, admin }: Props) => {
	const session = useSession();

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
				<FormField
					control={form.control}
					name='name'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Name</FormLabel>
							<FormControl>
								<Input placeholder='John Doe' className='bg-white' {...field} />
							</FormControl>
							<FormDescription>Public display name.</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='email'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input disabled={isGoogle} placeholder='some@email.com' className='bg-white' type='email' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='description'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Description (optional)</FormLabel>
							<FormControl>
								<Textarea className='md:h-[130px]' placeholder='Some description' {...field} />
							</FormControl>
							<FormDescription>Write a short description about your work.</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					name='picture'
					control={form.control}
					render={({ field: { onChange, value, ...fieldProps } }) => (
						<FormItem>
							<FormLabel>Thumbnail</FormLabel>
							<FormControl>
								<Input
									type='file'
									onChange={e => onChange(e.target.files)}
									className='bg-white max-w-[400px]'
									accept='image/jpg image/png image/jpeg image/webp'
									{...fieldProps}
								/>
							</FormControl>
							<FormMessage />
							<FormImagePreview image={form.getValues().picture} square />
							<FormDescription>Upload any image to replace the current one.</FormDescription>
						</FormItem>
					)}
				></FormField>

				{admin && (
					<div>
						<h3 className='text-lg mb-4'>Admin options</h3>

						<FormField
							name='role'
							control={form.control}
							render={({ field: { onChange, value } }) => (
								<FormItem>
									<FormLabel>Role</FormLabel>

									<Select onValueChange={onChange} defaultValue={value}>
										<FormControl className='max-w-[250px]'>
											<SelectTrigger>
												<SelectValue placeholder='Select a role' />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{session.data?.user.roles.includes('super-admin') && (
												<SelectItem value='super-admin'>Super Admin</SelectItem>
											)}

											<SelectItem value='admin'>Admin</SelectItem>
											<SelectItem value='editor'>Editor</SelectItem>
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						></FormField>

						<AlertDialog>
							<Button variant='destructive' className='mt-6 mb-8 min-w-[160px]' asChild>
								<AlertDialogTrigger>
									<PiGavel className='mr-2' size={24} /> Ban user
								</AlertDialogTrigger>
							</Button>
							<AlertDialogContent>
								<AlertDialogHeader>
									<AlertDialogTitle>Are you sure?</AlertDialogTitle>
									<AlertDialogDescription>
										Banning a user will revoke all privileges they have. This action won't take immediate effect. The
										user will still be able to view some data but won't be able to perform any relevant actions. Full
										user access will be revoked when the session expires or if the user tries to perform a relevant
										action.
									</AlertDialogDescription>
								</AlertDialogHeader>
								<AlertDialogFooter>
									<AlertDialogCancel>Cancel</AlertDialogCancel>
									<AlertDialogAction>Continue</AlertDialogAction>
								</AlertDialogFooter>
							</AlertDialogContent>
						</AlertDialog>
					</div>
				)}

				<div>
					<Button className='min-w-[180px]' type='submit' disabled={loading}>
						<PiFloppyDiskBack size={24} className='mr-2' /> {loading ? 'Loading...' : 'Update'}
					</Button>
					<p className='text-zinc-500 text-sm mt-2'>
						Some visual changes may require you to log out and log back in to take effect.
					</p>
				</div>
			</form>
		</Form>
	);
};
