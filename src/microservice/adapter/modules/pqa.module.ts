import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ProductQuestionAnswer,
  ProductQuestionAnswersSchema
} from 'src/microservice/domain/schemas/product-question-answer.schema';
import { ProductsQuestionsAnswersMongooseRepository } from '../repository/mongoose/products-questions-answer-mongoose.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ProductQuestionAnswer.name, schema: ProductQuestionAnswersSchema }
    ])
  ],
  controllers: [],
  providers: [ProductsQuestionsAnswersMongooseRepository],
  exports: [ProductsQuestionsAnswersMongooseRepository]
})
export class PQAModule {}
