import prisma from '../db/db';
import { seedBanners } from './data/banners';
import { seedCategories } from './data/categories';
import { siteConfigSeedData } from './data/site-config';

async function seedDatabase() {
	try {
		//Clear database
		await prisma.article.deleteMany();
		await prisma.user.deleteMany();
		await prisma.category.deleteMany();
		await prisma.registerAuthorization.deleteMany();
		await prisma.account.deleteMany();
		await prisma.advertisement.deleteMany();
		await prisma.banner.deleteMany();

		//Insert categories
		await prisma.category.createMany({ data: seedCategories });

		//Insert banners
		await prisma.banner.createMany({ data: seedBanners[0] });

		//Insert site config
		await prisma.siteConfig.create({ data: siteConfigSeedData });

		console.log('Seed executed successfully!');
	} catch (error) {
		console.error('SEED ERROR');
		console.error(error);
	}
}

(() => {
	seedDatabase();
})();
