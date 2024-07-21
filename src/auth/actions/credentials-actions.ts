import prisma from '@/db/db';
import bcrypt from 'bcryptjs';

export const signInEmailPassword = async (password: string, email: string) => {
	if (!email || !password) return null;
	const user = await prisma.user.findUnique({ where: { email } });

	if (!user) {
		const result = await createUser('someUsername', email, password);
		//throw new Error('User not found');
		if (result?.ok) {
			return user;
		}

		return null;
	}

	if (!bcrypt.compareSync(password, user.password!)) {
		throw new Error('The password is not correct');
	}

	return user;
};

export const createUser = async (username: string, email: string, password: string) => {
	if (!username || !email || !password) {
		return null;
	}

	try {
		const userTry = await prisma.user.findUnique({ where: { email } });

		if (userTry) {
			return {
				ok: false,
				message: 'Email already exists',
			};
		}

		const hashSaltPassword = bcrypt.hashSync(password);

		const user = await prisma.user.create({ data: { name: username, email, password: hashSaltPassword } });

		console.log(user);

		return { ok: true, user };
	} catch (error) {
		console.log(error);
		return { ok: false, message: 'Cannot create user' };
	}
};
