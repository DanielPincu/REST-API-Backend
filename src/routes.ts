import { Router, Request, Response } from 'express';
import { 
    createProduct, 
    getAllProducts, 
    getProductById, 
    updateProductById, 
    deleteProductById } from './controllers/productController';

import { loginUser, registerUser, verifyToken } from './controllers/authController';

const router = Router();

// Example route
router.get('/welcome', (req: Request, res: Response) => {
    res.status(200);
    res.send('Hello, World!');
});


router.post('/user/register', registerUser);
router.post('/user/login', loginUser);

router.post('/products', verifyToken, createProduct);
router.get('/products', getAllProducts);
router.get('/products/:id', getProductById);
router.put('/products/:id', verifyToken, updateProductById);
router.delete('/products/:id', verifyToken, deleteProductById);


export default router;

