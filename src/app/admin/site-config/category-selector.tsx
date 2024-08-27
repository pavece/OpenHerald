'use client';

import { useCallback, useEffect, useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

type Props = {
	validCategories: string[];
	initialSelection?: string[];
	onChange: (selected: string[]) => void;
};

export const CategorySelector = ({ validCategories, onChange, initialSelection = [] }: Props) => {
	const [availCategories, setAvailCategories] = useState<string[]>([]);
	const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

	const selectCategory = (category: string) => {
		setSelectedCategories(s => {
			const selected = [...s, category];
			return selected;
		});
		setAvailCategories(avail => avail.filter(c => c !== category));
	};

	const deselectCategory = (category: string) => {
		setSelectedCategories(s => {
			const selected = s.filter(c => c !== category);
			return selected;
		});
		setAvailCategories(avail => [...avail, category]);
	};

	useEffect(() => {
		setAvailCategories(validCategories.filter(c => !initialSelection.includes(c)));
		if (initialSelection.length) {
			setSelectedCategories(initialSelection);
		}
	}, [validCategories, initialSelection]);

	useEffect(() => {
		onChange(selectedCategories);
	}, [selectedCategories]);

	return (
		<div>
			<div className='mb-4'>
				<div className='flex items-start gap-3 flex-wrap flex-row'>
					{selectedCategories.map(category => (
						<Badge
							variant='outline'
							className='rounded-full px-2 hover:bg-red-500 cursor-pointer'
							onClick={() => {
								deselectCategory(category);
							}}
							key={category}
						>
							{category}
						</Badge>
					))}
				</div>
				{!!selectedCategories.length && <p className='text-sm mt-4 text-zinc-500'>Click elements to remove.</p>}
			</div>
			<h4 className='text-sm font-medium mb-2'>Select elements to add</h4>
			<Select onValueChange={selectCategory}>
				<SelectTrigger className='w-[180px]'>
					<SelectValue placeholder='Select a category...' />
				</SelectTrigger>
				<SelectContent>
					{availCategories.map(category => (
						<SelectItem key={category} value={category}>
							{category}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
	);
};
