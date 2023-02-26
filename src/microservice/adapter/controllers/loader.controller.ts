import { Controller, Get, Param } from '@nestjs/common';
import { LoadProductsQuestionsAnswersService } from 'src/microservice/application/services/load-products-questions-answers.service';
import { GetReviewsService } from '../../application/services/get-reviews.service';
import { LoadReviewsService } from '../../application/services/load-reviews.service';

@Controller()
export class LoaderController {
  constructor(
    private readonly loadReviewsService: LoadReviewsService,
    private readonly loadPQAService: LoadProductsQuestionsAnswersService
  ) {}

  @Get('/load')
  async loadReviews(): Promise<any> {
    return await this.loadReviewsService.loadReviews();
  }

  @Get('/load/pqa')
  async loadPQA(): Promise<any> {
    return await this.loadPQAService.loadPQA();
  }
}
