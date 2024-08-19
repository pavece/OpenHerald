'use server';

import { redisClient } from '@/db/redis-client';
import { format } from 'date-fns';

/**
 *  Used for storing view analytics for any resource.
 *
 *  @param id Determines the ID from the resource the user is visiting ie: article ID | ad ID.
 *  @param type Determines the type of resource the user is visiting ie: Page, Article, AD
 *  */

export const addAnalyticsView = async (id: string, type: string) => {
	try {
		const date = format(new Date(), 'MM-dd-yyyy');
		const existingRecord = await redisClient.get(`${type}:${id}:${date}`);
		await redisClient.set(`${type}:${id}:${date}`, existingRecord ? Number(existingRecord) + 1 : 1);
	} catch (error) {
		console.log(error);
		console.error(`Analytics record saving failed for resource of type ${type} and id ${id}`);
	}
};
