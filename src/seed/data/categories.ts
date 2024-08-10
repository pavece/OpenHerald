interface SeedCategory {
	id: string;
	name: string;
	description?: string;
}

export const seedCategories: SeedCategory[] = [
	{
		id: 'c8b33af8-2ffe-469e-8ad4-d77a83aaee9a',
		name: 'Technology',
	},
	{
		id: 'd4166eec-ce6b-4373-8cb7-a004323b4c59',
		name: 'Science',
	},
	{
		id: '1ceb5928-8e0f-47e9-b127-813b05e7c03a',
		name: 'Politics',
	},
	{
		id: 'f440f20f-556d-4636-aa79-75363a6fdb19',
		name: 'Economy',
	},
	{
		id: '38e8c67b-a7d1-41ed-97ae-4e841097c055',
		name: 'World',
	},
];
