import { Schema, model } from 'mongoose';
import { Product } from '../interfaces/product';
import { required } from 'joi/lib';

const productSchema = new Schema({
    name: { type: String, required: true, min: 1, max: 100 },
    description: { type: String, required: true, min: 1, max: 1000 },
    imageURL: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    isOnDiscount: { type: Boolean, required: true, default: false },
    discountPct: { type: Number, required: true, default: 0, min: 0, max: 100 },
    isHidden: { type: Boolean, default: false },
    _createdBy: { type: String, ref: 'User', required: true }
});

export const ProductModel = model<Product>('Product', productSchema);