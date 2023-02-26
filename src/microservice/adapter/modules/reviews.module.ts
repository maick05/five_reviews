import { ReviewsController } from '../controllers/reviews.controller';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReviewsMongooseRepository } from '../repository/mongoose/reviews-mongoose.repository';
import { Review, ReviewsSchema } from '../../domain/schemas/review.schema';
import { GetReviewsService } from '../../application/services/get-reviews.service';
import { ProductsModule } from './products.module';
import { GetStarsService } from 'src/microservice/application/services/get-stars.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Review.name, schema: ReviewsSchema }]),
    ProductsModule
  ],
  controllers: [ReviewsController],
  providers: [GetReviewsService, GetStarsService, ReviewsMongooseRepository],
  exports: [GetReviewsService, GetStarsService, ReviewsMongooseRepository]
})
export class ReviewsModule {}
