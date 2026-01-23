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

export async function getProductById(req: Request, res: Response): Promise<void> {
   try {
       await connect();
       const id = req.params.id;

       const result = await productModel.findById(id);

       if (!result) {
           res.status(404).send({ message: 'Product not found' });
           return;
       }

       res.status(200).send(result);
   } catch (err: any) {
       if (err.name === 'CastError') {
           res.status(400).send({ message: 'Invalid product ID format' });
       } else {
           res.status(500).send({ message: 'Error fetching product by ID', error: err });
       }
   } finally {
       await disconnect();
   }
}

export async function updateProductById(req: Request, res: Response): Promise<void> {
   try {
       await connect();

       const id = req.params.id;

       const result = await productModel.findByIdAndUpdate(id, req.body);

       if (!result) {
           res.status(404).send('Product not found');
       }
        else {
           res.status(200).send('Product updated successfully');   
        }

       res.status(200).send(result);
   } catch (err) {
       res.status(500).send('Error updating product by ID');
   } finally {
       await disconnect();
   }
}


export async function deleteProductById(req: Request, res: Response): Promise<void> {
   try {
       await connect();
       const id = req.params.id;

       const result = await productModel.findByIdAndDelete(id);

       if (!result) {
           res.status(404).send({ message: 'Cannot delete product' });
           return;
       }

       res.status(200).send({ message: 'Product deleted successfully' });
   } catch (err: any) {
       if (err.name === 'CastError') {
           res.status(400).send({ message: 'Invalid product ID format' });
       } else {
           res.status(500).send({ message: 'Error deleting product', error: err });
       }
   } finally {
       await disconnect();
   }
}