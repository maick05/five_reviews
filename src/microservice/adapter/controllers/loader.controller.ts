import { Controller, Get, Param, Req } from '@nestjs/common';
import { Request } from 'express';
import { LoadProductsQuestionsAnswersService } from 'src/microservice/application/services/load-products-questions-answers.service';
import { LoadReviewsService } from '../../application/services/load-reviews.service';

@Controller()
export class LoaderController {
  constructor(
    private readonly loadReviewsService: LoadReviewsService,
    private readonly loadPQAService: LoadProductsQuestionsAnswersService
  ) {}

  @Get('/load')
  async loadReviews(@Req() req: Request): Promise<any> {
    return await this.loadReviewsService.loadReviews(req.headers['cookie']);
  }

  @Get('/load/pqa')
  async loadPQA(@Req() req: Request): Promise<any> {
    return await this.loadPQAService.loadPQA(req.headers['cookie']);
  }
}
