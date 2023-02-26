import { Injectable } from '@nestjs/common';
import { ReviewsDadaoRepository } from '../../adapter/repository/reviews-dadao.repository';
import {
  DadaoReview,
  GetAllDadaoReviewsResponse
} from '../../../../src/microservice/domain/responses/get-all-dadao-reviews.response';
import { ReviewsMongooseRepository } from '../../adapter/repository/reviews-mongoose.repository';
import { Review } from '../../domain/schemas/review.schema';

@Injectable()
export class LoadReviewsService {
  constructor(
    private readonly reviewsDadaoRepository: ReviewsDadaoRepository,
    private readonly reviewsMongooseRepository: ReviewsMongooseRepository
  ) {}

  async loadReviews(): Promise<any> {
    const dadaoData = await this.reviewsDadaoRepository.getAllReviews();
    await this.clearReviews();
    await this.saveReviews(dadaoData.dataList);
    console.log(dadaoData);
    return dadaoData;
  }

  async clearReviews(): Promise<void> {
    await this.reviewsMongooseRepository.removeAll();
  }

  async saveReviews(dadaoData: DadaoReview[]) {
    for await (const item of dadaoData) {
      const rev = new Review();
      rev.active = true;
      rev.additional_url = item.additional_url;
      rev.area = item.area;
      rev.commentId = item.commentId;
      rev.commentTitle = item.commentTitle;
      rev.content = item.content;
      rev.create_time = item.create_time;
      rev.email = item.email;
      rev.featured = item.featured;
      rev.goods_title = item.goods_title;
      rev.nick = item.nick;
      rev.platform = item.platform;
      rev.replay_content = item.replay_content;
      rev.star = item.star;
      rev.status = item.status;
      await console.log("rev.commentId");
      await console.log(rev.commentId);
      await this.reviewsMongooseRepository.insertOne(rev, 'Review');
    }
  }
}
