import express from 'express';

import productsRouter from './routes/products.routes';

const app = express();

app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/products', productsRouter);

export default app;
