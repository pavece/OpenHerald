'use server';

import prisma from '@/db/db';
import { ISiteConfig } from './update-site-config';

const defaultConfig: ISiteConfig = {
	siteName: 'OpenHerald',
	siteDescription: 'OpenHerald is a simple open source news platform.',
	navbarCategories: [''],
	mainPageCategories: [''],
};

export const getSiteConfig = async () => {
	try {
		const siteConfig = await prisma.siteConfig.findFirst();

		if (!siteConfig) {
			return {
				ok: true,
				config: defaultConfig,
			};
		}

		return {
			ok: false,
			config: {
				...siteConfig,
			},
		};
	} catch (error) {
		console.log(error);

		return {
			ok: false,
			config: defaultConfig,
		};
	}
};
