import { Router, Request, Response } from 'express';
import { createProduct, getAllProducts } from './controllers/productController';

const router = Router();

// Example route
router.get('/welcome', (req: Request, res: Response) => {
    res.status(200);
    res.send('Hello, World!');
});

router.post('/products', createProduct);
router.get('/products', getAllProducts);





export default router;


