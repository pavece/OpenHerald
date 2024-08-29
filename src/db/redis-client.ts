import { createClient, type RedisClientType } from 'redis';

const globalForRedis = global as unknown as { redisClient: RedisClientType };

export const redisClient = globalForRedis.redisClient ?? createClient({ url: process.env.REDIS_URL });

redisClient.on('error', error => console.log(error));

if (!redisClient.isOpen) {
	redisClient.connect();
}

if (process.env.NODE_ENV !== 'production') {
	globalForRedis.redisClient = redisClient;
}
