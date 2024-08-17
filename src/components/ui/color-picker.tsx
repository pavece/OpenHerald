'use client';

import { HexColorPicker } from 'react-colorful';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useState } from 'react';

type Props = {
	value: string;
	onColorChange: (c: string) => void;
};

export const ColorPicker = ({ value, onColorChange }: Props) => {
	const [color, setColor] = useState(value);

	return (
		<Popover>
			<PopoverTrigger>
				<div className='h-[40px] w-full rounded-md border' style={{ backgroundColor: value }}></div>
			</PopoverTrigger>
			<PopoverContent>
				<HexColorPicker
					color={color}
					onChange={c => {
						setColor(c);
						onColorChange(c);
					}}
				/>
			</PopoverContent>
		</Popover>
	);
};
