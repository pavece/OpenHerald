import { Advertisement } from '@prisma/client';

export const seedAds: Advertisement[] = [
	{
		id: '4aaaeb55-6c7a-49ef-b7d8-c83f11783a32',
		title: 'Visit vertex gallery',
		destinationUrl: 'https://vertexgallery.pavece.com/',
		mediaLink: '/images/dev/ads/ad-image-1.jpg',
		vertical: true,
	},
	{
		id: '48058e37-d49e-475d-bc7f-1e8bb06060dd',
		title: 'Visit vertex gallery',
		destinationUrl: 'https://vertexgallery.pavece.com/',
		mediaLink: '/images/dev/ads/ad-image-2.jpg',
		vertical: true,
	},
	{
		id: '629265f4-816d-4f0f-83b9-9068d21b7a20',
		title: 'Visit vertex gallery',
		destinationUrl: 'https://vertexgallery.pavece.com/',
		mediaLink: '/images/dev/ads/ad-image-3.jpg',
		vertical: false,
	},
	{
		id: 'f527a1a4-32e0-4daf-8401-6bd3623b3b04',
		title: 'Visit shader wines',
		destinationUrl: 'https://shaderwines.pavece.com/',
		mediaLink: '/images/dev/ads/ad-image-4.jpg',
		vertical: false,
	},
	{
		id: '50c42a0e-5fab-4fff-8792-3ea2c01637fd',
		title: 'Be careful with the servers!',
		destinationUrl: '',
		mediaLink: '/images/dev/test-gif-1.gif',
		vertical: true,
	},
];
