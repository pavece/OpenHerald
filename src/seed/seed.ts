import prisma from '../db/db';
import { seedAds } from './data/ads';
import { seedArticles } from './data/articles';
import { seedBanners } from './data/banners';
import { seedCategories } from './data/categories';
import { seedUsers } from './data/users';

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

		//Insert users
		await prisma.user.createMany({ data: seedUsers });

		//Insert articles
		await prisma.article.createMany({ data: seedArticles });

		//Insert ads
		await prisma.advertisement.createMany({ data: seedAds });

		//Insert banners
		await prisma.banner.createMany({ data: seedBanners });

		console.log('Seed executed successfully!');
	} catch (error) {
		console.error('SEED ERROR');
		console.error(error);
	}
}

(() => {
	seedDatabase();
})();
