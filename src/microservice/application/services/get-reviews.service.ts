import { Injectable } from '@nestjs/common';
import { FeaturedReview } from 'src/microservice/domain/dto/featured-reviews.dto';
import { ReviewProduct } from 'src/microservice/domain/dto/reviews-product.dto';
import {
  DadaoListResponse,
  DadaoResponse
} from 'src/microservice/domain/responses/dadao.response';
import { GetDadaoStarsResponse } from 'src/microservice/domain/responses/get-dadao-stars.response';
import { Review } from 'src/microservice/domain/schemas/review.schema';
import { ReviewsMongooseRepository } from '../../adapter/repository/reviews-mongoose.repository';

@Injectable()
export class GetReviewsService {
  constructor(
    private readonly reviewsMongooseRepository: ReviewsMongooseRepository
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
          rp.dislikeCount = 0;
          rp.id = item.commentId;
          rp.likeCount = 0;
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

  async getStars(
    productId: number
  ): Promise<DadaoResponse<GetDadaoStarsResponse>> {
    const aggStars = await this.reviewsMongooseRepository.getStarReviews(
      productId
    );

    const starsArr = { '5': 0, '4': 0, '3': 0, '2': 0, '1': 0 };
    let total = 0;
    let totalStars = 0;

    aggStars.forEach((item) => {
      starsArr[item._id] = item.count;
      total += item.count;
      totalStars += item.count * item._id;
    });


    return {
      code: 200,
      column: null,
      msg: 'Successful operation',
      data: {
        countAndAvgMap: {
          avgStar: (totalStars / total).toFixed(2).toString(),
          commentCount: total
        },
        starMap: starsArr
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

    return {
      code: 200,
      column: null,
      msg: 'Successful operation',
      data: {
        pageSize: 10,
        total: reviews.length,
        totalPages: Math.round(reviews.length / 10),
        currentPage: 1,
        dataList: reviews.map((item: Review) => {
          const feat = new FeaturedReview();
          feat.additional_url = item.additional_url;
          feat.area = item.area;
          feat.avgStar = item.star;
          feat.commentContent = item.content;
          feat.commentId = item.commentId;
          feat.commentTime = item.create_time;
          feat.goodsHandle = item.handle;
          feat.goodsId = item.productId;
          feat.goodsImages = item.additional_url;
          feat.goodsTitle = item.commentTitle;
          feat.nick = item.nick;
          return feat;
        }),
        otherData: null
      },
      otherData: null
    };
  }
}
