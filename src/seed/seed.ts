import prisma from '../db/db';
import { seedArticles } from './data/articles';
import { seedUsers } from './data/users';

async function seedDatabase() {
	try {
		//Purge database
		await prisma.article.deleteMany();
		await prisma.user.deleteMany();
		await prisma.registerAuthorization.deleteMany();

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
