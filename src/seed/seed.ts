import prisma from '../db/db';
import { seedArticles } from './data/articles';
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

		//Insert categories
		await prisma.category.createMany({ data: seedCategories });

		//Insert users
		await prisma.user.createMany({ data: seedUsers });

		//Insert articles
		await prisma.article.createMany({ data: seedArticles });

		console.log('Seed executed successfully!');
	} catch (error) {
		console.error('SEED ERROR');
		console.error(error);
	}
}

(() => {
	seedDatabase();
})();
