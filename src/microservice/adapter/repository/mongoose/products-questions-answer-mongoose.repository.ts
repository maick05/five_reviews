import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MongooseRepository } from '@devseeder/nestjs-microservices-commons';
import {
  ProductQuestionAnswer,
  ProductQuestionAnswerDocument
} from 'src/microservice/domain/schemas/product-question-answer.schema';

@Injectable()
export class ProductsQuestionsAnswersMongooseRepository extends MongooseRepository<
  ProductQuestionAnswer,
  ProductQuestionAnswerDocument
> {
  constructor(
    @InjectModel(ProductQuestionAnswer.name)
    model: Model<ProductQuestionAnswerDocument>
  ) {
    super(model);
  }

  async removeAll() {
    await this.model.deleteMany({});
  }
}
