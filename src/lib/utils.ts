import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function cropText(text: string, len: number) {
	if (text.length <= len) {
		return text;
	}

	return text.substring(0, len) + '...';
}
