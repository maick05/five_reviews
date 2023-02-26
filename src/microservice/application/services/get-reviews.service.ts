import { Injectable } from '@nestjs/common';
import {
  ReviewProduct,
  ReviewsProductDTO
} from 'src/microservice/domain/dto/reviews-product.dto';
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
  ): Promise<ReviewsProductDTO> {
    const dataCount = await this.reviewsMongooseRepository.find(
      { productId: id },
      { commentId: 1 },
      { create_time: -1 },
      false
    );

    const data = await this.reviewsMongooseRepository.findByProduct(id, page);

    return {
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
    };
  }
}
