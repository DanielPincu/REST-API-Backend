import { Request, Response } from 'express';
import { productModel } from '../models/productModel';
import { connect, disconnect } from '../repository/database';
import { error } from 'console';



export async function createProduct(req: Request, res: Response): Promise<void> {
   const data = req.body;
   try {
       await connect();
       const product = new productModel(data);
       const result = await product.save();
       res.status(201).json(result);
   } catch (err) {
       res.status(500).json({ message: 'Error creating product', error: err });
   } finally {
       await disconnect();
   }
}