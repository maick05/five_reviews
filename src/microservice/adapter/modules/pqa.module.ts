import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GetPQAService } from 'src/microservice/application/services/get-pqa.service';
import {
  ProductQuestionAnswer,
  ProductQuestionAnswersSchema
} from 'src/microservice/domain/schemas/product-question-answer.schema';
import { PQAController } from '../controllers/pqa.controller';
import { ProductsQuestionsAnswersMongooseRepository } from '../repository/mongoose/products-questions-answer-mongoose.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ProductQuestionAnswer.name, schema: ProductQuestionAnswersSchema }
    ])
  ],
  controllers: [PQAController],
  providers: [GetPQAService, ProductsQuestionsAnswersMongooseRepository],
  exports: [GetPQAService, ProductsQuestionsAnswersMongooseRepository]
})
export class PQAModule {}
