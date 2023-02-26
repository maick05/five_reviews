import { Injectable } from '@nestjs/common';
import { ProductsQuestionsAnswersMongooseRepository } from 'src/microservice/adapter/repository/mongoose/products-questions-answer-mongoose.repository';
import { PQAObjectDTO } from 'src/microservice/domain/dto/pqa.dto';
import {
  DadaoListResponse,
  DadaoResponse
} from 'src/microservice/domain/responses/dadao.response';
import { ProductQuestionAnswer } from 'src/microservice/domain/schemas/product-question-answer.schema';

@Injectable()
export class GetPQAService {
  constructor(
    private readonly mongooseRepository: ProductsQuestionsAnswersMongooseRepository
  ) {}

  async getPQAByProductId(
    id: number,
    page: number
  ): Promise<DadaoResponse<DadaoListResponse<PQAObjectDTO[]>>> {
    const dataCount = await this.mongooseRepository.find(
      { productId: id },
      { questionId: 1 },
      { questionTime: -1 },
      false
    );

    const data = await this.mongooseRepository.findByProduct(id, page);

    return {
      code: 200,
      column: null,
      msg: 'Successful operation',
      data: {
        pageSize: 10,
        total: dataCount.length,
        totalPages: Math.round(dataCount.length / 10),
        currentPage: page,
        dataList: data.map((item: ProductQuestionAnswer) => {
          const sqa = new PQAObjectDTO();
          sqa.questionId = item.questionId.toString();
          sqa.questionContent = item.questionContent;
          sqa.questionTime = item.questionTime;
          sqa.questionSource = item.questionSource;
          sqa.questionCustomerName = item.questionCustomerName;
          sqa.questionCustomerEmail = item.questionCustomerEmail;
          sqa.answerContent = item.answerContent;
          sqa.answerTime = item.answerTime;
          sqa.likeCount = item.likeCount;
          sqa.dislikeCount = item.dislikeCount;
          sqa.likeStatus = item.dislikeStatus ? 1 : 0;
          return sqa;
        }),
        otherData: null
      },
      otherData: null
    };
  }
}
