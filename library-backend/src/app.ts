import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { json } from 'body-parser';
import bookRoutes from './routes/book.routes';
import walletRoutes from './routes/wallet.routes';
import operationRoutes from './routes/operation.routes';

const app = express();

app.use(cors());
app.use(json());
app.use(morgan('dev'));

// Routes
app.use('/api/books', bookRoutes);
app.use('/api/wallet', walletRoutes);
app.use('/api/operations', operationRoutes);

app.get('/', (req, res) => {
  res.send('Library API is running...');
});

export default app;
