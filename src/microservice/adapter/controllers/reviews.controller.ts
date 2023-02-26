import { Controller, Get, Param } from '@nestjs/common';
import { ReviewProduct } from 'src/microservice/domain/dto/reviews-product.dto';
import {
  DadaoListResponse,
  DadaoResponse
} from 'src/microservice/domain/responses/dadao.response';
import { GetReviewsService } from '../../application/services/get-reviews.service';

@Controller()
export class ReviewsController {
  constructor(private readonly getReviewsService: GetReviewsService) {}

  @Get('/reviews/:id/:page')
  async getReviewsByProductId(
    @Param('id') id: number,
    @Param('page') page: number
  ): Promise<DadaoResponse<DadaoListResponse<ReviewProduct[]>>> {
    return await this.getReviewsService.getReviewsByProductId(id, page);
  }

  @Get('/stars/:id/')
  async getStarsByProductId(
    @Param('id') id: number,
    @Param('page') page: number
  ): Promise<any> {
    return await this.getReviewsService.getStars(id);
  }

  @Get('/featured/')
  async getFeaturedReviews(): Promise<any> {
    return await this.getReviewsService.getFeaturedReviews();
  }
}
