'use server';

import prisma from '@/db/db';
import { Advertisement } from '@prisma/client';
import { HorizontalAd } from '../../components/ads/horizontal-ad';

type AdTypes = {
	vertical: boolean;
	horizontal: boolean;
};

type AdsResponse = {
	verticalAd?: Advertisement | null;
	horizontalAd?: Advertisement | null;
};

export const getArticleAds = async ({ vertical, horizontal }: AdTypes) => {
	try {
		const ads: AdsResponse = {};

		if (vertical) {
			const verticalCount = await prisma.advertisement.count({ where: { vertical: true } });
			ads.verticalAd = await prisma.advertisement.findFirst({
				where: { vertical: true },
				skip: Math.floor(Math.random() * verticalCount),
			});
		}

		if (horizontal) {
			const horizontalCount = await prisma.advertisement.count({ where: { vertical: false } });

			ads.horizontalAd = await prisma.advertisement.findFirst({
				where: { vertical: false },
				skip: Math.floor(Math.random() * horizontalCount),
				take: 1,
			});
		}

		return {
			ok: true,
			ads,
		};
	} catch (error) {
		console.log(error);
		return {
			ok: false,
			message: 'Unknown error while trying to retrieve the ads',
		};
	}
};
