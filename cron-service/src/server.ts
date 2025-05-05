import app from './app';
import "./worker"
import "./queue"
import "./restock.handler"
import "./return.handler"
import dotenv from 'dotenv';
dotenv.config();



const PORT = process.env.PORT || 6060;

async function start() {
  app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
  });
}

start();
