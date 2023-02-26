import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type ProductQuestionAnswerDocument = ProductQuestionAnswer & Document;

@Schema({ timestamps: true, collection: 'pqa' })
export class ProductQuestionAnswer {
  @Prop({ required: true })
  questionId: number;

  @Prop({ required: true })
  questionContent: string;

  @Prop({ required: true })
  questionTime: number;

  @Prop({ required: true })
  productId: number;

  @Prop({ required: false })
  productTitle: string;

  @Prop({ required: true })
  isFeature: boolean;

  @Prop({ required: true, default: true })
  questionStatus: boolean;

  @Prop({ required: false })
  questionSource: number;

  @Prop({ required: false })
  questionCustomerName: string;

  @Prop({ required: false })
  questionCustomerEmail: string;

  @Prop({ required: false })
  answerId: number;

  @Prop({ required: false })
  answerContent: string;

  @Prop({ required: false })
  answerTime: number;

  @Prop({ required: true, default: true })
  dadaoOrigin: boolean;
}

const schema = SchemaFactory.createForClass(ProductQuestionAnswer);
schema.index({ questionId: 1 }, { unique: true });

export const ProductQuestionAnswersSchema = schema;
