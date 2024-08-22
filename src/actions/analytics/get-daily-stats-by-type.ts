'use server';

import { auth } from '@/auth';
import { redisClient } from '@/db/redis-client';
import { startOfDay, subDays, compareAsc } from 'date-fns';

/** *
 * Get all the views under a desired type from today.
 * Used for bar charts an comparing resources ex: best performing article for today
 *  */

export const getDailyStatsByType = async (type: string) => {
	try {
		const session = await auth();
		if (!session?.user) {
			throw new Error('Unauthenticated');
		}

		const limitDate = startOfDay(new Date());
		const keys = await redisClient.keys(`${type}:*`);
		const valuePromises: Promise<string | null>[] = [];

		const validKeys = keys.filter(k => {
			const keyDate = k.split(':')[2];
			if (compareAsc(new Date(keyDate), limitDate) <= 0) {
				valuePromises.push(redisClient.get(k));
				return true;
			}
		});

		const values = await Promise.all(valuePromises);
		const metrics: { [key: string]: number } = {};

		for (let i = 0; i < validKeys.length; i++) {
			metrics[validKeys[i].split(':')[1]] = Number(values[i]);
		}

		return {
			ok: true,
			sourceType: type,
			date: validKeys[0]?.split(':')[2],
			metrics,
		};
	} catch (error) {
		console.log(error);
		return {
			ok: false,
			metrics: {},
		};
	}
};
