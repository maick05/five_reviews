import { Injectable } from '@nestjs/common';
import { FeaturedReview } from 'src/microservice/domain/dto/featured-reviews.dto';
import { ReviewProduct } from 'src/microservice/domain/dto/reviews-product.dto';
import {
  DadaoListResponse,
  DadaoResponse
} from 'src/microservice/domain/responses/dadao.response';
import { GetDadaoStarsResponse } from 'src/microservice/domain/responses/get-dadao-stars.response';
import { Review } from 'src/microservice/domain/schemas/review.schema';
import { ReviewsMongooseRepository } from '../../adapter/repository/mongoose/reviews-mongoose.repository';
import { GetProductService } from './get-product.service';

@Injectable()
export class GetReviewsService {
  constructor(
    private readonly reviewsMongooseRepository: ReviewsMongooseRepository,
    private readonly getProductService: GetProductService
  ) {}

  async getReviewsByProductId(
    id: number,
    page: number
  ): Promise<DadaoResponse<DadaoListResponse<ReviewProduct[]>>> {
    const dataCount = await this.reviewsMongooseRepository.find(
      { productId: id },
      { commentId: 1 },
      { create_time: -1 },
      false
    );

    const data = await this.reviewsMongooseRepository.findByProduct(id, page);

    return {
      code: 200,
      column: null,
      msg: 'Successful operation',
      data: {
        pageSize: 10,
        total: dataCount.length,
        totalPages: Math.round(dataCount.length / 10),
        currentPage: page,
        dataList: data.map((item: Review) => {
          const rp = new ReviewProduct();
          rp.additional_url = item.additional_url;
          rp.area = item.area;
          rp.comment_content = item.content;
          rp.comment_star = item.star;
          rp.comment_title = item.commentTitle;
          rp.create_time = item.create_time;
          rp.customer_id = '';
          rp.dislikeCount = item.dislikeCount;
          rp.id = item.commentId;
          rp.likeCount = item.likeCount;
          rp.likeValue = 0;
          rp.nick = item.nick;
          rp.replay_content = item.replay_content;
          return rp;
        }),
        otherData: null
      },
      otherData: null
    };
  }

  async getFeaturedReviews(): Promise<
    DadaoResponse<DadaoListResponse<FeaturedReview[]>>
  > {
    const reviews = await this.reviewsMongooseRepository.find({
      featured: true
    });

    const arrDadao = [];

    for await (const item of reviews) {
      const product = await this.getProductService.getProduct(item.productId);

      const feat = new FeaturedReview();
      feat.additionalUrl = item.additional_url;
      feat.area = item.area;
      feat.avgStar = item.star;
      feat.commentContent = item.content;
      feat.commentId = item.commentId;
      feat.commentTime = item.create_time;
      feat.goodsHandle = product.handle;
      feat.goodsId = item.productId;
      feat.goodsImages = product.images;
      feat.goodsTitle = product.title;
      feat.nick = item.nick;
      arrDadao.push(feat);
    }

    return {
      code: 200,
      column: null,
      msg: 'Successful operation',
      data: {
        pageSize: 10,
        total: reviews.length,
        totalPages: Math.round(reviews.length / 10),
        currentPage: 1,
        dataList: arrDadao,
        otherData: null
      },
      otherData: null
    };
  }
}
