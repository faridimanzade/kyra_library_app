import { Worker } from 'bullmq';
import IORedis from 'ioredis';
import dotenv from 'dotenv';
import { restockBook } from './restock.handler';
import { returnBook } from './return.handler';

dotenv.config();

const connection = new IORedis(process.env.REDIS_URL || '', {
  maxRetriesPerRequest: null,
});


const restockWorker = new Worker(
  'restock',
  async job => {
    const { bookId } = job.data;
    await restockBook(bookId);
  },
  { connection }
);

restockWorker.on('completed', job => {
  console.log(`✅ Job completed (restock): ${job.id}`);
});

restockWorker.on('failed', (job, err) => {
  console.error(`❌ Job failed (restock): ${job?.id}`, err);
});


const returnWorker = new Worker(
    'return',
    async job => {
      const { bookId,email } = job.data;
      await returnBook(bookId,email);
    },
    { connection }
  );
  
  returnWorker.on('completed', job => {
    console.log(`✅ Job completed (return): ${job.id}`);
  });
  
  returnWorker.on('failed', (job, err) => {
    console.error(`❌ Job failed (return): ${job?.id}`, err);
  });
  
