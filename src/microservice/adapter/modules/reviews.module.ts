import { ReviewsController } from '../controllers/reviews.controller';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReviewsMongooseRepository } from '../repository/mongoose/reviews-mongoose.repository';
import { Review, ReviewsSchema } from '../../domain/schemas/review.schema';
import { GetReviewsService } from '../../application/services/get-reviews.service';
import { ProductsModule } from './products.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Review.name, schema: ReviewsSchema }]),
    ProductsModule
  ],
  controllers: [ReviewsController],
  providers: [GetReviewsService, ReviewsMongooseRepository],
  exports: [GetReviewsService, ReviewsMongooseRepository]
})
export class ReviewsModule {}
