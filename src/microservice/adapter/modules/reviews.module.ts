import { ReviewsController } from '../controllers/reviews.controller';
import { LoadReviewsService } from '../../application/services/load-reviews.service';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import configuration from '../../../config/configuration';
import { ReviewsMongooseRepository } from '../repository/reviews-mongoose.repository';
import { ReviewsDadaoRepository } from '../repository/reviews-dadao.repository';
import { Review, ReviewsSchema } from '../../domain/schemas/review.schema';
import { HttpModule } from '@nestjs/axios';
import { GetReviewsService } from '../../application/services/get-reviews.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Review.name, schema: ReviewsSchema }])
  ],
  controllers: [ReviewsController],
  providers: [GetReviewsService, ReviewsMongooseRepository],
  exports: []
})
export class ReviewsModule {}
