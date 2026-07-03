import { Router } from 'express';

import { getAllProducts, getProduct } from '../services/products.service';

const router = Router();

// GET /api/products
router.get('/', async (_req, res) => {
  const products = await getAllProducts();
  res.json({ products });
});

router.get('/:productId', async (req, res) => {
  const productId = req.params.productId
  const product = await getProduct(productId);
  res.json({ product });
});

export default router;
