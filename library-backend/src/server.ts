import app from './app';
import { PrismaClient } from '@prisma/client';

import dotenv from 'dotenv';
dotenv.config();

const prisma = new PrismaClient();


const PORT = process.env.PORT || 3000;

async function start() {
  app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
  });
}

start();
