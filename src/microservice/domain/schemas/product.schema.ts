/* eslint-disable @typescript-eslint/no-unused-vars */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema({ timestamps: true, collection: 'products' })
export class Product {
  @Prop({ required: true })
  id: number;

  @Prop({ required: true })
  shopId: number;

  @Prop({ required: true })
  title: string;

  @Prop({ required: false })
  images: string;

  @Prop({ required: true, default: 'active' })
  status: string;

  @Prop({ required: true })
  handle: string;

  @Prop({ required: false, default: 5.0 })
  avgStar: number;
}

const schema = SchemaFactory.createForClass(Product);
schema.index({ id: 1 }, { unique: true });

export const ProductsSchema = schema;
