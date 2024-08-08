import bcrypt from 'bcryptjs';

interface SeedUser {
	id: string;
	name: string;
	banned: boolean;
	description: string;
	email: string;
	password: string;
	roles: string[];
	image: string;
}

export const seedUsers: SeedUser[] = [
	{
		id: '47c2e21f-71d3-46cb-8bdc-c094567d4e88',
		name: 'John Doe',
		banned: false,
		description: "I'm an editor.",
		email: 'john@openherald.com',
		password: bcrypt.hashSync('password', bcrypt.genSaltSync()),
		roles: ['editor'],
		image: '',
	},
	{
		id: '123ad26d-99a8-4ccd-820c-ce9816effe0a',
		name: 'Jane Doe',
		banned: false,
		description: "I'm an admin.",
		email: 'jane@openherald.com',
		password: bcrypt.hashSync('password', bcrypt.genSaltSync()),
		roles: ['admin', 'editor'],
		image: '',
	},
	{
		id: '94fb31a6-fdd3-49ca-8c02-e001b5303157',
		name: 'Alice',
		banned: true,
		description: "I'm banned.",
		email: 'alice@openherald.com',
		password: bcrypt.hashSync('password', bcrypt.genSaltSync()),
		roles: ['editor'],
		image: '',
	},
	{
		id: '5a410bc5-da53-438b-8415-ee24f209bc0e',
		name: 'Bob',
		banned: false,
		description: "I'm the super admin.",
		email: 'bob@openherald.com',
		password: bcrypt.hashSync('password', bcrypt.genSaltSync()),
		roles: ['super-admin', 'admin', 'editor'],
		image: '',
	},
];
