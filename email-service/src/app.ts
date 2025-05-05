import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { json } from 'body-parser';
import emailRoutes from './routes/email.routes';

const app = express();

app.use(cors());
app.use(json());
app.use(morgan('dev'));

// Routes
app.use('/api/email', emailRoutes);

app.get('/', (req, res) => {
  res.send('Email service is running...');
});

export default app;
