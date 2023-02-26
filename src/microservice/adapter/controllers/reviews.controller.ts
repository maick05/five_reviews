import { Controller, Get, Param } from '@nestjs/common';
import { GetStarsService } from 'src/microservice/application/services/get-stars.service';
import { FeaturedReview } from 'src/microservice/domain/dto/featured-reviews.dto';
import { ProductOverviewData } from 'src/microservice/domain/dto/product-overview.dto';
import { ReviewProduct } from 'src/microservice/domain/dto/reviews-product.dto';
import {
  DadaoListResponse,
  DadaoResponse
} from 'src/microservice/domain/responses/dadao.response';
import { GetDadaoStarsResponse } from 'src/microservice/domain/responses/get-dadao-stars.response';
import { GetReviewsService } from '../../application/services/get-reviews.service';

@Controller()
export class ReviewsController {
  constructor(
    private readonly getReviewsService: GetReviewsService,
    private readonly getStarsService: GetStarsService
  ) {}

  @Get('/reviews/:id/:page')
  async getReviewsByProductId(
    @Param('id') id: number,
    @Param('page') page: number
  ): Promise<DadaoResponse<DadaoListResponse<ReviewProduct[]>>> {
    return await this.getReviewsService.getReviewsByProductId(id, page);
  }

  @Get('/stars/:id/')
  async getStarsByProductId(
    @Param('id') id: number
  ): Promise<DadaoResponse<GetDadaoStarsResponse>> {
    return await this.getStarsService.getStars(id);
  }

  @Get('/overview/:id/')
  async getOverviewByProductId(
    @Param('id') id: number
  ): Promise<DadaoResponse<ProductOverviewData>> {
    return await this.getStarsService.getOverview(id);
  }

  @Get('/featured/')
  async getFeaturedReviews(): Promise<
    DadaoResponse<DadaoListResponse<FeaturedReview[]>>
  > {
    return await this.getReviewsService.getFeaturedReviews();
  }
}
