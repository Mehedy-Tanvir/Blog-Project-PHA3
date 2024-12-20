import { ObjectId } from 'mongoose';

// order interface
export type TOrder = {
  email: string;
  product: ObjectId;
  quantity: number;
  totalPrice: number;
};
