import { Controller, Get } from '@nestjs/common';
import { LoadReviewsService } from '../../application/services/load-reviews.service';

@Controller()
export class ReviewsController {
  constructor(private readonly loadService: LoadReviewsService) {}

  @Get('/load')
  async getHello(): Promise<any> {
    return await this.loadService.loadReviews();
  }
}
