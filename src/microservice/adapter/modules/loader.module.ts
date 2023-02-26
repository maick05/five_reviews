import { LoadReviewsService } from '../../application/services/load-reviews.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReviewsDadaoRepository } from '../../adapter/repository/reviews-dadao.repository';
import { Review, ReviewsSchema } from '../../domain/schemas/review.schema';
import { HttpModule } from '@nestjs/axios';
import { ReviewsMongooseRepository } from '../repository/reviews-mongoose.repository';
import { LoaderController } from '../controllers/loader.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Review.name, schema: ReviewsSchema }]),
    HttpModule
  ],
  controllers: [LoaderController],
  providers: [
    LoadReviewsService,
    ReviewsDadaoRepository,
    ReviewsMongooseRepository
  ]
})
export class LoaderModule {}
