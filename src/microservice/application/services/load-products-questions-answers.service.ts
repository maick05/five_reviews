import { Injectable } from '@nestjs/common';
import { ReviewsDadaoRepository } from '../../adapter/repository/reviews-dadao.repository';
import { ProductsQuestionsAnswersMongooseRepository } from 'src/microservice/adapter/repository/mongoose/products-questions-answer-mongoose.repository';
import { DadaoSQA } from 'src/microservice/domain/responses/get-all-dadao-sqa.response';
import { ProductQuestionAnswer } from 'src/microservice/domain/schemas/product-question-answer.schema';

@Injectable()
export class LoadProductsQuestionsAnswersService {
  constructor(
    private readonly reviewsDadaoRepository: ReviewsDadaoRepository,
    private readonly mongooseRepository: ProductsQuestionsAnswersMongooseRepository,
  ) {}

  async loadPQA(): Promise<any> {
    const dadaoData = await this.reviewsDadaoRepository.getAllSQA();
    await this.clear();
    await this.savePQAs(dadaoData.dataList);
    return dadaoData;
  }

  async clear(): Promise<void> {
    await this.mongooseRepository.removeAll();
  }

  async savePQAs(dadaoData: DadaoSQA[]) {
    for await (const item of dadaoData) {
      console.log('item');
      console.log(item);
      const pqa = new ProductQuestionAnswer();
      pqa.questionId = item.questionId;
      pqa.questionContent = item.questionContent;
      pqa.questionTime = item.questionTime;
      pqa.productId = item.productId;
      pqa.productTitle = item.productTitle;
      pqa.isFeature = item.isFeature;
      pqa.questionStatus = item.questionStatus;
      pqa.questionSource = item.questionSource;
      pqa.questionCustomerName = item.questionCustomerName;
      pqa.questionCustomerEmail = item.questionCustomerEmail;
      pqa.answerId = item.answerId;
      pqa.answerContent = item.answerContent;
      pqa.answerTime = item.answerTime;
      pqa.dadaoOrigin = true;

      await this.mongooseRepository.insertOne(pqa, pqa.questionId.toString());
    }
  }
}