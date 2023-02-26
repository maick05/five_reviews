import { Controller, Get, Param } from '@nestjs/common';
import { GetReviewsService } from '../../application/services/get-reviews.service';
import { LoadReviewsService } from '../../application/services/load-reviews.service';

@Controller()
export class LoaderController {
  constructor(private readonly loadService: LoadReviewsService) {}

  @Get('/load')
  async loadReviews(): Promise<any> {
    return await this.loadService.loadReviews();
  }
}
