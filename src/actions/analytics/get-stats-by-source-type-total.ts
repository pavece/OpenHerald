'use server';

import { redisClient } from '@/db/redis-client';
import { startOfDay, subDays, compareAsc } from 'date-fns';

export const getStatsBySourceTypeTotal = async (type: string, span: number = 30) => {
	const limitDate = startOfDay(subDays(new Date(), span));

	const keys = await redisClient.keys(`${type}:*`);

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
		metrics[validKeys[i].split(':')[2]] = (metrics[validKeys[i].split(':')[2]] ?? 0) + Number(values[i]);
	}

	return {
		sourceType: type,
		metrics,
	};
};
