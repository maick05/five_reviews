import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MongooseRepository } from '@devseeder/nestjs-microservices-commons';
import { Review, ReviewDocument } from '../../domain/schemas/review.schema';

@Injectable()
export class ReviewsMongooseRepository extends MongooseRepository<
  Review,
  ReviewDocument
> {
  constructor(
    @InjectModel(Review.name)
    model: Model<ReviewDocument>
  ) {
    super(model);
  }

  async getAllReviews(): Promise<Review[]> {
    const result = await this.model
      .find({ active: true })
      .select({ _id: -1 })
      .lean()
      .exec();
    return result;
  }

  async removeAll(){
    await this.model.deleteMany({});
  }
}
