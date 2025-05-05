import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { json } from 'body-parser';

const app = express();

app.use(cors());
app.use(json());
app.use(morgan('dev'));


app.get('/', (req, res) => {
  res.send('Cron service is running...');
});

export default app;
