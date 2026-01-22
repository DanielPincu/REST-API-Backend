import { Router, Request, Response } from 'express';
import { createProduct } from './controllers/productController';

const router = Router();

// Example route
router.get('/welcome', (req: Request, res: Response) => {
    res.status(200);
    res.send('Hello, World!');
});

router.post('/products', createProduct);





export default router;


