import { Banner } from '@prisma/client';

export const seedBanners: Banner[] = [
	{
		id: '04fde1b3-30ed-46f8-8cb8-bcac51986691',
		isActive: true,
		text: 'Welcome to OpenHerald!',
		bgColor: '#3C3D37',
		textColor: '#ECDFCC',
		showIcon: true,
		createdAt: new Date(),
	},
	{
		id: '24e6a6a7-307c-4f08-b47f-97ec5581b614',
		isActive: false,
		text: 'Check our new in person event!',
		bgColor: '#3C3D37',
		textColor: '#ECDFCC',
		showIcon: true,
		createdAt: new Date(),
	},
];
