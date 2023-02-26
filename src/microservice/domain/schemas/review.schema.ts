/* eslint-disable @typescript-eslint/no-unused-vars */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ReviewDocument = Review & Document;

@Schema({ timestamps: true, collection: 'reviews' })
export class Review {
  @Prop({ required: true })
  commentId: string;

  @Prop({ required: true })
  status: number;

  @Prop({ required: true })
  shopId: number;

  @Prop({ required: true })
  star: number;

  @Prop({ required: false })
  commentTitle: string;

  @Prop({ required: false })
  content: string;

  @Prop({ required: true })
  nick: string;

  @Prop({ required: false })
  email: string;

  @Prop({ required: false })
  additional_url: string;

  @Prop({ required: true })
  create_time: number;

  @Prop({ required: false })
  area: string;

  @Prop({ required: true, default: true })
  featured: boolean;

  @Prop({ required: false })
  platform: number;

  @Prop({ required: true })
  goods_title: string;

  @Prop({ required: false })
  replay_content: string;

  @Prop({ required: true, default: true })
  active: boolean;

  @Prop({ required: true })
  productId: number;

  @Prop({ required: false })
  handle: string;

  @Prop({ required: false, default: 0 })
  likeCount: number;

  @Prop({ required: false, default: 0 })
  dislikeCount: number;

  @Prop({ required: false, default: true })
  dislikeStatus: boolean;
}

const schema = SchemaFactory.createForClass(Review);
schema.index({ commentId: 1 }, { unique: true });

export const ReviewsSchema = schema;
