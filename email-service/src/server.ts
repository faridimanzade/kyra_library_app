import app from './app';

import dotenv from 'dotenv';
dotenv.config();



const PORT = process.env.PORT || 4000;

async function start() {
  app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
  });
}

start();
