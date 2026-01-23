import  { Schema, model } from 'mongoose';
import { User } from '../interfaces/user';

const userSchema = new Schema({
    name: { type: String, required: true, unique: true, min: 3, max: 30 },
    email: { type: String, required: true, unique: true, min: 5, max: 255 },
    password: { type: String, required: true, min: 8, max: 1024 },
    createdAt: { type: Date, default: Date.now }
});

export const userModel = model<User>('User', userSchema);