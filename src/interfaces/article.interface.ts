export interface IArticle {
	title: string;
	description: string;
	thumbnail: string;
	priority: number;
	category: string;
	readingTime: number;
	content: string;
	showAds: boolean;
	verticalAds: 'none' | 'left' | 'right';
	horizontalAds: boolean;
	visibleForUsers: boolean;
}

export enum EArticlePriority {
	featured,
	cover,
	normal,
}
