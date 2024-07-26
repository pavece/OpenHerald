export interface IArticle {
	title: string;
	description: string;
	thumbnail: string;
	priority: number;
	readingTime: number;
	content: string;
	showAds: boolean;
	verticalAds: 'none' | 'left' | 'right';
	horizontalAds: boolean;
	visibleForUsers: boolean;
}
