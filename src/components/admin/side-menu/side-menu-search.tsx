'use client';

import { Button } from '@/components/ui/button';
import {
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
} from '@/components/ui/command';
import { adminSearchItems, editorSearchItems, IDashboardSearchOptions } from '@/constants/dashboard-search-items';
import { useAdminUiStore } from '@/stores/admin-ui-store';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { PiBrowser, PiTerminal } from 'react-icons/pi';

export const SideMenuSearch = () => {
	const closeSideMenu = useAdminUiStore(state => state.closeSideMenu);
	const [options, setOptions] = useState<IDashboardSearchOptions | null>(null);
	const [open, setOpen] = useState(false);
	const session = useSession();
	const router = useRouter();

	useEffect(() => {
		const down = (e: KeyboardEvent) => {
			if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				setOpen(open => !open);
				closeSideMenu();
			}
		};
		document.addEventListener('keydown', down);

		if (session.data?.user.roles.includes('admin')) {
			setOptions(adminSearchItems);
		} else {
			setOptions(editorSearchItems);
		}

		return () => document.removeEventListener('keydown', down);
	}, [session, closeSideMenu]);

	return (
		<>
			<Button
				variant='outline'
				className='w-full flex justify-between'
				onClick={() => {
					setOpen(true);
					//closeSideMenu();
				}}
			>
				Search actions
				<kbd className='pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100'>
					<span className='text-xs'>⌘</span>K
				</kbd>
			</Button>
			<CommandDialog open={open} onOpenChange={setOpen}>
				<CommandInput placeholder='Type a command or search...' />
				<CommandList>
					<CommandEmpty>No results found.</CommandEmpty>
					<CommandGroup heading='Pages'>
						{options?.pages.map((option, i) => (
							<CommandItem
								key={option.title + i}
								onSelect={() => {
									router.push(option.destination);
									setOpen(false);
									closeSideMenu();
								}}
							>
								<PiBrowser size={24} className='mr-2' />
								{option.title}
							</CommandItem>
						))}
					</CommandGroup>
					<CommandSeparator />
					<CommandGroup heading='Actions'>
						{options?.actions.map((option, i) => (
							<CommandItem
								key={option.title + i}
								onSelect={() => {
									router.push(option.destination);
									setOpen(false);
									closeSideMenu();
								}}
							>
								<PiTerminal size={24} className='mr-2' />
								{option.title}
							</CommandItem>
						))}
					</CommandGroup>
				</CommandList>
			</CommandDialog>
		</>
	);
};
