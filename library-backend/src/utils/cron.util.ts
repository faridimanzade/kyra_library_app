import { Queue } from 'bullmq';
import IORedis from 'ioredis';

const connection = new IORedis(process.env.REDIS_URL || 'redis://redis:6379');

const restockQueue = new Queue('restock', { connection });
const returnQueue = new Queue('return', { connection });

export async function scheduleRestock(bookId: string) {
  await restockQueue.add(
    'restock-book',
    { bookId },
    {
      delay: 60 * 60 * 1000,
      removeOnComplete: true,
      removeOnFail: true,
    }
  );

  console.log(`🕐 Restock job added for book ID ${bookId}`);
}



export async function scheduleUserReturn(bookId: string,email: string) {
    await returnQueue.add(
      'return-book',
      { bookId,email },
      {
        delay: 3 * 24 * 60 * 60 * 1000,
        removeOnComplete: true,
        removeOnFail: true,
      }
    );
  
    console.log(`🕐 Return job added for book ID ${bookId}`);
  }
