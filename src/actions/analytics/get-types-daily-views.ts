'use server';

import { redisClient } from '@/db/redis-client';
import { startOfDay, subDays, compareAsc } from 'date-fns';

export const getTypesDailyViews = async () => {
	const limitDate = startOfDay(subDays(new Date(), 0));

	const keys = await redisClient.keys('*');

	const valuePromises: Promise<string | null>[] = [];

	const validKeys = keys.filter(k => {
		const keyDate = k.split(':')[2];
		if (compareAsc(new Date(keyDate), limitDate)) {
			valuePromises.push(redisClient.get(k));
			return true;
		}
	});

	const values = await Promise.all(valuePromises);
	const metrics: { [key: string]: number } = {};

	for (let i = 0; i < validKeys.length; i++) {
		metrics[validKeys[i].split(':')[0]] = (metrics[validKeys[i].split(':')[0]] ?? 0) + Number(values[i]);
	}

	return {
		date: keys[0]?.split(':')[2],
		metrics,
	};
};
