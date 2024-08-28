import { SiteConfig } from '@prisma/client';

export const siteConfigSeedData: SiteConfig = {
	id: 'c0bee8e7-cea5-42d7-ae2e-44c33b0d030b',
	siteName: 'OpenHerald',
	siteDescription: 'Some description',
	navbarCategories: ['Technology', 'Science', 'Politics'],
	mainPageCategories: ['Technology', 'Science', 'Politics', 'Economy', 'World'],
};
