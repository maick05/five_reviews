import { Injectable } from '@nestjs/common';
import { ProductOverviewData } from 'src/microservice/domain/dto/product-overview.dto';
import { DadaoResponse } from 'src/microservice/domain/responses/dadao.response';
import { GetDadaoStarsResponse } from 'src/microservice/domain/responses/get-dadao-stars.response';
import { ReviewsMongooseRepository } from '../../adapter/repository/mongoose/reviews-mongoose.repository';

@Injectable()
export class GetStarsService {
  constructor(
    private readonly reviewsMongooseRepository: ReviewsMongooseRepository
  ) {}

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
      msg: 'success',
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

  async getOverview(
    productId: number
  ): Promise<DadaoResponse<ProductOverviewData>> {
    const aggStars = await this.reviewsMongooseRepository.getStarReviews(
      productId
    );

    let total = 0;
    let totalStars = 0;

    aggStars.forEach((item) => {
      total += item.count;
      totalStars += item.count * item._id;
    });

    const data = {};
    data[productId] = {
      avg_stars: totalStars / total,
      total: total
    };

    return {
      code: 200,
      column: null,
      msg: 'success',
      data: data,
      otherData: null
    };
  }

  async getOverviewByProductIds(ids: {
    goodsIds: string;
  }): Promise<DadaoResponse<ProductOverviewData[]>> {
    const arrData = [];

    for await (const id of ids.goodsIds.split(',')) {
      let total = 0;
      let totalStars = 0;

      const aggStars = await this.reviewsMongooseRepository.getStarReviews(
        Number(id)
      );

      aggStars.forEach((item) => {
        total += item.count;
        totalStars += item.count * item._id;
      });

      const data = {};
      data[id] = {
        avg_stars: totalStars / total,
        total: total
      };

      arrData.push(data);
    }

    return {
      code: 200,
      column: null,
      msg: 'success',
      data: arrData,
      otherData: null
    };
  }
}
