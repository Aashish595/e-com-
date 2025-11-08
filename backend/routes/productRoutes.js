import express from 'express';
import { getAllProducts, getProductById } from '../controllers/productController.js';
import Product from '../models/Product.js';

const router = express.Router();

router.get('/', getAllProducts);
router.get('/:id', getProductById);


export default router;
