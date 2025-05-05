import { Queue } from 'bullmq';
import IORedis from 'ioredis';
import dotenv from 'dotenv';

dotenv.config();

const connection = new IORedis(process.env.REDIS_URL || '', {
    maxRetriesPerRequest: null,
  });

export const restockQueue = new Queue('restock', { connection });
export const returnQueue = new Queue('return', { connection });
