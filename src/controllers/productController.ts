import { Request, Response } from 'express';
import { productModel } from '../models/productModel';
import { connect, disconnect } from '../repository/database';


export async function createProduct(req: Request, res: Response): Promise<void> {
   const data = req.body;
   try {
       await connect();
       const product = new productModel(data);
       const result = await product.save();
       res.status(201).send(result);
   } catch (err) {
       res.status(500).send({ message: 'Error creating product', error: err });
   } finally {
       await disconnect();
   }
}

export async function getAllProducts(req: Request, res: Response): Promise<void> {
   try {
       await connect();
       const result = await productModel.find({});
       res.status(200).send(result);
   } catch (err) {
       res.status(500).send({ message: 'Error fetching products', error: err });
   } finally {
       await disconnect();
   }
}

