'use client';

import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { PiUserPlus } from 'react-icons/pi';
import { useState } from 'react';
import clsx from 'clsx';
import { generateRegisterLink } from '@/actions/auth/generate-register-link';

export const NewAccountMenu = () => {
	const [link, setLink] = useState<string | null>(null);

	const getLink = async () => {
		const { ok, link } = await generateRegisterLink();

		if (!ok) {
			return;
		}

		setLink(link!);
		navigator.clipboard.writeText(link!);
	};

	return (
		<Dialog
			onOpenChange={() => {
				setLink(null);
			}}
		>
			<DialogTrigger asChild>
				<Button variant='outline'>
					<PiUserPlus size={22} className='mr-2' /> Add user
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Add a new user</DialogTitle>
					<DialogDescription>Generate a single-use link to invite a new member to register</DialogDescription>
				</DialogHeader>

				<Alert
					className={clsx('', {
						block: !!link ?? false,
						hidden: !link ?? true,
					})}
				>
					<AlertTitle>Link copied !</AlertTitle>
					<AlertDescription>
						Send this registration link to invite someone to sign up: <span className='font-medium'>{link}</span>
					</AlertDescription>
				</Alert>

				<Button onClick={getLink}>Generate link</Button>
			</DialogContent>
		</Dialog>
	);
};
